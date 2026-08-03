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
    setTimeout(() => resolve(allOptions), 1500);
  });

const buildGroupedOptions = options =>
  options.reduce((acc, option, index) => {
    const isFirstInGroup =
      index === 0 || options[index - 1].group !== option.group;

    if (isFirstInGroup) {
      acc.push({
        label: option.group,
        value: `__group__${option.group}`,
        isGroupLabel: true,
        disabled: true,
      });
    }

    acc.push(option);
    return acc;
  }, []);

export { allOptions, buildGroupedOptions, fetchOptions };
