import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading, Paragraph } from 'grommet';
import { FormPrevious } from 'grommet-icons';

import { UpButton } from './UpButton';
import { BreadCrumbs } from './BreadCrumbs';

export const PageHeader = ({
  title,
  subtitle,
  actions,
  contextualNav,
  ...rest
}) => {
  const [upButton, setUpButton] = useState(null);
  const [breadCrumbs, setBreadCrumbs] = useState(null);

  useEffect(() => {
    if (contextualNav) {
      setUpButton(contextualNav.upButton);
      setBreadCrumbs(contextualNav.breadCrumbs);
    }
  }, [contextualNav]);

  return (
    <Header pad={{ top: 'large' }} {...rest}>
      <Box>
        <Box gap="xsmall">
          <>
            {breadCrumbs && <BreadCrumbs links={breadCrumbs} />}
            {upButton && (
              <UpButton
                alignSelf="start"
                icon={<FormPrevious />}
                {...upButton}
                label={upButton.label}
                href={upButton.href}
              />
            )}
          </>
          <Heading level={1} margin="none" size="small">
            {title}
          </Heading>
        </Box>
        {typeof subtitle === 'string' ? (
          <Paragraph margin="none">{subtitle}</Paragraph>
        ) : (
          <>{subtitle}</>
        )}
      </Box>
      {actions}
    </Header>
  );
};

PageHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node]),
  contextualNav: PropTypes.shape({
    upButton: PropTypes.object,
    breadCrumbs: PropTypes.arrayOf(PropTypes.object),
  }),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
};
