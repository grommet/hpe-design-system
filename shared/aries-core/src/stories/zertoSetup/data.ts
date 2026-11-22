// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export type RepositoryStatus = 'ok' | 'warning' | 'critical';

export const statusLabels: Record<RepositoryStatus, string> = {
  ok: 'Healthy',
  warning: 'Warning',
  critical: 'Critical',
};

export interface Repository {
  id: string;
  name: string;
  status: RepositoryStatus;
  isDefault: boolean;
  storageType: string;
  connectionType: string;
  connectivity: 'Connected' | 'Disconnected';
  path: string;
  usedGb: number | null;
  capacityGb: number | null;
  immutability: string;
  vpgs: number;
  restorePoints: number;
  freeGb: number | null;
}

type RepositoryInput = Omit<Repository, 'freeGb'>;

const withFreeGb = (repository: RepositoryInput): Repository => ({
  ...repository,
  freeGb:
    repository.usedGb === null || repository.capacityGb === null
      ? null
      : repository.capacityGb - repository.usedGb,
});

export const repositories: Repository[] = ([
  {
    id: 'aws-s3-coldstorage',
    name: 'AWS_S3_ColdStorage',
    status: 'ok',
    isDefault: false,
    storageType: 'S3 Compatible Storage',
    connectionType: 'S3',
    connectivity: 'Connected',
    path: 's3://zerto-backup-coldstorage/long-term',
    usedGb: 7167.5,
    capacityGb: 51200,
    immutability: 'Immutable for 90 days',
    vpgs: 8,
    restorePoints: 310,
  },
  {
    id: 'azure-blob-archive',
    name: 'Azure_Blob_Archive',
    status: 'warning',
    isDefault: false,
    storageType: 'Azure',
    connectionType: 'Azure API',
    connectivity: 'Connected',
    path: 'https://zertobackup.blob.core.windows.net/archive',
    usedGb: 3686.4,
    capacityGb: 8192,
    immutability: 'Per VPG retention',
    vpgs: 5,
    restorePoints: 76,
  },
  {
    id: 'primary-backup-repository',
    name: 'Primary_Backup_Repository',
    status: 'ok',
    isDefault: true,
    storageType: 'StoreOnce',
    connectionType: 'Catalyst',
    connectivity: 'Connected',
    path: '\\\\10.171.59.70\\PrimaryBackup',
    usedGb: 511.75,
    capacityGb: 2048,
    immutability: 'Per VPG retention',
    vpgs: 11,
    restorePoints: 128,
  },
  {
    id: 'site1-local-repository',
    name: 'Site1_Local_Repository',
    status: 'ok',
    isDefault: false,
    storageType: 'Network Share Datastore',
    connectionType: 'Local',
    connectivity: 'Connected',
    path: 'C:\\ZertoBackups\\Site1',
    usedGb: 0.5,
    capacityGb: 120,
    immutability: 'Not configured',
    vpgs: 0,
    restorePoints: 0,
  },
  {
    id: 'site2-nearlyfull-repository',
    name: 'Site2_NearlyFull_Repository',
    status: 'warning',
    isDefault: false,
    storageType: 'Network Share',
    connectionType: 'NFS',
    connectivity: 'Connected',
    path: '/mnt/nfs/site2_backups',
    usedGb: 419.5,
    capacityGb: 512,
    immutability: 'Per VPG retention',
    vpgs: 6,
    restorePoints: 22,
  },
  {
    id: 'site3-critical-repository',
    name: 'Site3_Critical_Repository',
    status: 'critical',
    isDefault: false,
    storageType: 'Data Domain',
    connectionType: 'SMB',
    connectivity: 'Connected',
    path: '\\\\10.171.59.92\\Site3Backups',
    usedGb: 249.25,
    capacityGb: 256,
    immutability: 'Per VPG retention',
    vpgs: 3,
    restorePoints: 9,
  },
  {
    id: 'site4-repository-a',
    name: 'Site4_RepositoryA',
    status: 'ok',
    isDefault: false,
    storageType: 'Network Share',
    connectionType: 'SMB',
    connectivity: 'Connected',
    path: '\\\\10.171.59.64\\Site4Backups',
    usedGb: 2.09,
    capacityGb: 40,
    immutability: 'Per VPG retention',
    vpgs: 2,
    restorePoints: 4,
  },
  {
    id: 'site5-disconnected-repository',
    name: 'Site5_Disconnected_Repository',
    status: 'critical',
    isDefault: false,
    storageType: 'Other',
    connectionType: 'SMB',
    connectivity: 'Disconnected',
    path: '\\\\10.171.59.105\\Site5Backups',
    usedGb: null,
    capacityGb: null,
    immutability: 'Unavailable',
    vpgs: 0,
    restorePoints: 0,
  },
  {
    id: 'site7-longterm-repository',
    name: 'Site7_LongTermRetention',
    status: 'ok',
    isDefault: false,
    storageType: 'ExaGrid',
    connectionType: 'SMB',
    connectivity: 'Connected',
    path: '\\\\10.171.59.81\\Site7LongTerm',
    usedGb: 2560.38,
    capacityGb: 10240.5,
    immutability: 'Immutable for 30 days',
    vpgs: 4,
    restorePoints: 57,
  },
] as RepositoryInput[]).map(withFreeGb);

const gbFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export const formatGb = (value: number | null): string =>
  value === null ? '' : gbFormatter.format(value);
