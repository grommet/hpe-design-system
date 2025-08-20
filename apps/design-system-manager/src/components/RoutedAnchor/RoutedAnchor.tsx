import { Link } from 'react-router-dom';
import { Anchor } from 'grommet';

const LinkedAnchor = ({ ...rest }) => <Anchor as={Link} {...rest} />;

interface RoutedAnchorProps extends React.ComponentProps<typeof Anchor> {
	href: string;
}

export const RoutedAnchor: React.FC<RoutedAnchorProps> = ({
	href,
	...rest
}) => <LinkedAnchor to={href} {...rest} />;
