import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Calendar from 'views/containers/calendar.container';
import Icons from 'views/components/icons/icons';

storiesOf('Calendar', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Calendar/>
    </div>
  ))

