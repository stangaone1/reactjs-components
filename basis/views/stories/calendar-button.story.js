import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CalendarButton from 'views/containers/calendar-button.container';
import Icons from 'views/components/icons/icons';

storiesOf('Calendar button', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CalendarButton/>
    </div>
  ))

