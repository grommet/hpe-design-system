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

- [useInert](#useInert)
- [useLocalStorage](#useLocalStorage)
- [useSessionStorage](#useSessionStorage)

### useInert

A React hook that disables focus for all interactive elements within a container by setting `tabindex="-1"` on them. Useful for card previews and other non-interactive display components that contain focusable elements.

#### Features

- **Broad selector support**: Covers `button`, `input`, `a`, `select`, and `textarea` elements
- **Safe with null refs**: Designed to work with `useRef(null)` — the React best practice for DOM refs
- **Zero configuration**: No options required, just pass the container ref

#### Usage

```typescript
import { useInert } from '@shared/hooks';

export const ComponentPreview = () => {
  const ref = useInert();

  return (
    <div ref={ref}>
      {/* interactive elements inside will not be focusable */}
    </div>
  );
};
```

#### API

```typescript
const ref = useInert(): RefObject<HTMLElement | null>
```

**Parameters:** none

**Returns:**

- `ref` (RefObject<HTMLElement | null>): A ref initialized with `null` to attach to the container element. The hook handles creating the ref internally — no `useRef` needed at the call site.

#### Why the hook owns the ref

The hook creates `useRef<HTMLElement>(null)` internally and returns it. This keeps call sites to a single line and ensures the ref is always correctly initialized with `null` — the React 19 requirement — without the consumer needing to know about it:

```typescript
// Clean — one line, ref is owned by the hook
const ref = useInert();

// Avoid — two lines, consumer manages the ref manually
const ref = useRef(null);
useInert(ref);
```

#### Elements covered

The hook disables focus on the following element types:

- `button`
- `input`
- `a` (anchor links)
- `select`
- `textarea`

### useLocalStorage

A React hook that provides a simple way to manage browser localStorage with React state synchronization. Unlike sessionStorage, data persists across browser sessions and tab/window closes.

#### Features

- **Type-safe**: Full TypeScript support with generic typing
- **SSR-compatible**: Safely handles server-side rendering scenarios
- **Error handling**: Graceful fallback when localStorage is unavailable
- **Function updates**: Supports both direct values and updater functions
- **Cross-tab synchronization**: Automatically syncs changes across browser tabs via the `storage` event

#### Usage

```typescript
import { useLocalStorage } from '@shared/hooks';

const defaultUser = {
  id: null,
  email: '',
};

function MyComponent() {
  // Basic usage with string
  const [name, setName] = useLocalStorage('userName', 'Anonymous');

  // Usage with objects (hoist non-primitive initial values to avoid recreating them on every render)
  const [user, setUser] = useLocalStorage('user', defaultUser);

  // Usage with function updates
  const [count, setCount] = useLocalStorage('counter', 0);
  const increment = () => setCount(prev => prev + 1);

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={() => setName('John Doe')}>Set Name</button>

      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

#### API

```typescript
const [value, setValue] = useLocalStorage<T>(key: string, initialValue: T)
```

**Parameters:**

- `key` (string): The localStorage key to store the value under
- `initialValue` (T): The initial value to use if no stored value exists

**Returns:**

- `value` (T): The current value from localStorage or initialValue
- `setValue` (function): Function to update the stored value

**setValue function:**

```typescript
setValue(value: T | ((prevValue: T) => T)): void
```

#### Examples

##### Basic String Storage

```typescript
const [username, setUsername] = useLocalStorage('username', '');

// Direct value update
setUsername('john_doe');

// The value persists across browser sessions and page reloads
```

##### Object Storage

```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
}

const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
  'userPrefs',
  { theme: 'light', notifications: true },
);

// Update entire object
setPreferences({ theme: 'dark', notifications: false });

// Update using function (for partial updates)
setPreferences(prev => ({ ...prev, theme: 'dark' }));
```

##### Array Storage

```typescript
const [items, setItems] = useLocalStorage<string[]>('items', []);

// Add item
setItems(prev => [...prev, 'new item']);

// Remove item
setItems(prev => prev.filter(item => item !== 'item to remove'));
```

#### Error Handling

The hook includes built-in error handling for scenarios where localStorage is unavailable (e.g., private browsing mode, storage quota exceeded):

- If localStorage operations fail, the hook logs the error and continues to work with in-memory state
- SSR environments are handled gracefully by checking for `window` availability
- Malformed JSON in storage is handled by falling back to the initial value

#### Browser Support

This hook works in all modern browsers that support:

- React 16.8+ (hooks)
- localStorage API
- JSON.parse/stringify

For older browsers or environments without localStorage, the hook will work as a regular `useState` hook.

#### localStorage vs sessionStorage

| Feature                  | `useLocalStorage`            | `useSessionStorage` |
| ------------------------ | ---------------------------- | ------------------- |
| Persists across sessions | Yes                          | No                  |
| Shared across tabs       | Yes                          | No                  |
| Cleared on tab close     | No                           | Yes                 |
| Cross-tab sync           | Yes (native `storage` event) | No                  |

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
    email: '',
  });

  // Usage with function updates
  const [count, setCount] = useSessionStorage('counter', 0);
  const increment = () => setCount(prev => prev + 1);

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={() => setName('John Doe')}>Set Name</button>

      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
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
  { theme: 'light', notifications: true },
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
pnpm build
```

This compiles TypeScript to JavaScript and generates type definitions in the `dist/` directory.

### Running Tests

```bash
cd shared/hooks
pnpm test
```

Tests are written using Vitest and React Testing Library.

### Linting

```bash
cd shared/hooks
pnpm lint
```

### Type Checking

```bash
cd shared/hooks
pnpm check-types
```

## Project Structure

```
shared/hooks/
├── src/
│   ├── index.ts              # Main entry point, exports all hooks
│   ├── useInert.ts           # useInert hook implementation
│   ├── useLocalStorage.ts    # useLocalStorage hook implementation
│   ├── useSessionStorage.ts  # useSessionStorage hook implementation
│   └── __tests__/
│       └── setup.ts          # Test environment setup
├── __tests__/
│   ├── useInert.test.ts          # Tests for useInert
│   ├── useLocalStorage.test.ts   # Tests for useLocalStorage
│   └── useSessionStorage.test.ts # Tests for useSessionStorage
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
5. Run `pnpm build` to compile
6. Run `pnpm test` to ensure all tests pass

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
    channel.onmessage = event => {
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
    channel.onmessage = event => {
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
      <p>
        Latest message from another tab:{' '}
        <b>{latestMessage || 'No messages yet.'}</b>
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default BroadcastComponent;
```
