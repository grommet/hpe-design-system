import { Button as PrimaryAction, Menu } from 'grommet';
import ExternalWidget from 'not-allowed-package';

export default function Example() {
  return (
    <div style={{ display: 'flex' }}>
      <PrimaryAction
        color="#fff"
        background="rgb(1, 2, 3)"
        pad="12px"
        margin={{ top: '4px' }}
        label="Submit"
      />
      <Menu items={[]} />
      <ExternalWidget title="Regular text with 24px and # characters" />
    </div>
  );
}