import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Card, useAnalytics } from 'grommet';
import PropTypes from 'prop-types';
import { internalLink } from '..';

export const LinkCard = ({ href, ...rest }) => {

  const ref = useRef();
  const router = useRouter();
  const sendAnalytics = useAnalytics();

  const isInternalLink = internalLink.test(href);
  const handleClick = (e) => {
    sendAnalytics({ type: 'cardClick', href, element: ref.current });
    
    if (isInternalLink) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <Card
      as="a"
      href={href}
      onClick={handleClick}
      target={!isInternalLink ? '_blank' : undefined}
      style={{ textDecoration: 'none' }}
      ref={ref}
      {...rest}
    />
  );
};

LinkCard.propTypes = {
  href: PropTypes.string,
};
