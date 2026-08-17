import { Cpu, StatusGood, StatusWarning } from '@hpe-design/icons-grommet';

const allOptions = [
  {
    label: 'Alpha Service',
    value: 'alpha',
    group: 'Production',
    icon: StatusGood,
    iconColor: 'status-ok',
  },
  {
    label: 'Beta Service',
    value: 'beta',
    group: 'Production',
    icon: StatusGood,
    iconColor: 'status-ok',
  },
  {
    label: 'Gamma Service',
    value: 'gamma',
    group: 'Production',
    icon: StatusWarning,
    iconColor: 'status-warning',
  },
  {
    label: 'Dev Service A',
    value: 'dev-a',
    group: 'Development',
    icon: Cpu,
    iconColor: 'icon',
  },
  {
    label: 'Dev Service B',
    value: 'dev-b',
    group: 'Development',
    icon: Cpu,
    iconColor: 'icon',
  },
];

const fetchOptions = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(allOptions), 15000);
  });

const buildGroupedOptions = options => {
  const groups = new Map();

  options.forEach(option => {
    const groupOptions = groups.get(option.group) || [];
    groupOptions.push(option);
    groups.set(option.group, groupOptions);
  });

  const result = [];

  groups.forEach((groupOptions, group) => {
    result.push(
      {
        label: group,
        value: `__group__${group}`,
        isGroupLabel: true,
        disabled: true,
      },
      ...groupOptions,
    );
  });

  return result;
};

export { allOptions, buildGroupedOptions, fetchOptions };
