import { describe, it, expect } from 'vitest';
import jscodeshift from 'jscodeshift';
import transform from '../transforms/migrate-grommet-icons-to-hpe';

// Helper to run codemod on code string
const runCodemod = (input, options = { quote: 'single' }) => {
  const api = {
    jscodeshift,
  };
  const file = { source: input, path: 'test-file.js' };
  return transform(file, api, options);
};

describe('migrate-grommet-icons-to-hpe codemod', () => {
  describe('Library imports', () => {
    it('updates import from grommet-icons to @hpe-design/icons-grommet', () => {
      const input = "import { Alert } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain("from '@hpe-design/icons-grommet'");
    });

    it('handles multiple icon imports', () => {
      const input = "import { Alert, Calendar, Search } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain(
        "import { Alert, Calendar, Search } from '@hpe-design/icons-grommet'",
      );
    });

    it('handles double quotes', () => {
      const input = 'import { Alert } from "grommet-icons";';
      const output = runCodemod(input, { quote: 'double' });
      expect(output).toContain('from "@hpe-design/icons-grommet"');
    });
  });

  describe('Remapped icons', () => {
    it('remaps StatusCriticalSmall to StatusCritical', () => {
      const input = "import { StatusCriticalSmall } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('StatusCritical');
      expect(output).not.toContain('StatusCriticalSmall');
    });

    it('remaps StatusGoodSmall to StatusGood', () => {
      const input = "import { StatusGoodSmall } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('StatusGood');
    });

    it('remaps multiple status icons', () => {
      const input =
        'import { StatusCriticalSmall, StatusGoodSmall, ' +
        "StatusWarningSmall } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('StatusCritical');
      expect(output).toContain('StatusGood');
      expect(output).toContain('StatusWarning');
    });

    it('remaps BarChart to ChartBar', () => {
      const input = "import { BarChart } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('ChartBar');
    });

    it('remaps LineChart to ChartLine', () => {
      const input = "import { LineChart } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('ChartLine');
    });

    it('remaps PieChart to ChartPie', () => {
      const input = "import { PieChart } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('ChartPie');
    });

    it('remaps CaretNext to CaretRight', () => {
      const input = "import { CaretNext } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('CaretRight');
    });

    it('remaps CaretPrevious to CaretLeft', () => {
      const input = "import { CaretPrevious } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('CaretLeft');
    });

    it('remaps Next to Right', () => {
      const input = "import { Next } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Right');
    });

    it('remaps Previous to Left', () => {
      const input = "import { Previous } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Left');
    });

    it('remaps CircleAlert to Alert', () => {
      const input = "import { CircleAlert } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('import { Alert } from');
    });

    it('remaps CircleInformation to Info', () => {
      const input = "import { CircleInformation } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Info');
    });

    it('remaps Star to StarFill', () => {
      const input = "import { Star } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('StarFill');
    });

    it('remaps StarOutline to Star', () => {
      const input = "import { StarOutline } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('import { Star } from');
    });

    it('remaps FormAdd to Add', () => {
      const input = "import { FormAdd } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('import { Add } from');
    });

    it('remaps all Form* icons correctly', () => {
      const input =
        "import { FormSearch, FormClose, FormEdit } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Search');
      expect(output).toContain('Close');
      expect(output).toContain('Edit');
    });
  });

  describe('JSX usage updates', () => {
    it('updates JSX element when icon is remapped', () => {
      const input = `import { StatusCriticalSmall } from 'grommet-icons';
const Icon = () => <StatusCriticalSmall />;`;
      const output = runCodemod(input);
      expect(output).toContain('<StatusCritical />');
      expect(output).not.toContain('StatusCriticalSmall');
    });

    it('updates JSX with props when icon is remapped', () => {
      const input = `import { BarChart } from 'grommet-icons';
const Icon = () => <BarChart color="brand" size="large" />;`;
      const output = runCodemod(input);
      expect(output).toContain('<ChartBar');
      expect(output).toContain('color="brand"');
    });

    it('updates JSX closing tag when icon is remapped', () => {
      const input = `import { StatusWarningSmall } from 'grommet-icons';
const Icon = () => <StatusWarningSmall>Content</StatusWarningSmall>;`;
      const output = runCodemod(input);
      expect(output).toContain('<StatusWarning>');
      expect(output).toContain('</StatusWarning>');
    });
  });

  describe('Identifier references', () => {
    it('updates variable references when icon is remapped', () => {
      const input = `import { Next } from 'grommet-icons';
const icon = Next;`;
      const output = runCodemod(input);
      expect(output).toContain('const icon = Right;');
    });

    it('updates function call references when icon is remapped', () => {
      const input = `import { Previous } from 'grommet-icons';
renderIcon(Previous);`;
      const output = runCodemod(input);
      expect(output).toContain('renderIcon(Left);');
    });

    it('updates object property references when icon is remapped', () => {
      const input = `import { BarChart } from 'grommet-icons';
const icons = { chart: BarChart };`;
      const output = runCodemod(input);
      expect(output).toContain('chart: ChartBar');
    });
  });

  describe('Aliased imports', () => {
    it('handles aliased imports correctly', () => {
      const input =
        'import { StatusCriticalSmall as CriticalIcon } from ' +
        "'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('import { StatusCritical as CriticalIcon }');
      expect(output).toContain("from '@hpe-design/icons-grommet'");
    });

    it('does not update JSX when using aliased imports', () => {
      const input =
        'import { StatusCriticalSmall as CriticalIcon } from ' +
        "'grommet-icons';\nconst Icon = () => <CriticalIcon />;";
      const output = runCodemod(input);
      expect(output).toContain('<CriticalIcon />');
      expect(output).not.toContain('<StatusCritical />');
    });

    it('does not update variable references when using aliased imports', () => {
      const input = `import { Next as NextIcon } from 'grommet-icons';
const icon = NextIcon;`;
      const output = runCodemod(input);
      expect(output).toContain('const icon = NextIcon;');
      expect(output).not.toContain('const icon = Right;');
    });
  });

  describe('Unchanged icons', () => {
    it('keeps unchanged icon names the same', () => {
      const input = "import { Alert, Calendar, Search } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Alert, Calendar, Search');
    });

    it('updates only the package for unchanged icons', () => {
      const input = "import { Dashboard } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain(
        "import { Dashboard } from '@hpe-design/icons-grommet'",
      );
    });
  });

  describe('Mixed scenarios', () => {
    it('handles mix of remapped and unchanged icons', () => {
      const input =
        "import { Alert, StatusCriticalSmall, Calendar } from 'grommet-icons';";
      const output = runCodemod(input);
      expect(output).toContain('Alert');
      expect(output).toContain('StatusCritical');
      expect(output).toContain('Calendar');
      expect(output).toContain("from '@hpe-design/icons-grommet'");
    });

    it('handles complex component with multiple remapped icons', () => {
      const input =
        'import { Next, Previous, StatusCriticalSmall } from ' +
        "'grommet-icons';\n\n" +
        'const Navigation = () => (\n' +
        '  <Box>\n' +
        '    <Button icon={<Previous />} />\n' +
        '    <StatusCriticalSmall color="status-critical" />\n' +
        '    <Button icon={<Next />} />\n' +
        '  </Box>\n' +
        ');';
      const output = runCodemod(input);
      expect(output).toContain('import { Right, Left, StatusCritical }');
      expect(output).toContain('<Left />');
      expect(output).toContain('<Right />');
      expect(output).toContain('<StatusCritical');
    });
  });

  describe('Deprecated icons', () => {
    it('warns about deprecated icons but keeps the import', () => {
      const originalWarn = console.warn;
      const warnings = [];
      console.warn = msg => warnings.push(msg);

      const input = "import { Facebook } from 'grommet-icons';";
      const output = runCodemod(input);

      console.warn = originalWarn;

      expect(output).toContain("from '@hpe-design/icons-grommet'");
      expect(output).toContain('Facebook');
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings[0]).toContain('deprecated');
      expect(warnings[0]).toContain('Facebook');
    });

    it('warns about multiple deprecated icons', () => {
      const originalWarn = console.warn;
      const warnings = [];
      console.warn = msg => warnings.push(msg);

      const input =
        "import { Github, Twitter, Facebook } from 'grommet-icons';";
      const output = runCodemod(input);

      console.warn = originalWarn;

      expect(warnings.length).toBe(3);
      expect(output).toContain('Github, Twitter, Facebook');
    });
  });

  describe('Edge cases', () => {
    it('returns null when no grommet-icons imports found', () => {
      const input = "import { Box } from 'grommet';";
      const output = runCodemod(input);
      expect(output).toBeNull();
    });

    it('handles multiple import statements', () => {
      const input = `import { Box } from 'grommet';
import { StatusCriticalSmall } from 'grommet-icons';
import React from 'react';`;
      const output = runCodemod(input);
      expect(output).toContain("from 'grommet'");
      expect(output).toContain("from '@hpe-design/icons-grommet'");
      expect(output).toContain("from 'react'");
      expect(output).toContain('StatusCritical');
    });

    it('handles imports with line breaks', () => {
      const input = `import {
  StatusCriticalSmall,
  StatusGoodSmall,
  Alert
} from 'grommet-icons';`;
      const output = runCodemod(input);
      expect(output).toContain('StatusCritical');
      expect(output).toContain('StatusGood');
      expect(output).toContain('Alert');
    });
  });

  describe('Real-world examples', () => {
    it('handles a typical component file', () => {
      const input =
        "import React from 'react';\n" +
        "import { Box, Button } from 'grommet';\n" +
        'import { StatusCriticalSmall, StatusGoodSmall, Next, ' +
        "Previous } from 'grommet-icons';\n\n" +
        'export const StatusCard = ({ status }) => {\n' +
        "  const Icon = status === 'error' ? StatusCriticalSmall : " +
        'StatusGoodSmall;\n' +
        '  \n' +
        '  return (\n' +
        '    <Box>\n' +
        '      <Icon />\n' +
        '      <Button icon={<Previous />} />\n' +
        '      <Button icon={<Next />} />\n' +
        '    </Box>\n' +
        '  );\n' +
        '};';
      const output = runCodemod(input);
      expect(output).toContain(
        'import { StatusCritical, StatusGood, Right, Left }',
      );
      expect(output).toContain("from '@hpe-design/icons-grommet'");
      expect(output).toContain(
        "const Icon = status === 'error' ? StatusCritical : StatusGood;",
      );
      expect(output).toContain('<Left />');
      expect(output).toContain('<Right />');
    });
  });
  describe('test subpaths', () => {
    it('updates import from grommet-icons to @hpe-design/icons-grommet', () => {
      const input = "import Alert from 'grommet-icons/icons/Alert';";
      const output = runCodemod(input);
      expect(output).toContain("from '@hpe-design/icons-grommet/icons/Alert'");
    });

    it('handles multiple subpath imports correctly', () => {
      const input = `import { Grow } from 'grommet-icons/icons/Grow';
import { Cube } from 'grommet-icons/icons/Cube';`;
      const output = runCodemod(input);
      expect(output).toContain(
        "import { Grow } from '@hpe-design/icons-grommet/icons/Grow'",
      );
      expect(output).toContain(
        "import { Cube } from '@hpe-design/icons-grommet/icons/Cube'",
      );
      // Ensure they remain as separate import statements
      const lines = output.split('\n');
      const importLines = lines.filter(line => line.includes('import'));
      expect(importLines.length).toBe(2);
    });
  });
});
