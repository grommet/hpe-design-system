import PropTypes from 'prop-types';
import { NavHeader } from '@shared/aries-core';
import { BrandIdentity } from '../../components';


export const SideNavHeader = ({ open, setOpen, ...rest }) => (
    <NavHeader
        logo={<BrandIdentity logoOnly />}
        open={open}
        setOpen={setOpen}
        {...rest}
    />
);

SideNavHeader.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};