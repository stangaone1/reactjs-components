import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CountTracker from 'views/containers/count-tracker.container';
import Icons from 'views/components/icons/icons';

storiesOf('Count tracker', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CountTracker/>
    </div>
  ))

