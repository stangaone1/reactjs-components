import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckboxGroup from 'views/containers/checkbox-group.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox Group', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CheckboxGroup/>
    </div>
  ))

