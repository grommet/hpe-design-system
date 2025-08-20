import { Link } from "react-router-dom";
import { Anchor } from "grommet";
import { Previous } from "grommet-icons";

export const ReverseAnchor = (
  { label, href, onClick, ...rest }:
    {
      label?: string;
      href: string;
      onClick?: () => void;
    }
) => (
  <Anchor
    as={Link}
    to={href}
    icon={<Previous />}
    label={label}
    onClick={onClick}
    {...rest}
  />
);