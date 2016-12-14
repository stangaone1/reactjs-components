import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import NotificationBubble from 'views/containers/notification-bubble.container';

storiesOf('Notification Bubble', module)
  .add('default', () => (
    <div>
      <Icons/>
      <NotificationBubble/>
    </div>
  ))

