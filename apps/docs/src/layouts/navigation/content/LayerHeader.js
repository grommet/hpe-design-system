import { useContext } from 'react';
import { Box, Button, Header, ResponsiveContext } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import PropTypes from 'prop-types';
import { BrandIdentity } from '../../../components';


export const LayerHeader = ({ onClose, ...rest }) => {
    const breakpoint = useContext(ResponsiveContext);

    const mobile = breakpoint === 'xsmall';
    return (
        <Header
            pad={{
                left: 'medium',
                right: '3xsmall',
                vertical: 'xsmall',
            }}
            direction="row"
            align="center"
            justify="between"
            {...rest}
        >
            <Box onClick={() => mobile ? onClose() : undefined}>
                <BrandIdentity logoOnly />
            </Box>
            <Button
                active
                icon={<Sidebar
                    aria-hidden
                    style={{ transform: 'rotate(180deg)' }} />}
                a11yTitle="Close navigation menu"
                onClick={onClose}
            />
        </Header >
    );
};

LayerHeader.propTypes = {
    onClose: PropTypes.func.isRequired,
};
