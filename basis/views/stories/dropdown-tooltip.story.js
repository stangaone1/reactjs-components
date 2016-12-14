import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DropdownTooltip from 'views/containers/dropdown-tooltip.container';

storiesOf('Dropdown tooltip', module)
  .add('default', () => (
    <DropdownTooltip/>
  ))

