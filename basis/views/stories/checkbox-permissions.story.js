import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckboxPermission from 'views/containers/checkbox-permission.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox permission', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CheckboxPermission/>
    </div>
  ))

