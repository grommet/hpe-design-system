import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
} from 'react';
import { ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';

export const NavContext = createContext({
    navOpen: true,
    setNavOpen: () => { },
    mobileNavOpen: false,
    setMobileNavOpen: () => { },
    isMobile: false,
});

export const useNavState = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
    const breakpoint = useContext(ResponsiveContext);
    const isMobile = ['xsmall', 'small'].includes(breakpoint);
    // Desktop sidebar expand/collapse state (default: open)
    const [navOpen, setNavOpen] = useState(true);
    // Mobile drawer visibility state (default: closed)
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleNav = useCallback((val) => {
        setNavOpen(val);
    }, []);

    const toggleMobileNav = useCallback((val) => {
        setMobileNavOpen(val);
    }, []);

    const value = useMemo(
        () => ({
            navOpen,
            setNavOpen: toggleNav,
            mobileNavOpen,
            setMobileNavOpen: toggleMobileNav,
            isMobile,
        }),
        [navOpen, toggleNav, mobileNavOpen, toggleMobileNav, isMobile],
    );

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};


NavProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
