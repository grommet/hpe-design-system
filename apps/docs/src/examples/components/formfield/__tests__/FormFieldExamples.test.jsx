// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import {
  FormFieldExample,
  FormFieldEnteringLabeledFormValueExample,
  FormFieldCorrectingFieldValueExample,
  FormFieldValidatingNamedFormFieldExample,
  FormFieldGoodNamedValidationPreview,
  FormFieldBadNamedValidationPreview,
} from '..';

let container;
let root;

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

const render = async example => {
  await act(async () => root.render(<Grommet theme={hpe}>{example}</Grommet>));
};

const fill = async value => {
  const input = container.querySelector('input:not([type="checkbox"])');
  const { set } = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  );
  await act(async () => {
    set.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

const submit = async () => {
  await act(async () => {
    container
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
};

describe('FormField examples', () => {
  it('associates the label and updates the form-managed value', async () => {
    await render(<FormFieldEnteringLabeledFormValueExample />);
    const input = container.querySelector('input[name="projectName"]');
    expect(container.querySelector('label').htmlFor).toBe(input.id);
    expect(input.value).toBe('Infrastructure monitoring');
    await fill('Network operations');
    expect(input.value).toBe('Network operations');
    expect(container.querySelector('button')).toBeNull();
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('clears the email error while retaining help', async () => {
    await render(<FormFieldCorrectingFieldValueExample />);
    expect(container.querySelector('input').getAttribute('aria-invalid')).toBe(
      'true',
    );
    await fill('operations@example.com');
    await submit();
    expect(container.querySelector('input').hasAttribute('aria-invalid')).toBe(
      false,
    );
    expect(container.textContent).toContain(
      'Enter an address such as operations@example.com.',
    );
    expect(container.querySelector('[role="status"]').textContent).toContain(
      'operations@example.com',
    );
  });

  it('blocks invalid codes and accepts the corrected code', async () => {
    await render(<FormFieldValidatingNamedFormFieldExample />);
    await submit();
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('input').getAttribute('aria-invalid')).toBe(
      'true',
    );
    await fill('OPS123');
    await submit();
    expect(container.querySelector('input').hasAttribute('aria-invalid')).toBe(
      false,
    );
    expect(container.querySelector('[role="status"]').textContent).toBe(
      'Submitted locally: OPS123',
    );
  });

  it('requires a name to validate the actual projectCode value', async () => {
    await render(<FormFieldGoodNamedValidationPreview />);
    await fill('OPS12');
    await submit();
    expect(container.querySelector('input').getAttribute('aria-invalid')).toBe(
      'true',
    );
    await fill('OPS123');
    await submit();
    expect(container.querySelector('input').hasAttribute('aria-invalid')).toBe(
      false,
    );
    await render(<FormFieldBadNamedValidationPreview />);
    await fill('OPS123');
    await submit();
    expect(container.querySelector('input').getAttribute('aria-invalid')).toBe(
      'true',
    );
  });

  it('shows password anatomy and requires a value', async () => {
    await render(<FormFieldExample />);
    const input = container.querySelector('input[name="password"]');
    expect(input.type).toBe('password');
    expect(container.querySelector('label').htmlFor).toBe(input.id);
    expect(container.textContent).toContain('*');
    expect(container.textContent).toContain(
      'Choose a password that meets all the requirements below.',
    );
    expect(container.textContent).toContain('At least 8 characters');
    const descriptionIds = input.getAttribute('aria-describedby').split(' ');
    descriptionIds.forEach(id => {
      expect(document.getElementById(id)).not.toBeNull();
    });
    await submit();
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(container.textContent).toContain('Enter a password.');
  });

  it.each(['Abcdef!', 'abcdefgh!', 'ABCDEFGH!', 'Abcdefgh'])(
    'rejects a password that misses a requirement: %s',
    async password => {
      await render(<FormFieldExample />);
      await fill(password);
      await submit();
      const input = container.querySelector('input');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(container.textContent).toContain('Password requirements not met.');
      expect(container.querySelector('[role="status"]')).toBeNull();
    },
  );

  it('accepts a corrected password and clears stale feedback', async () => {
    await render(<FormFieldExample />);
    const input = container.querySelector('input[name="password"]');
    await fill('short');
    await submit();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    await fill('Abcdefg!');
    await submit();
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(container.querySelector('[role="status"]').textContent).toBe(
      'Password meets the requirements.',
    );
    expect(container.textContent).not.toContain('Abcdefg!');
    expect(container.textContent).toContain(
      'Choose a password that meets all the requirements below.',
    );
    expect(container.textContent).toContain('At least 8 characters');
    input.getAttribute('aria-describedby').split(' ').forEach(id => {
      expect(document.getElementById(id)).not.toBeNull();
    });
    await fill('short');
    expect(container.querySelector('[role="status"]')).toBeNull();
  });
});
