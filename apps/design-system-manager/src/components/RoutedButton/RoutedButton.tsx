import { Link } from "react-router-dom";
import { Button } from "grommet";


const LinkedButton = ({...rest}) => (
    <Button
        as={Link}
        {...rest}
    />
);

interface RoutedButtonProps extends React.ComponentProps<typeof Button> {
    href?: string;
}

export const RoutedButton: React.FC<RoutedButtonProps> = ({ href, ...rest }) => (
    <LinkedButton
        to={href}
        {...rest}
    />
);
