import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DropdownList from 'views/containers/dropdown-list.container';

storiesOf('Dropdown list', module)
  .add('default', () => (
    <DropdownList data={{items:[{id:1, name:'item1'}, {id:2, name:'item2'}, {id:3, name:'item3'}]}}/>
  ))

