import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckboxList from 'views/containers/checkbox-list.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox list', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CheckboxList/>
    </div>
  ))

