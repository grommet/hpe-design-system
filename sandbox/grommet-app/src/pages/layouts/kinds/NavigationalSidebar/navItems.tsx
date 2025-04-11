export const navItems = {
  Dashboard: { key: 'dashboard', label: 'Dashboard' },
  Systems: { key: 'systems', label: 'Systems' },
  'Virtual Machines': [
    { key: 'vm1', label: 'Private Cloud' },
    { key: 'vm2', label: 'Public Cloud' },
    { key: 'vm3', label: 'View all' },
  ],
  'Bare Metal': [
    { key: 'bm1', label: 'Las Vegas', count: 0 },
    { key: 'bm2', label: 'Frankfurt', count: 3 },
    { key: 'bm3', label: 'New York', count: 4 },
    { key: 'all', label: 'View all' },
  ],
  Clusters: { key: 'clusters', label: 'Clusters' },
  Protection: { key: 'protection', label: 'Protection Groups' },
  Encryption: { key: 'encryption', label: 'Encryption Detection' },
  Reports: { key: 'reports', label: 'Reports' },
};

export const OpsRampDetailItems = {
  'Container Orchestration': [
    { key: 'kubernetes1', label: 'Kubernetes' },
    { key: 'kubernetes2', label: 'Kubernetes Cluster' },
    { key: 'kubernetes3', label: 'Kubernetes 2.0' },
  ],
  OS: { key: 'os', label: 'OS' },
  Others: { key: 'others', label: 'Others' },
  'Public Cloud': { key: 'cloud', label: 'Public Cloud' },
  Storage: { key: 'storage', label: 'Storage' },
  Virtualization: { key: 'virtualization', label: 'Virtualization' },
  'Web Services': { key: 'web', label: 'Web Services' },
};
