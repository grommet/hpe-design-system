import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const NavContext = createContext({
    navOpen: true,
    setNavOpen: () => { },
});

export const useNavState = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
    const [navOpen, setNavOpen] = useState(true);
    const value = useMemo(() => ({ navOpen, setNavOpen }), [navOpen]);

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};


NavProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
