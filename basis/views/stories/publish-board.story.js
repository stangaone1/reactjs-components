import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import PublishBoard from 'views/containers/publish-board.container';

storiesOf('Publish board', module)
  .add('default', () => (
    <div>
      <Icons/>
      <PublishBoard/>
    </div>
  ))

