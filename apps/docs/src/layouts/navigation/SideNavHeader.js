import PropTypes from 'prop-types';
import { NavHeader } from '@shared/aries-core';
import Link from 'next/link';
import { BrandIdentity } from '../../components';



export const SideNavHeader = ({ open, setOpen, ...rest }) => (
    <NavHeader
        logo={
            <Link href="/" passHref legacyBehavior>
                <BrandIdentity logoOnly />
            </Link>
        }
        open={open}
        setOpen={setOpen}
        {...rest}
    />
);

SideNavHeader.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};