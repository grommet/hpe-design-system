import Link from 'next/link';
import { useContext } from 'react';
import { Button, Header, ResponsiveContext } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import PropTypes from 'prop-types';
import { AppIdentity2 } from '../../../components';


export const LayerHeader = ({ onClose, setActiveItem, ...rest }) => {
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
            <Link href="/" onClick={() => mobile ? onClose() : undefined}>
                <AppIdentity2 logoOnly setActiveItem={setActiveItem} />
            </Link>
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
    setActiveItem: PropTypes.func.isRequired,
};

