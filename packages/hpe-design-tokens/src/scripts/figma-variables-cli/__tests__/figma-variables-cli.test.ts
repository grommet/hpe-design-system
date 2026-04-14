import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../env.js', () => ({
  validateEnv: vi.fn(() => {
    throw new Error('validateEnv should not be called for --help');
  }),
}));

vi.mock('../options.js', () => ({
  parseCliOptions: vi.fn(() => ({ help: true })),
  getCliOptionErrors: vi.fn(() => []),
  printHelp: vi.fn(),
  printUnknownFlagsWarning: vi.fn(),
}));

vi.mock('../get-collections.js', () => ({
  executeGetCollections: vi.fn(),
  handleGetCollections: vi.fn(),
}));

vi.mock('../get-collection-by-id.js', () => ({
  executeGetCollectionById: vi.fn(),
  handleGetCollectionById: vi.fn(),
}));

vi.mock('../get-modes.js', () => ({
  executeGetModes: vi.fn(),
  handleGetModes: vi.fn(),
}));

vi.mock('../get-variable-by-id.js', () => ({
  executeGetVariableById: vi.fn(),
  handleGetVariableById: vi.fn(),
}));

vi.mock('../get-variables.js', () => ({
  executeGetVariables: vi.fn(),
  handleGetVariables: vi.fn(),
}));

vi.mock('../post-variables.js', () => ({
  executePost: vi.fn(),
  handlePostVariables: vi.fn(),
}));

vi.mock('../prompts.js', () => ({
  askMenuOption: vi.fn(),
  printMenu: vi.fn(),
}));

vi.mock('../../figma_api.js', () => ({
  default: vi.fn(),
}));

import main from '../figma-variables-cli.js';
import {
  getCliOptionErrors,
  parseCliOptions,
  printHelp,
  printUnknownFlagsWarning,
} from '../options.js';
import { validateEnv } from '../env.js';

const parseCliOptionsMock = vi.mocked(parseCliOptions);
const getCliOptionErrorsMock = vi.mocked(getCliOptionErrors);

describe('figma-variables-cli entry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('prints help without requiring env validation', async () => {
    parseCliOptionsMock.mockReturnValue({ help: true });
    getCliOptionErrorsMock.mockReturnValue([]);

    await main();

    expect(printUnknownFlagsWarning).toHaveBeenCalledTimes(1);
    expect(printHelp).toHaveBeenCalledTimes(1);
    expect(validateEnv).not.toHaveBeenCalled();
  });

  it('fails fast when non-interactive mode has no action', async () => {
    parseCliOptionsMock.mockReturnValue({ nonInteractive: true });
    getCliOptionErrorsMock.mockReturnValue([]);

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(((
      code?: string | number | null | undefined,
    ) => {
      throw new Error(`process.exit:${code}`);
    }) as never);

    await expect(main()).rejects.toThrow('process.exit:1');
    expect(validateEnv).not.toHaveBeenCalled();

    exitSpy.mockRestore();
  });
});
