import { execSync } from 'child_process';

import { brightRed } from '../../utils.js';
import type { KnownFileKeySelection, Role } from './types.js';

export const roleToFileKeyEnv: Record<Role, string> = {
  primitive: 'FILE_KEY_PRIMITIVE',
  semantic: 'FILE_KEY_SEMANTIC',
  component: 'FILE_KEY_COMPONENT',
};

const KEYCHAIN_SERVICE = 'hpe-figma-api-cli';
const KEYCHAIN_ACCOUNT = 'PERSONAL_ACCESS_TOKEN';

function getTokenFromKeychain(): string | undefined {
  try {
    return (
      execSync(
        `security find-generic-password -s "${KEYCHAIN_SERVICE}" -a "${KEYCHAIN_ACCOUNT}" -w`,
        { stdio: ['pipe', 'pipe', 'pipe'] },
      )
        .toString()
        .trim() || undefined
    );
  } catch {
    return undefined;
  }
}

/**
 * Returns the Figma PAT, checking the PERSONAL_ACCESS_TOKEN env var first,
 * then falling back to the macOS Keychain.
 *
 * To store your token in the Keychain, run once:
 *   security add-generic-password -s "hpe-figma-api-cli" -a "PERSONAL_ACCESS_TOKEN" -w "<your-token>"
 */
export function getPersonalAccessToken(): string {
  const token = process.env.PERSONAL_ACCESS_TOKEN || getTokenFromKeychain();
  if (!token) {
    throw new Error(
      'No Figma PAT found. Set PERSONAL_ACCESS_TOKEN or store it in the macOS Keychain:\n' +
        '  security add-generic-password -s "hpe-figma-api-cli" -a "PERSONAL_ACCESS_TOKEN" -w "<your-token>"',
    );
  }
  return token;
}

export function validateEnv(): string {
  const token = getPersonalAccessToken(); // throws with instructions if not found

  const missingRoleEnvVars = Object.values(roleToFileKeyEnv).filter(
    envVar => !process.env[envVar],
  );

  if (missingRoleEnvVars.length > 0) {
    console.log(
      brightRed(
        `Role-based file key selection will be unavailable until these are set: ${missingRoleEnvVars.join(
          ', ',
        )}`,
      ),
    );
  }

  return token;
}

export function getConfiguredRoleFileSelections(): KnownFileKeySelection[] {
  return (Object.entries(roleToFileKeyEnv) as [Role, string][]).flatMap(
    ([role, envVar]) => {
      const fileKey = process.env[envVar];

      if (!fileKey) {
        return [];
      }

      return [{ role, fileKey, source: `${role} (${envVar})` }];
    },
  );
}
