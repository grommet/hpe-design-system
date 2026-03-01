/**
 * HPE Design System Agent
 *
 * Main entry point for library imports. CLI entry point is in cli.ts.
 */

export const version = '1.0.0-alpha.1';

/**
 * Initialize the design system agent.
 * @param config - Configuration object (placeholder)
 */
export function initializeAgent(config?: Record<string, unknown>): void {
  console.log('Initializing HPE Design System Agent...', { config });
}

export default {
  version,
  initializeAgent,
};
