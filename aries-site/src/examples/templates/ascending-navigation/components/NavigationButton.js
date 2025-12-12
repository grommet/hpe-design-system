/* eslint-disable react/prop-types */
import { Button } from 'grommet';

export const NavigationButton = ({ section, isActive, onClick }) => (
  <Button
    default
    icon={section.icon}
    label={section.label}
    active={isActive}
    onClick={() => onClick(section.id)}
  />
);
