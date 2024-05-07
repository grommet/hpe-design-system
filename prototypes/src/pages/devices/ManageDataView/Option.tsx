import { Box, Text } from 'grommet';

export const Option = ({
  option,
  state
}: {
  option: { first?: boolean, custom?: boolean, name: string },
  state: { selected?: boolean },
}) => {
  return (<Box background={option.first ? 'background-front' : undefined}>
    {option.label &&
      <Box
        border={{ side: 'top', color: 'border-weak' }}
        pad={{ horizontal: 'small', top: 'xsmall', bottom: 'xsmall' }}
        background="background-front"
      >
        <Text size="small" color="text">
          {option.label}
        </Text>
      </Box>}
    <Box
      key={option.name}
      direction='row'
      justify='between'
      align='center'
      gap="small"
      background={state.selected ? "brand" : undefined}
      pad={{
        horizontal: 'small',
        vertical: 'xsmall'
      }}

    >
      <Text
        color="text-strong"
        weight={state.selected ? 700 : 500}
      >
        {option.name}
      </Text>
      {option.default && <Text>Default</Text>}
    </Box>
  </Box>);
}