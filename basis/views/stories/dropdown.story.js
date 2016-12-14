import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Dropdown from 'views/containers/dropdown.container';

storiesOf('Dropdown', module)
  .add('default', () => (
    <Dropdown/>
  ))

