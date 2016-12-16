import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import TimePassed from 'views/containers/time-passed.container';

storiesOf('Time passed', module)
  .add('default', () => (
    <div>
      <Icons/>
      <TimePassed/>
    </div>
  ))

