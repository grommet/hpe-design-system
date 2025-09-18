import { describe, it, expect } from "vitest";
import jscodeshift from "jscodeshift";
import migrateTshirtSizes from "../transforms/migrate-theme-v6-to-v7";

// Helper to run codemod on code string
const runCodemod = (input, options = { quote: "single" }) => {
  // Simulate jscodeshift API
  const api = {
    jscodeshift,
  };
  const file = { source: input };
  return migrateTshirtSizes(file, api, options);
};

const runScanMode = (input) => {
  const api = { jscodeshift };
  const file = { source: input, path: "test-file.js" };

  // Capture console output
  const originalWarn = console.warn;
  const originalLog = console.log;
  const warnings = [];
  const logs = [];

  console.warn = (msg) => warnings.push(msg);
  console.log = (msg) => logs.push(msg);

  try {
    migrateTshirtSizes(file, api, { scan: true });
    return { warnings, logs };
  } finally {
    console.warn = originalWarn;
    console.log = originalLog;
  }
};

describe("migrate-tshirt-sizes codemod", () => {
  it("transforms variable assignment", () => {
    const input = "const pad = 'small';";
    const output = runCodemod(input);
    expect(output).toContain("const pad = 'xsmall';");
  });

  it("transforms pad with conditional object", () => {
    const input =
      "<PageContent pad={bestPractice ? { bottom: 'large' } : undefined}></PageContent>";
    const output = runCodemod(input);
    expect(output).toContain("bottom: 'xlarge'");
  });

  it("transforms size prop in Chart", () => {
    const input = '<Chart size="small" />';
    const output = runCodemod(input);
    expect(output).toContain("size='xsmall'");
  });

  it("transforms thickness prop in Meter", () => {
    const input = '<Meter thickness="small" />';
    const output = runCodemod(input);
    expect(output).toContain("thickness='xsmall'");
  });

  it("transforms object in nameProps", () => {
    const input =
      "<NameValueList nameProps={{ width: 'xsmall', align: 'end' }}/>";
    const output = runCodemod(input);
    expect(output).toContain("width: '3xsmall'");
  });

  it("transforms array in nameProps", () => {
    const input =
      "<NameValueList nameProps={{ width: ['xxsmall', 'xsmall'] }}/>";
    const output = runCodemod(input);
    expect(output).toContain("width: ['5xsmall', '3xsmall']");
  });

  it("transforms object in valueProps", () => {
    const input =
      "<NameValueList valueProps={{ width: 'xsmall', align: 'end' }}/>";
    const output = runCodemod(input);
    expect(output).toContain("width: '3xsmall'");
  });

  it("transforms array in value Props", () => {
    const input =
      "<NameValueList valueProps={{ width: ['xxsmall', 'medium'] }}/>";
    const output = runCodemod(input);
    expect(output).toContain("width: ['5xsmall', 'medium']");
  });

  it("transforms rows array", () => {
    const input = "const rows = ['xsmall', 'small'];";
    const output = runCodemod(input);
    expect(output).toContain("['3xsmall', 'xsmall']");
  });

  it("transforms nested columns array", () => {
    const input =
      "const columns = [['xxsmall', 'xsmall'], ['xsmall', 'small'], 'xsmall'];";
    const output = runCodemod(input);
    expect(output).toContain(
      "[['5xsmall', '3xsmall'], ['3xsmall', 'xsmall'], '3xsmall']"
    );
  });

  it("transforms columns array", () => {
    const input = "const columns = ['small', 'xsmall', 'xsmall']";
    const output = runCodemod(input);
    expect(output).toContain("['xsmall', '3xsmall', '3xsmall']");
  });

  it("transforms columns string", () => {
    const input = "const columns = 'xsmall';";
    const output = runCodemod(input);
    expect(output).toContain("const columns = '3xsmall';");
  });

  it("transforms margin with conditional", () => {
    const input = "<Box margin={{ top: level === 3 ? 'medium' : 'large' }}/>";
    const output = runCodemod(input);
    expect(output).toContain("top: level === 3 ? 'medium' : 'xlarge'");
  });

  it("transforms pad with array in conditional", () => {
    const input =
      "<Box pad={['xsmall', 'small'].includes(size) ? pad.small : pad}/>";
    const output = runCodemod(input);
    expect(output).toContain("['xsmall', 'small'].includes(size)");
  });

  it("transforms nested pad object", () => {
    const input = `const UsageExample = ({
                children,
                label,
                themeMode,
                pad = {
                    horizontal: 'large',
                    vertical: 'small',
                    small: { horizontal: 'xxsmall', vertical: 'xsmall' }
                },
                ...rest
                }) => {return <Box></Box>}`;
    const output = runCodemod(input);
    expect(output).toContain("horizontal: 'xlarge'");
    expect(output).toContain("vertical: 'xsmall'");
    expect(output).toContain(
      "small: { horizontal: '5xsmall', vertical: '3xsmall' }"
    );
  });

  it("transforms default param value", () => {
    const input = `const Selector = ({ pad = 'small' }) => { return <Box></Box>}`;
    const output = runCodemod(input);
    expect(output).toContain("pad = 'xsmall'");
  });

  it("transforms default param value", () => {
    const input = `const Selector = ({ pad = 'small' }) => { return <Box pad = 'large' margin = 'xlarge'></Box>}`;
    const output = runCodemod(input);
    expect(output).toContain("pad = 'xsmall'");
    expect(output).toContain("pad = 'xlarge'");
    expect(output).toContain("margin = '3xlarge'");
  });

  it("transforms Grid columns object with array", () => {
    const input = `<Grid columns={{ count: 'fit', size: ['small', 'flex'] }} />`;
    const output = runCodemod(input);
    expect(output).toContain("size: ['xsmall', 'flex']");
  });

  it("transforms pad in List defaultItemProps", () => {
    const input = `<List
        data={serverGroups}
        defaultItemProps={{
          pad: { vertical: 'small' },
        }}
      />`;
    const output = runCodemod(input);
    expect(output).toContain("pad: { vertical: 'xsmall' }");
  });

  it("transforms nested props in dropProps", () => {
    const input = `<Select
        dropProps={{
          pad: 'xsmall',
          margin: 'large',
          round: 'small',
          height: 'xlarge'
        }}
      />`;
    const output = runCodemod(input);
    expect(output).toContain("pad: '3xsmall'");
    expect(output).toContain("margin: 'xlarge'");
    expect(output).toContain("round: 'medium'");
    expect(output).toContain("height: 'xxlarge'");
  });

  it("transforms nested props in buttonProps", () => {
    const input = `<Component
        buttonProps={{
          pad: { horizontal: 'small', vertical: 'xsmall' },
          margin: 'large'
        }}
      />`;
    const output = runCodemod(input);
    expect(output).toContain("horizontal: 'xsmall'");
    expect(output).toContain("vertical: '3xsmall'");
    expect(output).toContain("margin: 'xlarge'");
  });

  it("transforms nested props in boxProp", () => {
    const input = `<Component
        boxProp={{
          width: 'large',
          round: 'xlarge',
          pad: ['small', 'medium']
        }}
      />`;
    const output = runCodemod(input);
    expect(output).toContain("width: 'xlarge'");
    expect(output).toContain("round: 'xxlarge'");
    expect(output).toContain("pad: ['xsmall', 'medium']");
  });

  it("transforms nested props in paginate", () => {
    const input = `<DataTable
        paginate={{
          pad: 'xxsmall',
          margin: { top: 'small', bottom: 'large' }
        }}
      />`;
    const output = runCodemod(input);
    expect(output).toContain("pad: '5xsmall'");
    expect(output).toContain("top: 'xsmall'");
    expect(output).toContain("bottom: 'xlarge'");
  });

  it("transforms nested props in contentProps", () => {
    const input = `<FormField
      label="Title"
      contentProps={{ width: 'small' }}
      required
      name="application-title"
      htmlFor="application-title"
    />`;
    const output = runCodemod(input);
    expect(output).toContain("width: 'xsmall'");
  });

  it("transforms nested size prop in border object", () => {
    const input = `<Box border={{ color: 'transparent', size: 'xlarge' }} />`;
    const output = runCodemod(input);
    expect(output).toContain("size: 'large'");
  });

  it("transforms size values in ternary with includes array using known variable", () => {
    const input = `const pad = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'large';`;
    const output = runCodemod(input);
    expect(output).toContain(
      "['xsmall', 'small', 'medium'].includes(breakpoint)"
    );
    expect(output).toContain("? 'xsmall'");
    expect(output).toContain(": 'xlarge'");
  });

  it("transforms thickness in DataChart chart prop array", () => {
    const input = `<DataChart
    chart={[
      { property: 'energy', thickness: 'xsmall' },
      { property: 'water', thickness: 'xxsmall' }
    ]}
  />`;
    const output = runCodemod(input);
    expect(output).toContain("thickness: '3xsmall'");
    expect(output).toContain("thickness: '5xsmall'");
  });

  it("transforms tshirt sizes inside React function call like cloneElement() and so on", () => {
    const input = `import React, { cloneElement } from 'react';
       export const EmptyState = ({
        icon: iconProp,
      }) => {
        let icon = iconProp;
        if (iconProp && !iconProp.props.size)
          icon = cloneElement(iconProp, { size: 'xlarge' });

        return (
          <Box gap="medium" align={align} flex={false}>
            {icon}
          </Box>
        );
      };`;
    const output = runCodemod(input);
    expect(output).toContain("size: 'xxlarge'");
  });

  it("No transforms for height on icons", () => {
    const input = `import { StatusGoodSmall } from 'grommet-icons';;
        <Box>
          <StatusGoodSmall height = 'small' />
          <Box height = 'xlarge' />
          {icon}
        </Box>`;
    const output = runCodemod(input);
    expect(output).toContain("height = 'small'");
  });

  it("transforms Grid columns with conditional array/object based on breakpoint includes", () => {
    const input = `<Grid
    columns={
      ['xsmall', 'small'].includes(breakpoint)
        ? ['auto']
        : { count: 2, size: 'small' }
    }
    gap='xlarge'
  />`;
    const output = runCodemod(input);
    expect(output).toContain("['xsmall', 'small'].includes(breakpoint)");
    expect(output).toContain("size: 'xsmall'");
    expect(output).toContain("gap='3xlarge'");
  });
});

