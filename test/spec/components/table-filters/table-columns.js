export default [
  {
    selectable: true,
    fixed: true,
    alwaysVisible: true,
  }, {
    name: 'Main menu',
    row: 'mainMenu',
    alwaysVisible: true,
    sortable: true,
  }, {
    name: 'Submenu title',
    row: 'subMenu',
    alwaysVisible: true,
    sortable: true,
  }, {
    name: 'Edited by',
    row: 'logs',
  }, {
    name: 'Created',
    row: 'created',
    sortable: true,
  }, {
    name: 'Last modified',
    row: 'edited',
    width: 100,
    sortable: true,
  }, {
    name: 'Start date',
    row: 'startDate',
    hidden: true,
    sortable: true,
  }, {
    name: 'End date',
    row: 'endDate',
    hidden: true,
    sortable: true,
  }, {
    name: 'Target websites',
    hidden: false,
    row: 'restaurants',
  }, {
    name: 'Actions',
    row: 'actions',
    fixed: true,
    alwaysVisible: true,
  },
];
