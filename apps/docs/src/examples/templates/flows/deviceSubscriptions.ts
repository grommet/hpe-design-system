// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  devices,
  referenceDate,
  type Device,
} from '../data-collections/content/devices/data';
import {
  subscription,
  type SubscribedDevice,
} from '../data-collections/content/subscription/data';

// The source examples derive independent fixtures. For this flow only, devices
// with the same type and renewal date share a synthetic subscription.
export const getDeviceSubscription = (device: Device) => {
  if (!device.subscriptionDate || device.subscriptionStatus === 'Unknown') {
    throw new Error(`No known subscription for device ${device.serialNumber}`);
  }
  const renewal = device.subscriptionDate;
  const renewalKey = [
    renewal.getFullYear(),
    String(renewal.getMonth() + 1).padStart(2, '0'),
    String(renewal.getDate()).padStart(2, '0'),
  ].join('-');
  const members = devices.filter(
    candidate =>
      candidate.type === device.type &&
      candidate.subscriptionStatus === device.subscriptionStatus &&
      candidate.subscriptionDate?.getTime() === renewal.getTime(),
  );
  const devicesData: SubscribedDevice[] = [
    device,
    ...members.filter(member => member.id !== device.id),
  ].map(member => ({
    id: member.id,
    serialNumber: member.serialNumber,
    model: member.model,
    type: member.type,
    location: member.location,
    support:
      member.subscriptionStatus === 'Expired' ? 'Expired support' : 'Supported',
  }));
  return {
    subscriptionData: {
      ...subscription,
      key: ['DEMO', device.type.toUpperCase(), renewalKey].join('-'),
      tier: 'Demo device subscription',
      product: device.type.toUpperCase(),
      renewal,
      daysRemaining: Math.round(
        (renewal.getTime() - referenceDate.getTime()) / (24 * 60 * 60 * 1000),
      ),
      deviceCount: devicesData.length,
    },
    devicesData,
    statusLabel: device.subscriptionStatus,
  };
};
