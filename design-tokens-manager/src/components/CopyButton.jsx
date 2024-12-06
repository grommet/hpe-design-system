import { useState } from 'react';
import { Button } from 'grommet';
import { Copy } from 'grommet-icons';

const defaultTip = 'Copy to clipboard';

export const CopyButton = ({ content, tip = defaultTip, ...rest }) => {
  const [copyTip, setCopyTip] = useState(tip);

  const onCopy = () => {
    const duration = 2000;
    navigator.clipboard.writeText(`${JSON.stringify(content, null, 2)}`);
    setCopyTip('Copied!');
    const timer = setTimeout(() => {
      setCopyTip(tip);
    }, duration);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      a11yTitle={copyTip}
      tip={copyTip}
      icon={<Copy aria-hidden="true" />}
      onClick={onCopy}
      {...rest}
    />
  );
};
