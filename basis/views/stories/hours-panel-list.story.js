import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import HoursPanelList from 'views/containers/hours-panel-list.container';

storiesOf('Hours panel list', module)
  .add('default', () => (
    <HoursPanelList/>
  ))

