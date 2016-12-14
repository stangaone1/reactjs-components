import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Checkbox from 'views/containers/checkbox.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Checkbox/>
    </div>
  ))

