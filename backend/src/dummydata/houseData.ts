import { House } from '../types';

const houses: House[] = [
  {
    id: '1',
    name: 'Test House',
    address: 'Simple address 1',
    maxResidents: 17,
    timestamp:
      'Fri Sep 17 2021 18:34:49 GMT+0300 (Eastern European Summer Time)',
    userWhoAdded: '1',
    users: [
      {
        id: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Another Test House',
    address: 'Simple address 2',
    maxResidents: 7,
    timestamp:
      'Fri Sep 17 2021 18:34:49 GMT+0300 (Eastern European Summer Time)',
    userWhoAdded: '1',
    users: [
      {
        id: '1',
      },
    ],
  },
];

export default houses;
