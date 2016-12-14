import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Switch from 'views/containers/switch-button.container';

storiesOf('Switch', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Switch/>
    </div>
  ))

