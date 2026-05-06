import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Button } from 'grommet';
import { Sidebar as SidebarIcon } from '@hpe-design/icons-grommet';
import { AppIdentity } from '../../components';

export const SideNavHeader = ({ open, setOpen }) => {
    const [autoFocus, setAutoFocus] = useState(false);
    // After mount set autoFocus to true
    useEffect(() => {
        setAutoFocus(true);
    }, []);

    return (
        <Box
            direction="row"
            align="center"
            background="background-front"
            gap="xxsmall"
            justify="between"
            pad={{
                top: 'xsmall',
                bottom: 'xxsmall',
                horizontal: open ? 'small' : undefined,
            }}
            style={{
                position: 'sticky',
                top: 0,
            }}
            flex={false}
        >
            {open && (
                <Link href="/" passHref legacyBehavior>
                    <AppIdentity logoOnly />
                </Link>
            )}
            <Button
                aria-controls={open ? 'navigation-menu' : undefined}
                aria-expanded={open}
                active={open}
                alignSelf="start"
                autoFocus={autoFocus}
                icon={<SidebarIcon aria-hidden />}
                onClick={() => setOpen(!open)}
                tip={open ? 'Close navigation' : 'Open navigation'}
            />
        </Box>
    );
};

SideNavHeader.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};
