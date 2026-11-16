// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { digestContent } from './knowledge';
import type { KnowledgeSnapshot } from './knowledge';
import { validateCandidateSource, writeCandidate } from '../scripts/candidate';

const directories: string[] = [];
afterEach(() => {
  directories
    .splice(0)
    .forEach(directory =>
      fs.rmSync(directory, { recursive: true, force: true }),
    );
});
function snapshot(): KnowledgeSnapshot {
  const content = { components: [], patterns: [], instructions: [] };
  return {
    schemaVersion: 1,
    packageVersion: '0.2.0',
    sourceRevision: 'abc123',
    dirty: false,
    contentDigest: digestContent(content),
    content,
  };
}
describe('knowledge-agent candidate evidence', () => {
  it('refuses dirty, mismatched and unspecified source identities', () => {
    const source = snapshot();
    const valid = {
      snapshot: source,
      requestedVersion: '0.2.0',
      expectedCommit: 'abc123',
    };
    expect(() =>
      validateCandidateSource({
        ...valid,
        snapshot: { ...source, dirty: true },
      }),
    ).toThrow('clean checkout');
    expect(() =>
      validateCandidateSource({
        ...valid,
        requestedVersion: '0.3.0',
      }),
    ).toThrow('version');
    expect(() =>
      validateCandidateSource({
        ...valid,
        expectedCommit: 'different',
      }),
    ).toThrow('revision');
    expect(() =>
      validateCandidateSource({
        ...valid,
        expectedCommit: undefined,
      }),
    ).toThrow('requires REQUESTED_VERSION and EXPECTED_COMMIT');
    expect(() =>
      validateCandidateSource({
        ...valid,
        snapshot: { ...source, contentDigest: 'invalid' },
      }),
    ).toThrow('digest');
  });

  it('preserves the exact validated bytes and records their identity', () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'knowledge-candidate-test-'),
    );
    directories.push(root);
    const tarball = path.join(root, 'package.tgz');
    fs.writeFileSync(tarball, 'exact validated tarball fixture');
    const directory = path.join(root, 'candidate');
    const options = {
      tarball,
      directory,
      snapshot: snapshot(),
      requestedVersion: '0.2.0',
      expectedCommit: 'abc123',
    };
    const metadata = writeCandidate(options);
    expect(fs.readFileSync(path.join(directory, 'package.tgz'))).toEqual(
      fs.readFileSync(tarball),
    );
    const digest = createHash('sha256')
      .update(fs.readFileSync(tarball))
      .digest('hex');
    expect(
      JSON.parse(
        fs.readFileSync(path.join(directory, 'release-metadata.json'), 'utf8'),
      ),
    ).toMatchObject({
      version: '0.2.0',
      commit_sha: 'abc123',
      artifact_sha256: digest,
      knowledge_content_sha256: options.snapshot.contentDigest,
    });
    expect(
      fs.readFileSync(path.join(directory, 'tarball.sha256'), 'utf8').trim(),
    ).toBe(metadata.artifact_sha256);
    expect(() => writeCandidate(options)).toThrow();
    expect(fs.readFileSync(path.join(directory, 'package.tgz'))).toEqual(
      fs.readFileSync(tarball),
    );
  });
});
