import styled from 'styled-components';
import { Box, Select, Text } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';
import { optionBefore } from '../../../../themes/theme';
import { StyleInProgress } from '../../components';

const CustomOption = styled(Box)`
  ${props => props.selected && props.index === 1 && optionBefore}
`;
export const Selects = () => {
  return (
    <ContentPane>
      <StyleInProgress />
      <Box gap="medium">
        <Compare>
          <Select
            options={['Option 1', 'Option 2', 'Option 3']}
            placeholder="Select option"
          />
        </Compare>
        <Compare>
          <Select
            options={['Option 1', 'Option 2', 'Option 3']}
            placeholder="Select option"
          >
            {(option, index, options, { selected }) => (
              <CustomOption
                key={index}
                background={
                  selected ? 'background-selected-primary-weak' : undefined
                }
                pad={{ horizontal: 'small', vertical: 'xsmall' }}
                round="xsmall"
                border={
                  selected && index !== 1
                    ? { color: 'border-selected' }
                    : undefined
                }
                selected={selected}
                // TO DO temp for theme testing
                index={index}
              >
                <Text
                  color={selected ? 'text-onSelectedPrimary' : undefined}
                  weight={500}
                >
                  {option}
                </Text>
                <Text
                  color={selected ? 'text-onSelectedPrimary' : undefined}
                  size="small"
                >
                  This is an additional description
                </Text>
              </CustomOption>
            )}
          </Select>
        </Compare>
      </Box>
    </ContentPane>
  );
};
