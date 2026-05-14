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
            {/* legacyBehavior restores pre-Next.js 13 behavior where Link
              does not render its own <a>, instead passing href/onClick to
              the child via cloneElement and attaches a ref via React's ref 
              forwarding. Required here because AppIdentity already renders 
              an anchor via its <Button href>. This prop has been dropped 
              in Next.js 13.15.11+, so this will need to be  refactored when 
              upgrading. More details:
              https://nextjs.org/docs/13/pages/api-reference/components/link#legacybehavior */}
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
                a11yTitle={open ? 'Close navigation' : 'Open navigation'}
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
