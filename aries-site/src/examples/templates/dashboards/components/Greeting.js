import React, { useContext } from 'react';
import { PageHeader } from 'grommet';
import { UserContext } from '../../global-header';

export function Greeting() {
  const { user } = useContext(UserContext);
  return (
    <PageHeader
      title={`Hello, ${user.firstName}!`}
      subtitle="Welcome to the HPE Common Cloud Console."
    />
  );
}
