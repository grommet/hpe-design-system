import { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

export const ThreeColumnDashboard = () => {
  const size = useContext(ResponsiveContext);

  return <div>@{size} breakpoint</div>;
};
