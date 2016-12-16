import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Tabs from 'views/containers/tabs.container';

storiesOf('Tabs', module)
  .add('default', () => (
    <div>
      <Tabs/>
    </div>
  ))

