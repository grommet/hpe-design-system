// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Grommet } from 'grommet';
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
  await act(async () => root.render(<Grommet>{example}</Grommet>));
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
  it('submits the edited name and clears stale feedback', async () => {
    await render(<FormFieldEnteringLabeledFormValueExample />);
    await fill('Network operations');
    await submit();
    expect(container.querySelector('[role="status"]').textContent).toBe(
      'Submitted locally: Network operations',
    );
    await fill('Infrastructure monitoring');
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

  it('updates playground disabled, required, and help options', async () => {
    await render(<FormFieldExample />);
    await submit();
    expect(container.querySelector('[role="status"]')).toBeNull();
    const toggles = container.querySelectorAll('input[type="checkbox"]');
    await act(async () => toggles[0].click());
    expect(container.querySelector('input[name="projectName"]').disabled).toBe(
      true,
    );
    await act(async () => {
      toggles[0].click();
      toggles[1].click();
      toggles[2].click();
    });
    await submit();
    expect(container.querySelector('[role="status"]').textContent).toBe(
      'Submitted locally: (empty value)',
    );
    expect(container.textContent).not.toContain(
      'Enter a name for the project.',
    );
  });
});
