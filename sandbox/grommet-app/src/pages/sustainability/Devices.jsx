import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Data,
  DataTable,
  Pagination,
  Box,
  Text,
  Toolbar,
  DataSearch,
  DataSort,
  DataFilters,
  DataSummary,
  DataView,
  DataTableColumns,
  ResponsiveContext,
  DropButton,
  Menu,
} from 'grommet';
import { More } from 'grommet-icons';
import { useContext } from 'react';
import { useLoading } from '../../utils/skeleton';
import { Comfortable, Compact, Spacious } from '../../icons';

const columns = [
  {
    property: 'serialNumber',
    header: 'Serial number',
    primary: true,
  },
  {
    property: 'name',
    header: 'Name',
    render: datum => (datum.name ? datum.name : '--'),
  },
  {
    property: 'type',
    header: 'Type',
  },
  {
    property: 'make',
    header: 'Make',
  },
  {
    property: 'country',
    header: 'Country',
  },
  {
    property: 'state',
    header: 'State',
  },
  {
    property: 'city',
    header: 'City',
    render: datum => <Text truncate="tip">{datum.city}</Text>,
  },
  {
    property: 'model',
    header: 'Model',
    render: datum => <Text truncate="tip">{datum.model}</Text>,
    size: 'medium',
  },
  {
    property: 'totalEnergy',
    header: 'Total energy',
    units: 'kWh',
    align: 'end',
    render: datum => (
      <Text>{Intl.NumberFormat().format(datum.totalEnergy)}</Text>
    ),
  },
];

const options = columns.map(column => ({
  property: column.property,
  label: column.header,
}));

