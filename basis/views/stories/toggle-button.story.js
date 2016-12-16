import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import ToggleButton from 'views/containers/toggle-button.container';

storiesOf('Toggle button', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ToggleButton/>
    </div>
  ))

