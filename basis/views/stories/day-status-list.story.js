import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DayStatusList from 'views/containers/day-open-status-list.container';
import Icons from 'views/components/icons/icons';

storiesOf('Days open status list', module)
  .add('default', () => (
    <div>
      <Icons/>
      <DayStatusList/>
    </div>
  ))

