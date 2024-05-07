import { Anchor } from 'grommet';
import { Previous } from 'grommet-icons';
import { PolymorphicType } from 'grommet/utils';

export const ReverseAnchor = (
  { as, href, label, ...rest }: { as: PolymorphicType, href: string, label: string }
) => {
  return (
    <Anchor as={as} href={href} label={label} icon={<Previous />} {...rest} />
  );
}