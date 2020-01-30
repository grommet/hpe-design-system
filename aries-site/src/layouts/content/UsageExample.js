import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Drop, ResponsiveContext, Text } from 'grommet';
import { Code, Document, Template } from 'grommet-icons';

import { colors } from '../../themes/aries';

const IconButton = ({ title, ...rest }) => {
  const ref = React.useRef();
  const [hover, setHover] = React.useState();

  React.useEffect(() => {
    if (!hover) return undefined;
    const timer = setTimeout(() => setHover(false), 2000);
    return () => clearTimeout(timer);
  }, [hover]);

  return (
    <>
      <Button
        ref={ref}
        hoverIndicator
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={hover ? undefined : title}
        {...rest}
      />
      {hover && (
        <Drop
          target={ref.current}
          align={{ bottom: 'top' }}
          plain
          stretch={false}
        >
          <Box
            background={colors['background-front']}
            border
            round="xsmall"
            pad="small"
            margin={{ bottom: 'xsmall' }}
          >
            <Text truncate>{title}</Text>
          </Box>
        </Drop>
      )}
    </>
  );
};

IconButton.propTypes = {
  title: PropTypes.string,
};

export const UsageExample = ({
  children,
  code,
  docs,
  figma,
  label,
  themeMode,
  pad,
  ...rest
}) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box gap="xsmall" margin={{ vertical: 'xsmall' }}>
      <Text weight={400} size="small">
        {label}
      </Text>
      {/* Because UsageExamples need to present content in both light and dark
      contexts, regardless of the site's themeMode, forcing box background to 
      serve examples with the desired themeMode */}
      <Box background={colors.background[themeMode]}>
        <Box
          direction="row"
          background={colors['background-front']}
          pad={size === 'small' ? pad.small : pad}
          {...rest}
        >
          {children}
        </Box>
      </Box>
      {(code || docs || figma) && (
        <Box direction="row" justify="end" gap="xsmall">
          {figma && (
            <IconButton
              title="Figma Templates"
              icon={<Template />}
              hoverIndicator
              href={figma}
            />
          )}
          {docs && (
            <IconButton
              title="React Documentation"
              icon={<Document />}
              hoverIndicator
              href={docs}
            />
          )}
          {code && (
            <IconButton
              title="React Code"
              icon={<Code />}
              hoverIndicator
              href={code}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

UsageExample.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  code: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  label: PropTypes.string,
  themeMode: PropTypes.oneOf(['dark', 'light']),
  pad: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      top: PropTypes.string,
      bottonm: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string,
      horizontal: PropTypes.string,
      vertical: PropTypes.string,
    }),
  ]),
};

UsageExample.defaultProps = {
  pad: {
    horizontal: 'large',
    vertical: 'large',
    small: { horizontal: 'xlarge', vertical: 'xlarge' },
  },
  label: undefined,
  themeMode: undefined,
};
