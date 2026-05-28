import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button, Header } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { useNavState } from './NavContext';
import { AppIdentity } from '../../components';

export const MobileNavHeader = ({ ...rest }) => {
  const { setMobileNavOpen } = useNavState();
  const buttonRef = useRef(null);

  // Grommet Layer's FocusedContainer focuses the first focusable
  // descendant on mount. setTimeout defers our .focus() call to run
  // after Layer's focus management completes.
  useEffect(() => {
    const timer = setTimeout(() => {
      buttonRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Header
      pad={{
        left: 'medium',
        right: 'small',
        vertical: 'xsmall',
      }}
      direction="row"
      align="center"
      justify="between"
      {...rest}
    >
      {/* legacyBehavior restores pre-Next.js 13 behavior where Link
              does not render its own <a>, instead passing href/onClick to
              the child via cloneElement and attaches a ref via React's ref 
              forwarding. Required here because AppIdentity already renders 
              an anchor via its <Button href>. This prop has been dropped 
              in Next.js 13.15.11+, so this will need to be  refactored when 
              upgrading. More details:
              https://nextjs.org/docs/13/pages/api-reference/components/link#legacybehavior */}
      <Link href="/" passHref legacyBehavior>
        <AppIdentity logoOnly />
      </Link>
      <Button
        ref={buttonRef}
        active
        aria-controls="navigation-menu"
        aria-expanded
        alignSelf="start"
        a11yTitle="Close navigation"
        icon={<Sidebar aria-hidden style={{ rotate: '180deg' }} />}
        onClick={() => setMobileNavOpen(false)}
        tip="Close navigation"
      />
    </Header>
  );
};
