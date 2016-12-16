import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import TimeSelect from 'views/containers/time-select.container';

storiesOf('Time select', module)
  .add('default', () => (
    <div>
      <Icons/>
      <TimeSelect/>
    </div>
  ))

