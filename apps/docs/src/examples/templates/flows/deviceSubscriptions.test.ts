// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import {
  devices,
  subscriptionStatuses,
} from '../data-collections/content/devices/data';
import { getDeviceSubscription } from './deviceSubscriptions';

describe('connected device subscriptions', () => {
  it.each(subscriptionStatuses.filter(status => status !== 'Unknown'))(
    'preserves device identity, renewal and status for %s subscriptions',
    status => {
      const selected = devices.find(
        device => device.subscriptionStatus === status,
      )!;
      const details = getDeviceSubscription(selected);
      expect(details.statusLabel).toBe(status);
      expect(details.subscriptionData.renewal).toEqual(
        selected.subscriptionDate,
      );
      const { renewal } = details.subscriptionData;
      expect(details.subscriptionData.key).toContain(
        [
          renewal.getFullYear(),
          String(renewal.getMonth() + 1).padStart(2, '0'),
          String(renewal.getDate()).padStart(2, '0'),
        ].join('-'),
      );
      expect(details.subscriptionData.deviceCount).toBe(
        details.devicesData.length,
      );
      expect(details.devicesData[0]).toMatchObject({
        id: selected.id,
        serialNumber: selected.serialNumber,
        model: selected.model,
        type: selected.type,
        location: selected.location,
      });
      details.devicesData.forEach(member => {
        const source = devices.find(device => device.id === member.id)!;
        expect(source.subscriptionStatus).toBe(status);
        expect(source.subscriptionDate).toEqual(selected.subscriptionDate);
        expect(source.type).toBe(selected.type);
        expect(getDeviceSubscription(source).subscriptionData.key).toBe(
          details.subscriptionData.key,
        );
      });
      expect(details.subscriptionData.daysRemaining < 0).toBe(
        status === 'Expired',
      );
    },
  );

  it('does not invent subscriptions for unknown devices', () => {
    const unknown = devices.find(
      device => device.subscriptionStatus === 'Unknown',
    )!;
    expect(() => getDeviceSubscription(unknown)).toThrow(
      'No known subscription',
    );
  });
});
