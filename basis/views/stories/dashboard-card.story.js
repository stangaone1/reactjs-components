import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DashboardCard from 'views/containers/dashboardcard.container';
import Icons from 'views/components/icons/icons';

storiesOf('Dashboard card', module)
  .add('default', () => (
    <div>
      <Icons/>
      <DashboardCard/>
    </div>
  ))

