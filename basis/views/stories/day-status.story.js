import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DayStatus from 'views/containers/day-open-status.container';
import Icons from 'views/components/icons/icons';

storiesOf('Day Status', module)
  .add('default', () => (
    <div>
      <Icons/>
      <DayStatus/>
    </div>
  ))

