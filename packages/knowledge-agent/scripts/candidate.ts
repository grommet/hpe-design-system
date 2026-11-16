// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createHash } from 'node:crypto';
import {
  constants,
  copyFileSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { digestContent } from '../src/knowledge.js';
import type { KnowledgeSnapshot } from '../src/knowledge.js';

interface CandidateSource {
  snapshot: KnowledgeSnapshot;
  requestedVersion: string | undefined;
  expectedCommit: string | undefined;
}

export function validateCandidateSource({
  snapshot,
  requestedVersion,
  expectedCommit,
}: CandidateSource): void {
  if (!requestedVersion || !expectedCommit) {
    throw new Error(
      'Candidate requires REQUESTED_VERSION and EXPECTED_COMMIT.',
    );
  }
  if (snapshot.dirty) throw new Error('Candidate requires a clean checkout.');
  if (snapshot.packageVersion !== requestedVersion) {
    throw new Error('Candidate version does not match REQUESTED_VERSION.');
  }
  if (snapshot.sourceRevision !== expectedCommit) {
    throw new Error('Candidate revision does not match EXPECTED_COMMIT.');
  }
  if (snapshot.contentDigest !== digestContent(snapshot.content)) {
    throw new Error('Candidate knowledge digest does not match its content.');
  }
}

export function writeCandidate(
  options: CandidateSource & {
    tarball: string;
    directory: string;
  },
) {
  validateCandidateSource(options);
  const { snapshot, tarball, directory } = options;
  const digest = createHash('sha256')
    .update(readFileSync(tarball))
    .digest('hex');
  // Refuse existing directories so a candidate cannot retain stale artifacts.
  mkdirSync(directory);
  const filename = path.basename(tarball);
  const destination = path.join(directory, filename);
  copyFileSync(tarball, destination, constants.COPYFILE_EXCL);
  if (
    createHash('sha256').update(readFileSync(destination)).digest('hex') !==
    digest
  ) {
    throw new Error('Candidate tarball changed while copying.');
  }
  const metadata = {
    schema_version: 1,
    package: '@hpe-design/knowledge-agent',
    version: snapshot.packageVersion,
    requested_version: options.requestedVersion,
    commit_sha: snapshot.sourceRevision,
    artifact_filename: filename,
    artifact_sha256: digest,
    knowledge_schema_version: snapshot.schemaVersion,
    knowledge_content_sha256: snapshot.contentDigest,
    source_dirty: snapshot.dirty,
    node_version: process.version,
    platform: process.platform,
    architecture: process.arch,
    workflow_run_id: process.env.GITHUB_RUN_ID ?? null,
    workflow_run_attempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
    validation: { packed_consumer: 'passed' },
  };
  writeFileSync(
    path.join(directory, 'release-metadata.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
    { flag: 'wx' },
  );
  writeFileSync(path.join(directory, 'tarball.sha256'), `${digest}\n`, {
    flag: 'wx',
  });
  return metadata;
}