const data = [
  {
    serialNumber: 'fg4agao01r8x5oz7f',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_0',
    totalEnergy: 11677,
    cpuUtil: 51,
  },
  {
    serialNumber: 'ljyyfpc02tlgpnls3',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 36997,
    cpuUtil: 72,
  },
  {
    serialNumber: 'erwnuo001ruh3s74q',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 26790,
    cpuUtil: 44,
  },
  {
    serialNumber: 'dwjtzpc0p6rnexjs',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 46867,
    cpuUtil: 75,
  },
  {
    serialNumber: 'dwjtzpc0tj092j29',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 38820,
    cpuUtil: 63,
  },
  {
    serialNumber: 'fg4agao0omfitumg',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_5',
    totalEnergy: 47226,
    cpuUtil: 73,
  },
  {
    serialNumber: 'fg4agao02cf6arety',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_6_test',
    totalEnergy: 54496,
    cpuUtil: 36,
  },
  {
    serialNumber: 'fg4agao01qe4macw7',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 26410,
    cpuUtil: 65,
  },
  {
    serialNumber: 'ljyyfpc01u9d5etcr',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 7542,
    cpuUtil: 42,
  },
  {
    serialNumber: 'jqspeyo029fhmklcq',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'MyDevice_local',
    totalEnergy: 36386,
    cpuUtil: 56,
  },
  {
    serialNumber: 'jqspeyo015yq2h50b',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_10',
    totalEnergy: 45766,
    cpuUtil: 45,
  },
  {
    serialNumber: 'fg4agao02h8juiosf',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 6795,
    cpuUtil: 69,
  },
  {
    serialNumber: 'ljyyfpc033l0fal80',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_12_test',
    totalEnergy: 13733,
    cpuUtil: 58,
  },
  {
    serialNumber: 'ljyyfpc02vu079llx',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 4439,
    cpuUtil: 15,
  },
  {
    serialNumber: 'erwnuo0023apx8ykf',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 24101,
    cpuUtil: 45,
  },
  {
    serialNumber: 'fg4agao01pjdri61w',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_15',
    totalEnergy: 13578,
    cpuUtil: 49,
  },
  {
    serialNumber: 'fg4agao02ukw569p7',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 7578,
    cpuUtil: 71,
  },
  {
    serialNumber: 'ljyyfpc01i5bhy9y5',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 5177,
    cpuUtil: 40,
  },
  {
    serialNumber: 'ljyyfpc01mt2kkowg',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_18_test',
    totalEnergy: 37974,
    cpuUtil: 21,
  },
  {
    serialNumber: 'ljyyfpc032xr7fiym',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 6615,
    cpuUtil: 75,
  },
  {
    serialNumber: 'erwnuo002su2qh7sl',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_20',
    totalEnergy: 18664,
    cpuUtil: 39,
  },
  {
    serialNumber: 'fg4agao0y7vnahc7',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 21247,
    cpuUtil: 40,
  },
  {
    serialNumber: 'dwjtzpc01mio3vvlt',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 27810,
    cpuUtil: 48,
  },
  {
    serialNumber: 'jqspeyo023eg0dnfk',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 31963,
    cpuUtil: 63,
  },
  {
    serialNumber: 'jqspeyo021i8p7av3',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_24_test',
    totalEnergy: 49808,
    cpuUtil: 13,
  },
  {
    serialNumber: 'fg4agao02lap1wyfx',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_25',
    totalEnergy: 49454,
    cpuUtil: 14,
  },
  {
    serialNumber: 'fg4agao0rr0qp5mx',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 11754,
    cpuUtil: 15,
  },
  {
    serialNumber: 'jqspeyo025r11dy47',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 58613,
    cpuUtil: 33,
  },
  {
    serialNumber: 'fg4agao01156u2fa6',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 44880,
    cpuUtil: 41,
  },
  {
    serialNumber: 'jqspeyo02gixjl6nc',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 31669,
    cpuUtil: 41,
  },
  {
    serialNumber: 'dwjtzpc0kbp821tq',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_30',
    totalEnergy: 12334,
    cpuUtil: 28,
  },
  {
    serialNumber: 'jqspeyo018zcwokes',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 43085,
    cpuUtil: 67,
  },
  {
    serialNumber: 'ljyyfpc019xfmtlfr',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 33590,
    cpuUtil: 72,
  },
  {
    serialNumber: 'jqspeyo02t1pwq4vf',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 8855,
    cpuUtil: 41,
  },
  {
    serialNumber: 'dwjtzpc01gywd6vm3',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 43545,
    cpuUtil: 14,
  },
  {
    serialNumber: 'erwnuo0030wd5x8bk',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_35',
    totalEnergy: 26379,
    cpuUtil: 10,
  },
  {
    serialNumber: 'jqspeyo03cxzw9hqh',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'DEV_36_test',
    totalEnergy: 28025,
    cpuUtil: 66,
  },
  {
    serialNumber: 'erwnuo00380sakjtz',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 33686,
    cpuUtil: 14,
  },
  {
    serialNumber: 'erwnuo001pag2g80t',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 20059,
    cpuUtil: 56,
  },
  {
    serialNumber: 'ljyyfpc0183l9a89y',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 31362,
    cpuUtil: 62,
  },
  {
    serialNumber: 'dwjtzpc013txgh3yu',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_40',
    totalEnergy: 34988,
    cpuUtil: 66,
  },
  {
    serialNumber: 'jqspeyo02tzq272eq',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 25614,
    cpuUtil: 72,
  },
  {
    serialNumber: 'ljyyfpc0ls7nphbc',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_42_test',
    totalEnergy: 29673,
    cpuUtil: 48,
  },
  {
    serialNumber: 'ljyyfpc016sn9e733',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 10130,
    cpuUtil: 74,
  },
  {
    serialNumber: 'dwjtzpc0s4yypjjx',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 45059,
    cpuUtil: 21,
  },
  {
    serialNumber: 'erwnuo001b4hj6edg',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_45',
    totalEnergy: 4181,
    cpuUtil: 34,
  },
  {
    serialNumber: 'dwjtzpc0yha23okg',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 28874,
    cpuUtil: 73,
  },
  {
    serialNumber: 'ljyyfpc026d6z6jmp',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 28250,
    cpuUtil: 18,
  },
  {
    serialNumber: 'fg4agao02rr8catp5',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_48_test',
    totalEnergy: 11084,
    cpuUtil: 21,
  },
  {
    serialNumber: 'fg4agao01m2fvyepf',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 48545,
    cpuUtil: 51,
  },
  {
    serialNumber: 'fg4agao01bq8g5pjj',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_50',
    totalEnergy: 56454,
    cpuUtil: 19,
  },
  {
    serialNumber: 'ljyyfpc0hil3mp1g',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 10630,
    cpuUtil: 41,
  },
  {
    serialNumber: 'erwnuo001sakqrpnl',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 3521,
    cpuUtil: 36,
  },
  {
    serialNumber: 'jqspeyo0t29p4pmw',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 11854,
    cpuUtil: 45,
  },
  {
    serialNumber: 'fg4agao01oarlitf6',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_54_test',
    totalEnergy: 28209,
    cpuUtil: 57,
  },
  {
    serialNumber: 'dwjtzpc025oj5og46',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_55',
    totalEnergy: 7425,
    cpuUtil: 49,
  },
  {
    serialNumber: 'erwnuo0015zh8wsn2',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 48764,
    cpuUtil: 39,
  },
  {
    serialNumber: 'jqspeyo0ggy6ftaa',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 28373,
    cpuUtil: 44,
  },
  {
    serialNumber: 'fg4agao03bum8d73v',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 26472,
    cpuUtil: 56,
  },
  {
    serialNumber: 'dwjtzpc02iyugxsng',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 21278,
    cpuUtil: 60,
  },
  {
    serialNumber: 'jqspeyo0y4o1i77z',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_60',
    totalEnergy: 17517,
    cpuUtil: 21,
  },
  {
    serialNumber: 'fg4agao0hom4bsld',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 16544,
    cpuUtil: 50,
  },
  {
    serialNumber: 'jqspeyo02e2g8b57u',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 40984,
    cpuUtil: 39,
  },
  {
    serialNumber: 'erwnuo002rqunlm04',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 5573,
    cpuUtil: 54,
  },
  {
    serialNumber: 'fg4agao02oo43m2rs',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 50650,
    cpuUtil: 14,
  },
  {
    serialNumber: 'dwjtzpc0184dj81o9',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_65',
    totalEnergy: 21619,
    cpuUtil: 71,
  },
  {
    serialNumber: 'jqspeyo03e59w0n26',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_66_test',
    totalEnergy: 11198,
    cpuUtil: 28,
  },
  {
    serialNumber: 'dwjtzpc0160ov31si',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 37949,
    cpuUtil: 74,
  },
  {
    serialNumber: 'erwnuo002sarjhtwd',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 15759,
    cpuUtil: 62,
  },
  {
    serialNumber: 'jqspeyo034nct3btw',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 18697,
    cpuUtil: 46,
  },
  {
    serialNumber: 'ljyyfpc028sof6g7s',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_70',
    totalEnergy: 37998,
    cpuUtil: 20,
  },
  {
    serialNumber: 'erwnuo002rvtqkase',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 26827,
    cpuUtil: 66,
  },
  {
    serialNumber: 'erwnuo001ngq5jhe0',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_72_test',
    totalEnergy: 9329,
    cpuUtil: 32,
  },
  {
    serialNumber: 'dwjtzpc01sd1jajyn',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 53374,
    cpuUtil: 69,
  },
  {
    serialNumber: 'fg4agao01cvf0dy4q',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 18248,
    cpuUtil: 32,
  },
  {
    serialNumber: 'jqspeyo01ald75it1',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_75',
    totalEnergy: 32848,
    cpuUtil: 10,
  },
  {
    serialNumber: 'jqspeyo01kizuiud6',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 23681,
    cpuUtil: 31,
  },
  {
    serialNumber: 'ljyyfpc0ufdrh7lh',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 22410,
    cpuUtil: 13,
  },
  {
    serialNumber: 'ljyyfpc01pw6tsuzr',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_78_test',
    totalEnergy: 45665,
    cpuUtil: 23,
  },
  {
    serialNumber: 'fg4agao02o9gnvte6',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 50708,
    cpuUtil: 34,
  },
  {
    serialNumber: 'erwnuo001totx0ppy',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_80',
    totalEnergy: 20950,
    cpuUtil: 10,
  },
  {
    serialNumber: 'jqspeyo021dpm7pb9',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 52385,
    cpuUtil: 14,
  },
  {
    serialNumber: 'ljyyfpc01v73ey0s2',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 56279,
    cpuUtil: 44,
  },
  {
    serialNumber: 'dwjtzpc0v4elga55',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Alletra Storage MP',
    type: 'Storage',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 15573,
    cpuUtil: 19,
  },
  {
    serialNumber: 'jqspeyo02zmshl9vo',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_84_test',
    totalEnergy: 10385,
    cpuUtil: 74,
  },
  {
    serialNumber: 'erwnuo00vep4luyx',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_85',
    totalEnergy: 31707,
    cpuUtil: 36,
  },
  {
    serialNumber: 'ljyyfpc01dd9951lj',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 54640,
    cpuUtil: 27,
  },
  {
    serialNumber: 'ljyyfpc01v6j56193',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 14396,
    cpuUtil: 53,
  },
  {
    serialNumber: 'fg4agao02p7ygk01r',
    city: 'San Jose',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 26479,
    cpuUtil: 12,
  },
  {
    serialNumber: 'erwnuo001ph5mczzq',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 44088,
    cpuUtil: 24,
  },
  {
    serialNumber: 'ljyyfpc0yptxqdup',
    city: 'Mountain View',
    state: 'California',
    region: 'US West',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'PROD_90',
    totalEnergy: 10178,
    cpuUtil: 47,
  },
  {
    serialNumber: 'jqspeyo01v7t08u86',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'HPE Synergy 12000 w/ 3x Synergy 480 Gen 10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 44084,
    cpuUtil: 73,
  },
  {
    serialNumber: 'dwjtzpc02j948b3k7',
    city: 'Houston',
    state: 'California',
    region: 'US Central',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 13110,
    cpuUtil: 21,
  },
  {
    serialNumber: 'fg4agao0nasbwzph',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 52876,
    cpuUtil: 21,
  },
  {
    serialNumber: 'erwnuo001avl6i8mq',
    city: 'Palo Alto',
    state: 'California',
    region: 'US West',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 24920,
    cpuUtil: 48,
  },
  {
    serialNumber: 'ljyyfpc01qozicw35',
    city: 'Fort Collins',
    state: 'California',
    region: 'US Mountain',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    name: 'PROD_95',
    totalEnergy: 34523,
    cpuUtil: 30,
  },
  {
    serialNumber: 'jqspeyo031tez0vfi',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    name: 'DEV_96_test',
    totalEnergy: 14379,
    cpuUtil: 14,
  },
  {
    serialNumber: 'fg4agao02r2t60f2m',
    city: 'Los Angeles',
    state: 'California',
    region: 'US West',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 50808,
    cpuUtil: 63,
  },
  {
    serialNumber: 'fg4agao02m711ifle',
    city: 'New York',
    state: 'California',
    region: 'US East',
    model: 'UCS C220 M6 Rack Server',
    type: 'Compute',
    make: 'Dell',
    country: 'USA',
    totalEnergy: 15257,
    cpuUtil: 58,
  },
  {
    serialNumber: 'fg4agao01h70sl67k',
    city: 'Austin',
    state: 'California',
    region: 'US Central',
    model: 'HPE ProLiant D 380 Gen10',
    type: 'Compute',
    make: 'HPE',
    country: 'USA',
    totalEnergy: 40586,
    cpuUtil: 16,
  },
];

