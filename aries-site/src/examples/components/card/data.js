import { CloudUpload, Notes, ShareRounded, UserAdd } from 'grommet-icons';

export const applications = [
  {
    title: 'Networking',
    description: `Manage switching, Wireless LAN, SD-WAN infrastructure 
    for campus and branch networks with AI, automation, and security.`,
    actions: {
      button: {
        label: 'Launch',
        href: '#',
      },
      anchor: {
        label: 'View Networking Products',
        href: '#',
      },
    },
  },
  {
    title: 'Storage',
    description: `Data services to simplify data management and protection 
    across hybrid cloud.`,
    actions: {
      button: {
        label: 'Get started',
        href: '#',
      },
      anchor: {
        label: 'View Data & Storage Products',
        href: '#',
      },
    },
  },
  {
    title: 'Compute Ops Management',
    description: `Securely manage compute and workload solutions across 
    your entire estate.`,
    actions: {
      button: {
        label: 'Launch',
        href: '#',
      },
      anchor: {
        label: 'View Compute Products',
        href: '#',
      },
    },
  },
  {
    title: 'Workloads',
    description: `Manage your hybrid and multi-cloud workload services 
    to view usage, cost, and more.`,
    actions: {
      button: {
        label: 'Launch',
        href: '#',
      },
      anchor: {
        label: 'View Cloud Workload Products',
        href: '#',
      },
    },
  },
];

export const activities = [
  {
    icon: <Notes color="blue" />,
    title: 'Helpful Guides',
    description: `Access step by step guides on getting the most out of 
    your Greenlake console.`,
    action: {
      label: 'View Guides',
      href: '#',
    },
  },
  {
    icon: <UserAdd color="red" />,
    title: 'Invite Users',
    description: `Send a sign-up link to users so you can collaborate 
    with your team.`,
    action: {
      label: 'Send Invite',
      href: '#',
    },
  },
  {
    icon: <CloudUpload color="purple" />,
    title: 'Manage Devices',
    description: `Add, apply licenses, and assign devices in your
    device inventory.`,
    action: {
      label: 'Manage Devices',
      href: '#',
    },
  },
];

export const tools = [
  {
    title: 'Aruba Support Portal',
    description: `Save time on your Aruba Support needs: 
    RMA, license management, downloads and more.`,
    action: {
      label: 'Launch',
      icon: <ShareRounded />,
      href: '#',
    },
  },
  {
    title: 'HPE Infosight',
    description: `AI-driven intelligence across servers, 
    storage, virtual machines and more.`,
    action: {
      label: 'Launch',
      icon: <ShareRounded />,
      href: '#',
    },
  },
];
