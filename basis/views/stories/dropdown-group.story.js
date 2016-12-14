import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DropdownGroup from 'views/containers/dropdown-group.container';

storiesOf('Dropdown group', module)
  .add('default', () => (
    <DropdownGroup viewSortFilter={{view:{label:'View'}, sort:{label:'Sort'}, filter:{label:'Filter'}}}/>
  ))

