import React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Text } from 'grommet';

// APPROACH 1: Breadcrumbs as component with props
// export const BreadCrumbs = ({ items, router }) => (
//   <Box direction="row" gap="xxsmall">
//     {items.map((crumb, index) => {
//       let routedLink = router(crumb);
//       routedLink = cloneElement(routedLink, {
//         children: <Anchor label={crumb.label} />,
//       });

//       return (
//         <Text size="xsmall" key={crumb.label}>
//           {routedLink}
//           {index < items.length - 1 ? ' / ' : undefined}
//         </Text>
//       );
//     })}
//   </Box>
// );

// APPROACH 2: Breadcrumbs are outer container
export const BreadCrumbs = ({ children }) => (
  <Box direction="row" gap="xxsmall">
    {React.Children.toArray(children).map((child, index) => (
      <Text>
        {child}
        {index < children.length - 1 ? ' / ' : undefined}
      </Text>
    ))}
  </Box>
);

BreadCrumbs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  // items: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     label: PropTypes.string,
  //     href: PropTypes.string,
  //   }),
  // ),
  // router: PropTypes.func,
};
