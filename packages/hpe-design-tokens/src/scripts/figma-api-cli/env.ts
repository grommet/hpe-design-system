import { brightRed } from '../../utils.js';
import type { Role } from './types.js';

export const roleToFileKeyEnv: Record<Role, string> = {
  primitive: 'FILE_KEY_PRIMITIVE',
  semantic: 'FILE_KEY_SEMANTIC',
  component: 'FILE_KEY_COMPONENT',
};

export function validateEnv() {
  if (!process.env.PERSONAL_ACCESS_TOKEN) {
    throw new Error('PERSONAL_ACCESS_TOKEN environment variable is required.');
  }

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
}
