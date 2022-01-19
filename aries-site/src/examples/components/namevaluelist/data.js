import { Anchor, MaskedInput } from 'grommet';

export const alignmentData = {
  'Created by': 'jane.doe@email.com',
  'Created on': '2021-10-05T14:48:00.000Z',
  Policies: '13',
};

export const anatomyData = {
  'Single Line Description': 'This is an example of a single-line description',
  'Multi-line Description': `This is an example of a multi-line description like
   full-service AI insights, security and unified infrastructure management for
   campus, branch, remote, and data center networks`,
  'Created by': 'jane.doe@email.com',
  'List of Items': 'Item 1, Item 2, Item 3, Item 4, Item 5',
};

export const contentTruncationData = {
  state: 'Enabled',
  services: [
    { name: 'Azure EA', url: '' },
    { name: 'Azure IN - 003', url: '' },
    { name: 'HPE GreenLake (DEV)-00469', url: '' },
    { name: 'Azure EA-001', url: '' },
    { name: 'HPE Aruba (Dev)-03464', url: '' },
    { name: 'HPE GreenLake (Test)-004681', url: '' },
    { name: 'Azure EA-003', url: '' },
    { name: 'HPE Aruba (Stage)-03464', url: '' },
    { name: 'HPE GreenLake (DEV)-00468', url: '' },
    { name: 'Azure H-004', url: '' },
    { name: 'HPE Aruba (Dev)-03464', url: '' },
    { name: 'HPE GreenLake (Test)-004681', url: '' },
    { name: 'Azure EA-003', url: '' },
    { name: 'HPE Aruba (Stage)-03464', url: '' },
    { name: 'HPE GreenLake (DEV)-00468', url: '' },
    { name: 'Azure H-004', url: '' },
  ],
};

// representing data that has been formatted to include render functions
// for how the data should render in NameValueList and Form
export const formattedData = {
  companyName: { displayName: 'Company Name', value: 'AT&T', required: true },
  productName: {
    displayName: 'Product Name',
    value: 'Connect',
    required: true,
  },
  contactEmail: {
    displayName: 'Contact Email',
    value: 'jane.smith@email.com',
    render: value => <Anchor label={value} href={`mailto:${value}`} />,
  },
  phoneNumber: {
    displayName: 'Phone Number',
    value: '',
    formRender: (name, value, onChange) => (
      <MaskedInput
        mask={[
          { fixed: '(' },
          {
            length: 3,
            regexp: /^[0-9]{1,3}$/,
            placeholder: 'xxx',
          },
          { fixed: ')' },
          { fixed: ' ' },
          {
            length: 3,
            regexp: /^[0-9]{1,3}$/,
            placeholder: 'xxx',
          },
          { fixed: '-' },
          {
            length: 4,
            regexp: /^[0-9]{1,4}$/,
            placeholder: 'xxxx',
          },
        ]}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    ),
  },
  copyright: {
    displayName: 'Copyright',
    value: '',
    help: 'Replaces company name in the footer of the application.',
  },
  termsAndConditions: {
    displayName: 'Terms and Conditions',
    value: '',
    help: 'Provide link to your  terms and conditions.',
    placeholder: 'www.yourcompany.com/terms',
  },
  privacyPolicy: {
    displayName: 'Privacy Policy',
    value: '',
    help: 'Provide link to your  privacy policy.',
    placeholder: 'www.yourcompany.com/privacy',
  },
  security: {
    displayName: 'Security',
    value: '',
    help: 'Provide link to your security disclosure.',
    placeholder: 'www.yourcompany.com/security',
  },
  contactUs: {
    displayName: 'Contact Us',
    value: '',
    help: 'Provide link to your companies contact us page.',
    placeholder: 'www.yourcompany.com/contact',
  },
};

export const defaultData = {
  'Created on': '2021-10-05T14:48:00.000Z',
  Description: 'Full-service A.I. insights and data center networks',
  'IP Address': '172.98.091.0',
};

export const iconNameData = {
  Active: '90',
  'In Progress': '24',
};

export const iconValueData = {
  Temperature: 'Ok',
  Storage: 'Warning',
};

export const data = {
  Name: 'FirstName LastName',
  Username: 'firstname',
  Country: 'United States',
};

export const fontData = {
  'Serial Number': 'MXQ83700F3',
  'Product ID': 'JL258A',
  'IP Address': '172.98.091.0',
};

export const fontWeightData = {
  Policies: '23',
  Rules: '380',
  Compliance: '80%',
};

export const gridData = {
  Description: 'Whether to enable email link user authentication',
  'Ephemeral Storage': '54.7%  (3000 GB of 5489 GB)',
  'Kubernetes Verison': '19.7',
  'IP Address': '172.98.091.0',
  'Created on': '13/02/2021 at 14:23:32',
};

export const languageData = {
  Languages: `English, Spanish, French, Chinese, Japanese, German,
   Korean, Italian, Arabic, Portugese, Russian`,
  'Operating System': `VMware ESXi 6.7.0 Build-14320388 Update
   3 Patch 73 6.7.0 Build-14320388 Update 3 Patch 73 ESXi 6.7.0
   Build-14320388 Update 3 Patch 73 6.7.0 ESXi 6.7.0 Build-14320388
   Update 3 Patch 73 6.7.0 `,
};

export const kubernetesData = {
  Version: '1.6(HA)',
  Nodes: '3 Control Plane, 3 workers',
};

export const profileData = {
  'First Name': 'Jane',
  'Middle Name': '',
  Country: 'United States',
  'Phone Number': '',
  Email: 'jane.smith@hpe.com',
};

export const simpleData = {
  'Created on': '2021-10-05T14:48:00.000Z',
  'Created by': 'jane.doe@email.com',
  'Default Storage Class': 'Block Storage Cost',
  Description: `Full-service A.I. insights, security
   and unified infrastructure management for campus,
  branch, remote, and data center networks.`,
  'IP Address': '172.98.091.0',
};

export const serverData = {
  Health: 'Healthy',
  State: 'Active',
  ID: 'b3894722-adscb29308478-8032j',
  'API EndPoint': 'democluster1.dev.cloud.net',
  'Default Storage Class': 'Block Storage Cost',
  Description: 'This is a short description of the cluster.',
  Version: '1.18',
  Nodes: '3 Control Plane, 5 workers',
};

export const tagsData = {
  Usage: '300',
  MachineInfor1: 'Standard',
};
