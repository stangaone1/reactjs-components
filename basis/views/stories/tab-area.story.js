import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import TabArea from 'views/containers/tab-area.container';

storiesOf('Tab area', module)
  .add('default', () => (
    <div>
      <Icons/>
      <TabArea/>
    </div>
  ))

