import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Panel from 'views/containers/panel.container';

storiesOf('Panel', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Panel/>
    </div>
  ))