describe("scan mode", () => {
  it("flags const declarations with t-shirt sizes", () => {
    const input = `
      const padding = 'small';
      const size = 'medium';
      const spacing = 'large';
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 2: const padding = "small" - may need manual review'
    );
    expect(warnings).toContain(
      '  ⚠️  Line 3: const size = "medium" - may need manual review'
    );
    expect(warnings).toContain(
      '  ⚠️  Line 4: const spacing = "large" - may need manual review'
    );
  });

  it("flags object assignments with t-shirt sizes in values", () => {
    const input = `
      const styles = {
        margin: 'large',
        pad: 'small'
      };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 2: const styles = { margin: "large", pad: "small" } - may need manual review'
    );
  });

  it("flags object assignments with t-shirt sizes in keys (like columnsGap)", () => {
    const input = `
      const columnsGap = {
        xsmall: 'xsmall',
        small: 'xsmall',
        medium: 'small',
        large: 'medium'
      };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    // The warning should include both keys and values found
    expect(
      warnings.some(
        (w) =>
          w.includes("const columnsGap = {") &&
          w.includes("xsmall:") &&
          w.includes("small:") &&
          w.includes("medium:") &&
          w.includes("large:")
      )
    ).toBe(true);
  });

  it("flags array assignments with t-shirt sizes", () => {
    const input = `
      const sizes = ['small', 'large'];
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 2: const sizes = ["small", "large"] - may need manual review'
    );
  });

  it("flags nested arrays with t-shirt sizes", () => {
    const input = `
      const gridColumns = [
        ['medium', 'auto'],
        ['small', 'medium']
      ];
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 2: const gridColumns = ["medium", "small", "medium"] - may need manual review'
    );
  });

  it("flags theme.global.edgeSize references", () => {
    const input = `
      const spacing = theme.global.edgeSize.small;
      const margin = theme.global.edgeSize.medium;
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      "  ⚠️  Line 2: theme.global.edgeSize.small - may need manual review"
    );
    expect(warnings).toContain(
      "  ⚠️  Line 3: theme.global.edgeSize.medium - may need manual review"
    );
  });

  it("flags style objects with t-shirt sizes", () => {
    const input = `
      function Component() {
        return <Box style={{ margin: 'large', pad: 'small' }} />;
      }
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 3: Object with margin: "large" - may need manual review'
    );
    expect(warnings).toContain(
      '  ⚠️  Line 3: Object with pad: "small" - may need manual review'
    );
  });

  it("does NOT flag JSX props", () => {
    const input = `
      function Component() {
        return <Text size="medium" weight="bold" />;
      }
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toHaveLength(0);
    expect(warnings).toHaveLength(0);
  });

  it("does NOT flag defaultProps", () => {
    const input = `
      Component.defaultProps = {
        size: 'medium',
        weight: 400
      };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toHaveLength(0);
    expect(warnings).toHaveLength(0);
  });

  it("does NOT flag random string literals", () => {
    const input = `
      const message = 'The size is medium';
      const description = 'This is a small component';
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toHaveLength(0);
    expect(warnings).toHaveLength(0);
  });

  it("does NOT flag non-style objects", () => {
    const input = `
      const config = {
        name: 'small',
        type: 'medium'
      };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toHaveLength(0);
    expect(warnings).toHaveLength(0);
  });

  it("flags mixed object with style props and t-shirt sizes", () => {
    const input = `
      const boxStyles = {
        pad: 'small',
        background: 'white',
        margin: 'large',
        color: 'red'
      };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toContain(
      '  ⚠️  Line 2: const boxStyles = { pad: "small", margin: "large" } - may need manual review'
    );
  });

  it("handles multiple files worth of warnings", () => {
    const input = `
      const padding = 'small';
      const columns = ['medium', 'large'];
      const styles = { margin: 'xlarge' };
    `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(warnings).toHaveLength(3);
    expect(warnings).toContain(
      '  ⚠️  Line 2: const padding = "small" - may need manual review'
    );
    expect(warnings).toContain(
      '  ⚠️  Line 3: const columns = ["medium", "large"] - may need manual review'
    );
    expect(warnings).toContain(
      '  ⚠️  Line 4: const styles = { margin: "xlarge" } - may need manual review'
    );
  });
  it("flags object with only t-shirt size keys and values (no style props)", () => {
    const input = `
    const columnsGap = {
      xsmall: 'xsmall',
      small: 'xsmall',
      medium: 'small',
      large: 'medium',
      xlarge: 'medium'
    };
  `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(
      warnings.some(
        (w) =>
          w.includes("const columnsGap = {") &&
          w.includes("xsmall:") &&
          w.includes("small:") &&
          w.includes("medium:") &&
          w.includes("large:") &&
          w.includes("xlarge:")
      )
    ).toBe(true);
  });

  it("flags assignment expressions with style objects", () => {
    const input = `
    let kindStyles = {};
    if (kind === 'next')
      kindStyles = {
        container: {
          pad: 'xsmall',
          round: 'xsmall',
        },
      };
  `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(
      warnings.some(
        (w) =>
          w.includes("kindStyles = {") &&
          w.includes('container.pad: "xsmall"') &&
          w.includes('container.round: "xsmall"')
      )
    ).toBe(true);
  });
  it("flags variable declarations with conditional expressions containing t-shirt sizes", () => {
    const input = `
    const breakpoint = useContext(ResponsiveContext);
    
    const detailColumns = ['xsmall', 'small', 'medium'].includes(breakpoint) 
      ? ['flex', 'flex'] 
      : ['flex', 'medium'];
      
    const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint) 
      ? "small" 
      : "medium";
      
    const summaryRows = [["xsmall", "auto"]];
  `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");

    // Should flag detailColumns because of 'medium' in the array
    expect(
      warnings.some(
        (w) => w.includes("const detailColumns = ") && w.includes('"medium"')
      )
    ).toBe(true);

    // Should flag metricSize because of 'small' and 'medium' in ternary
    expect(
      warnings.some(
        (w) =>
          w.includes("const metricSize = ") &&
          (w.includes('"small"') || w.includes('"medium"'))
      )
    ).toBe(true);

    // Should flag summaryRows because of 'xsmall' in nested array
    expect(
      warnings.some(
        (w) => w.includes("const summaryRows = ") && w.includes('"xsmall"')
      )
    ).toBe(true);
  });
  it("flags destructuring assignments with t-shirt size default values", () => {
    const input = `
    const { round = !multiple ? 'full' : 'xxsmall', size = 'medium' } = indicator;
    const { pad = 'small', margin = 'large' } = styles;
    const { width = 'auto', height = 'xlarge' } = dimensions;
  `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");

    // Should flag first destructuring with conditional and direct assignment
    expect(
      warnings.some(
        (w) =>
          w.includes('const { round = "xxsmall", size = "medium" }') ||
          (w.includes("round =") &&
            w.includes("xxsmall") &&
            w.includes("size =") &&
            w.includes("medium"))
      )
    ).toBe(true);

    // Should flag second destructuring
    expect(
      warnings.some(
        (w) =>
          w.includes('const { pad = "small", margin = "large" }') ||
          (w.includes("pad =") &&
            w.includes("small") &&
            w.includes("margin =") &&
            w.includes("large"))
      )
    ).toBe(true);

    // Should flag third destructuring
    expect(
      warnings.some(
        (w) =>
          w.includes('const { height = "xlarge" }') ||
          (w.includes("height =") && w.includes("xlarge"))
      )
    ).toBe(true);
  });
  it("flags assignment expressions with directional style properties", () => {
    const input = `
    let adjustedPad;
    if (context === 'header') {
      adjustedPad = {
        left: pad,
        right: pad,
        bottom: 'xsmall',
        top: pad,
      };
    }
  `;
    const { warnings, logs } = runScanMode(input);

    expect(logs).toContain("\n📁 test-file.js");
    expect(
      warnings.some(
        (w) => w.includes("adjustedPad = {") && w.includes('bottom: "xsmall"')
      )
    ).toBe(true);
  });
});
