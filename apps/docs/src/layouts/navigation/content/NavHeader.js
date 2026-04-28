import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { Sidebar as SidebarIcon } from '@hpe-design/icons-grommet';
import { AppIdentity2 } from '../../../components';


export const NavHeader = ({ open, setOpen, setActiveItem, ...rest }) => {
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
            justify={open ? 'between' : 'center'}
            gap="xxsmall"
            pad={{
                top: 'xsmall',
                bottom: 'xxsmall',
                horizontal: open ? 'small' : undefined,
            }}
            style={{ position: 'sticky', top: 0 }}
            flex={false}
            {...rest}
        >
            {open && (
                <Link href="/">
                    <AppIdentity2 setActiveItem={setActiveItem} logoOnly />
                </Link>
            )}
            <Button
                a11yTitle={open ? 'Close navigation' : 'Open navigation'}
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

NavHeader.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setActiveItem: PropTypes.func.isRequired,
};