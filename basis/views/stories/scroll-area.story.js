import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import ScrollArea from 'views/containers/scroll-area.container';

storiesOf('Scroll area', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ScrollArea/>
    </div>
  ))

