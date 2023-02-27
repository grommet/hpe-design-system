import React from 'react';
import { Box, Button } from 'grommet';
import { Filter, Edit, Add, LinkNext } from 'grommet-icons';

// export const ButtonExample = () => (
//   <Box gap="medium" flex={false}>
//     <Box direction="row" align="start" gap="medium" pad="medium">
//       <Box align="start" gap="small">
//         <Button
//           label="Secondary (small)"
//           secondary
//           size="small"
//           icon={<LinkNext color="green!" />}
//           reverse
//         />
//         <Button
//           label="Secondary"
//           secondary
//           icon={<LinkNext color="green!" />}
//           reverse
//         />
//         <Button
//           label="Secondary (large)"
//           secondary
//           size="large"
//           icon={<LinkNext color="green!" />}
//           reverse
//         />
//         <Button icon={<Edit />} secondary />
//         <Button icon={<Add />} secondary size="large" />
//       </Box>

//       <Box align="start" gap="small">
//         <Button label="Toolbar" kind="toolbar" />
//         <Button label="Toolbar, active" active kind="toolbar" />
//         <Button label="Toolbar, disabled" disabled kind="toolbar" />
//         <Button icon={<Filter />} kind="toolbar" />
//       </Box>
//     </Box>
//     <Box>
//       <Box direction="row" gap="large">
//         <Box>
//           <Text>
//             Default anchor: <Anchor href="#" label="Anchor" size="medium" />
//           </Text>
//           <Text size="large">
//             Large:{' '}
//             <Anchor
//               href="#"
//               label="Add users"
//               icon={<LinkNext />}
//               reverse
//             />
//           </Text>
//           <Text size="medium">
//             Medium:{' '}
//             <Anchor
//               href="#"
//               label="Stage instance"
//               icon={<LinkNext />}
//               reverse
//               size="medium"
//             />
//           </Text>
//           <Text size="small">
//             Small:{' '}
//             <Anchor
//               href="#"
//               label="Buy now"
//               icon={<LinkNext />}
//               reverse
//               size="small"
//             />
//           </Text>
//         </Box>
//         <Box>
//           <Text>
//             Default anchor: <Anchor href="#" label="Anchor" size="medium" />
//           </Text>
//           <Text size="large">
//             Large: <Anchor href="#" label="Add users" />
//           </Text>
//           <Text size="medium">
//             Medium: <Anchor href="#" label="Stage instance" size="medium" />
//           </Text>
//           <Text size="small">
//             Small: <Anchor href="#" label="Buy now" size="small" />
//           </Text>
//         </Box>
//       </Box>
//       <Paragraph>
//         Here is a block of text that has an{' '}
//         <Anchor label="anchor embedded" size="medium" /> in it. The size needs
//         to be 14pt (18.667px) on light mode.
//       </Paragraph>
//     </Box>
//     <Box direction="row" gap="small" pad={{ bottom: 'large' }}>
//       <Box width="medium">
//         <TextInput icon={<Search size="18px" />} placeholder="Search" />
//       </Box>
//       <Button icon={<Filter />} kind="toolbar" />
//     </Box>
//   </Box>
// );

export const ButtonExample = () => (
  <Box direction="row" align="start" gap="medium" pad="medium">
    <Box align="start" gap="small">
      <Add size="large" />
      <Button label="Default (small)" size="small" />
      <Button label="Default" />
      <Button label="Default (large)" size="large" />
      <Button label="Default, active" active />
      <Button label="Default, disabled" disabled />
      <Button icon={<Edit />} />
      <Button icon={<Add />} size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button label="Secondary (small)" secondary size="small" />
      <Button label="Secondary" secondary />
      <Button label="Secondary (large)" secondary size="large" />
      <Button label="Secondary, active" active secondary />
      <Button label="Secondary, disabled" disabled secondary />
      <Button icon={<Edit />} secondary />
      <Button icon={<Add />} secondary size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button
        label="Secondary (small)"
        secondary
        size="small"
        icon={<LinkNext color="green!" />}
        reverse
      />
      <Button
        label="Secondary"
        secondary
        icon={<LinkNext color="green!" />}
        reverse
      />
      <Button
        label="Secondary (large)"
        secondary
        size="large"
        icon={<LinkNext color="green!" />}
        reverse
      />
    </Box>
    <Box align="start" gap="small">
      <Button label="Primary (small)" size="small" primary />
      <Button label="Primary" primary />
      <Button label="Primary (large)" size="large" primary />
      <Button label="Primary, active" active primary />
      <Button label="Primary, disabled" disabled primary />
      <Button icon={<Edit />} primary />
      <Button icon={<Add />} primary size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button
        label="Primary (small)"
        primary
        size="small"
        icon={<LinkNext color="text-primary-button" />}
        reverse
      />
      <Button
        label="Primary"
        primary
        icon={<LinkNext color="text-primary-button" />}
        reverse
      />
      <Button
        label="Primary (large)"
        primary
        size="large"
        icon={<LinkNext color="text-primary-button" />}
        reverse
      />
    </Box>
    <Box align="start" gap="small">
      <Button label="CTA primary (small)" size="small" kind="cta-primary" />
      <Button label="CTA primary" kind="cta-primary" />
      <Button label="CTA primary (large)" size="large" kind="cta-primary" />
      <Button label="CTA primary, active" active kind="cta-primary" />
      <Button label="CTA primary, disabled" disabled kind="cta-primary" />
    </Box>
    <Box align="start" gap="small">
      <Button label="Toolbar" kind="toolbar" />
      <Button label="Toolbar, active" active kind="toolbar" />
      <Button label="Toolbar, disabled" disabled kind="toolbar" />
      <Button icon={<Filter />} kind="toolbar" />
    </Box>
  </Box>
);