const DensityControl = () => {
  const [density, setDensity] = useState('comfortable');
  return (
    <Menu
      icon={<Compact />}
      tip="Change density"
      kind="toolbar"
      items={[
        {
          label: 'Compact',
          icon: <Compact />,
          justify: 'start',
          active: density === 'compact',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('comfortable');
            document
              .querySelector('#devices-table')
              .classList.remove('spacious');
            document.querySelector('#devices-table').classList.add('compact');
            setDensity('compact');
          },
        },
        {
          label: 'Comfortable',
          icon: <Comfortable />,
          justify: 'start',
          active: density === 'comfortable',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('compact');
            document
              .querySelector('#devices-table')
              .classList.remove('spacious');
            document
              .querySelector('#devices-table')
              .classList.add('comfortable');
            setDensity('comfortable');
          },
        },
        {
          label: 'Spacious',
          icon: <Spacious />,
          justify: 'start',
          active: density === 'spacious',
          onClick: () => {
            document
              .querySelector('#devices-table')
              .classList.remove('compact');
            document
              .querySelector('#devices-table')
              .classList.remove('comfortable');
            document.querySelector('#devices-table').classList.add('spacious');
            setDensity('spacious');
          },
        },
      ]}
      dropProps={{ animate: 'select' }}
    />
  );
};

