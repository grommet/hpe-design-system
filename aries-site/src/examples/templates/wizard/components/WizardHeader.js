import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Header, ResponsiveContext, Text } from 'grommet';
import { Close, LinkPrevious } from 'grommet-icons';
import { WizardContext } from '.';

export const WizardHeader = ({ setOpen, titleId, cancelId, previousId }) => {
  const size = useContext(ResponsiveContext);
  const { activeIndex, activeStep, setActiveIndex, steps, wizardTitle } =
    useContext(WizardContext);
  return (
    <Header background="background-contrast" pad="xsmall" responsive={false}>
      <Box
        direction="row"
        align="center"
        width={{ max: '5xlarge' }}
        margin="auto"
        justify="center"
        fill="horizontal"
      >
        <Box direction="row" flex>
          {activeStep > 1 && (
            <Button
              id={previousId}
              label={
                !['xsmall', 'small'].includes(size)
                  ? (steps[activeIndex - 1] && steps[activeIndex - 1].title) ||
                    `Step ${activeStep - 1} title`
                  : undefined
              }
              icon={<LinkPrevious />}
              onClick={() => setActiveIndex(activeIndex - 1)}
            />
          )}
        </Box>
        <Box>
          <Text color="text-strong" weight={500} id={titleId}>
            {wizardTitle}
          </Text>
        </Box>
        <Box direction="row" flex justify="end">
          <Button
            id={cancelId}
            label={!['xsmall', 'small'].includes(size) ? 'Cancel' : undefined}
            icon={<Close />}
            reverse
            onClick={() => setOpen(true)}
          />
        </Box>
      </Box>
    </Header>
  );
};

WizardHeader.propTypes = {
  setOpen: PropTypes.func.isRequired,
  titleId: PropTypes.string,
  cancelId: PropTypes.string,
  previousId: PropTypes.string,
};
