# @shared/hooks

A collection of reusable React hooks for the HPE Design System.

## Overview

This package provides custom React hooks that can be shared across different applications within the HPE Design System monorepo. All hooks are built with TypeScript and include comprehensive tests.

## Installation

This package is part of the HPE Design System monorepo and is available as a workspace dependency:

```json
{
  "dependencies": {
    "@shared/hooks": "*"
  }
}
```

## Available Hooks

### useSessionStorage

A React hook that provides a simple way to manage browser sessionStorage with React state synchronization.

#### Features

- **Type-safe**: Full TypeScript support with generic typing
- **SSR-compatible**: Safely handles server-side rendering scenarios
- **Error handling**: Graceful fallback when sessionStorage is unavailable
- **Function updates**: Supports both direct values and updater functions

##### To Do

Consider supporting in the future. Session storage is isolated to a specific browser tab and is not shared across multiple tabs or windows.
- **Cross-tab synchronization**: Automatically syncs changes across browser tabs

Possible approach [useSyncExternalStore + BroadcastChannel API](#store-state-across-tabs).


#### Usage

```typescript
import { useSessionStorage } from '@shared/hooks';

function MyComponent() {
  // Basic usage with string
  const [name, setName] = useSessionStorage('userName', 'Anonymous');

  // Usage with objects
  const [user, setUser] = useSessionStorage('user', { 
    id: null, 
    email: '' 
  });

  // Usage with function updates
  const [count, setCount] = useSessionStorage('counter', 0);
  const increment = () => setCount(prev => prev + 1);

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={() => setName('John Doe')}>
        Set Name
      </button>
      
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}
```

#### API

```typescript
const [value, setValue] = useSessionStorage<T>(key: string, initialValue: T)
```

**Parameters:**
- `key` (string): The sessionStorage key to store the value under
- `initialValue` (T): The initial value to use if no stored value exists

**Returns:**
- `value` (T): The current value from sessionStorage or initialValue
- `setValue` (function): Function to update the stored value

**setValue function:**
```typescript
setValue(value: T | ((prevValue: T) => T)): void
```

#### Examples

##### Basic String Storage
```typescript
const [username, setUsername] = useSessionStorage('username', '');

// Direct value update
setUsername('john_doe');

// The value persists across page reloads
```

##### Object Storage
```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
}

const [preferences, setPreferences] = useSessionStorage<UserPreferences>(
  'userPrefs',
  { theme: 'light', notifications: true }
);

// Update entire object
setPreferences({ theme: 'dark', notifications: false });

// Update using function (for partial updates)
setPreferences(prev => ({ ...prev, theme: 'dark' }));
```

##### Array Storage
```typescript
const [items, setItems] = useSessionStorage<string[]>('items', []);

// Add item
setItems(prev => [...prev, 'new item']);

// Remove item
setItems(prev => prev.filter(item => item !== 'item to remove'));
```

#### Error Handling

The hook includes built-in error handling for scenarios where sessionStorage is unavailable (e.g., private browsing mode, storage quota exceeded):

- If sessionStorage operations fail, the hook logs the error and continues to work with in-memory state
- SSR environments are handled gracefully by checking for `window` availability
- Malformed JSON in storage is handled by falling back to the initial value

#### Browser Support

This hook works in all modern browsers that support:
- React 16.8+ (hooks)
- sessionStorage API
- JSON.parse/stringify

For older browsers or environments without sessionStorage, the hook will work as a regular `useState` hook.

## Development

### Building the Package

```bash
cd shared/hooks
yarn build
```

This compiles TypeScript to JavaScript and generates type definitions in the `dist/` directory.

### Running Tests

```bash
cd shared/hooks
yarn test
```

Tests are written using Vitest and React Testing Library.

### Linting

```bash
cd shared/hooks
yarn lint
```

### Type Checking

```bash
cd shared/hooks
yarn check-types
```

## Project Structure

```
shared/hooks/
├── src/
│   ├── index.ts              # Main entry point, exports all hooks
│   ├── useSessionStorage.ts   # useSessionStorage hook implementation
│   └── __tests__/
│       └── setup.ts           # Test environment setup
├── __tests__/
│   └── useSessionStorage.test.ts  # Tests for useSessionStorage
├── dist/                      # Built JavaScript files (generated)
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Adding New Hooks

When adding a new hook to this package:

1. Create the hook file in `src/`
2. Export it from `src/index.ts`
3. Add comprehensive tests in `__tests__/`
4. Update this documentation
5. Run `yarn build` to compile
6. Run `yarn test` to ensure all tests pass

### Hook Guidelines

- Use TypeScript with proper generic types
- Handle SSR scenarios (check for `window`)
- Include error handling for edge cases
- Write comprehensive tests
- Follow React hooks rules
- Document all parameters and return values
- Consider cross-browser compatibility

## Contributing

When contributing to this package:

1. Follow the existing code style and patterns
2. Add tests for all new functionality
3. Update documentation for any API changes
4. Ensure all existing tests continue to pass
5. Consider backward compatibility

## License

This package is part of the HPE Design System and follows the same license terms as the main project.

## Opportunities

### Store state across tabs

Potential approach:

1. Create external store

```javascript
// src/store/broadcastStore.js
let currentMessage = null;
const listeners = new Set();
let channel;

// Function to get the latest snapshot of the state
export function getSnapshot() {
  return currentMessage;
}

// Function to subscribe to changes in the store
export function subscribe(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// Function to send a message via the BroadcastChannel
export function sendMessage(message, channelName) {
  if (!channel) {
    channel = new BroadcastChannel(channelName);
    channel.onmessage = (event) => {
      // Update the state and notify listeners
      currentMessage = event.data;
      listeners.forEach(listener => listener());
    };
  }
  channel.postMessage(message);
}

// Initialize the channel once
export function initChannel(channelName) {
  if (!channel) {
    channel = new BroadcastChannel(channelName);
    channel.onmessage = (event) => {
      // Update the state and notify listeners
      currentMessage = event.data;
      listeners.forEach(listener => listener());
    };
  }
}
```

2. Create custom hook

```javascript
// src/hooks/useBroadcastChannel.js
import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../store/broadcastStore';

export function useBroadcastChannel() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

3. Use the hook

```javascript
// src/components/BroadcastComponent.js
import React, { useEffect, useState } from 'react';
import { sendMessage, initChannel } from '../store/broadcastStore';
import { useBroadcastChannel } from '../hooks/useBroadcastChannel';

const channelName = 'my-app-channel';

function BroadcastComponent() {
  const latestMessage = useBroadcastChannel();
  const [inputValue, setInputValue] = useState('');

  // Initialize the channel when the component mounts
  useEffect(() => {
    initChannel(channelName);
  }, []);

  const handleSendMessage = () => {
    if (inputValue) {
      sendMessage(inputValue, channelName);
      setInputValue(''); // Clear the input after sending
    }
  };

  return (
    <div>
      <h1>Cross-Tab State Sync</h1>
      <p>Latest message from another tab: <b>{latestMessage || 'No messages yet.'}</b></p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default BroadcastComponent;
```