DensityControl.propTypes = {
  density: PropTypes.string,
  setDensity: PropTypes.func,
};
export const Devices = () => {
  const size = useContext(ResponsiveContext);
  const skeleton = useLoading(1000);
  return (
    <Data
      data={data}
      views={
        !skeleton
          ? [
              {
                name: 'My devices',
                properties: {
                  type: ['Compute'],
                  make: ['HPE'],
                },
              },
            ]
          : undefined
      }
      properties={{
        serialNumber: { filter: false },
        name: { filter: false },
        type: { label: 'Type' },
        make: { label: 'Make' },
        country: { label: 'Country' },
        state: { label: 'State' },
        city: { label: 'City' },
        model: { label: 'Model' },
        totalEnergy: { label: 'Total energy' },
      }}
      animation={!skeleton ? 'fadeIn' : undefined}
    >
      <Toolbar gap="medium" skeleton={skeleton}>
        <Toolbar>
          <DataSearch placeholder="Search" />
          <DataSort drop />
          <DataFilters layer />
        </Toolbar>
        {!['xsmall', 'small', 'medium'].includes(size) ? (
          <>
            <DataView />
            <Toolbar>
              <DataTableColumns drop options={options} />
              <DensityControl />
            </Toolbar>
          </>
        ) : undefined}
        {['xsmall', 'small', 'medium'].includes(size) ? (
          <DropButton
            kind="toolbar"
            icon={<More />}
            dropAlign={{ top: 'bottom', left: 'left' }}
            dropContent={
              <Box align="start" gap="small" pad="small">
                <DataView />
                <Toolbar>
                  <DataTableColumns drop options={options} />
                  <DensityControl />
                </Toolbar>
              </Box>
            }
          />
        ) : undefined}
      </Toolbar>
      <Box skeleton={skeleton}>
        <DataSummary margin={{ bottom: 'none', top: 'xsmall' }} />
      </Box>

      <Box overflow={{ horizontal: 'auto' }} skeleton={skeleton}>
        <DataTable
          columns={columns}
          sortable
          verticalAlign={{ body: 'top' }}
          id="devices-table"
        />
      </Box>
      <Pagination
        summary
        stepOptions={!skeleton ? true : false}
        border="top"
        pad={{ vertical: 'xsmall' }}
        skeleton={skeleton}
      />
    </Data>
  );
};