import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Notification from 'views/containers/notification.container';

storiesOf('Notification', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Notification/>
    </div>
  ))

