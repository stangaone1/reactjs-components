import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import HoursPanel from 'views/containers/hours-panel.container';

storiesOf('Hours panel', module)
  .add('default', () => (
    <HoursPanel/>
  ))

