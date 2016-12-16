import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import DraggingWidgets from 'views/containers/draggins-widgets';

storiesOf('Dragging Widgets', module)
  .add('default', () => (
    <div>
      <Icons/>
      <DraggingWidgets/>
    </div>
  ))

