/* eslint-disable react/prop-types */
import './App.css';
import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Select from '@radix-ui/react-select';
import { Button } from './components/Button';
import {
  // CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';

const Text = ({ size, children }) => (
  <span key={size} className={`text-${size} text-text-default`}>
    {children}
  </span>
);

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item className="SelectItem" {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem';

function App() {
  return (
    // TO DO right now the namespace of "background" and "text" is repeated
    // is that okay?
    <div className="flex flex-col items-start bg-background-back px-large pt-medium pb-large  min-h-screen	w-full gap-medium">
      <div className="flex w-full justify-between items-start py-medium">
        <h1 className="text-text-strong">Test page</h1>
        <div className="flex flex-row gap-small">
          <Button label="Default button" />
          <Button label="Secondary button" kind="secondary" />
          <Button
            label="Toggle theme mode"
            kind="primary"
            onClick={() => {
              if (
                !document.documentElement.getAttribute('data-mode') ||
                document.documentElement.getAttribute('data-mode') === ''
              ) {
                document.documentElement.setAttribute('data-mode', 'dark');
              } else {
                document.documentElement.setAttribute('data-mode', '');
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">Tailwind classes on native HTML</h2>
        <p className="text-text-default">
          Banjo pour-over kinfolk mukbang taiyaki semiotics. Craft beer neutral
          milk hotel tonx chicharrones small batch taxidermy hexagon church-key
          hot chicken salvia solarpunk cred godard. Franzen shoreditch
          kickstarter crucifix. Polaroid pop-up sus, street art narwhal franzen
          bruh air plant authentic lyft.
        </p>
        {[
          'xsmall',
          'small',
          'medium',
          'large',
          'xxlarge',
          '3xl',
          '4xl',
          '5xl',
        ].map(size => (
          <Text key={size} size={size}>
            {size}
          </Text>
        ))}
      </div>
      <div className="flex flex-col items-start bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">RadixUI with CSS variables</h2>
        <Switch.Root className="SwitchRoot" id="airplane-mode">
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
        <Select.Root>
          <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select a fruit" />
            <Select.Icon className="SelectIcon">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="SelectViewport">
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
}

export default App;
