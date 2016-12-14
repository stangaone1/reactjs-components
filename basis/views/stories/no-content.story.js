import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import NoContent from 'views/containers/no-content.container';

storiesOf('No Content', module)
  .add('default', () => (
    <div>
      <Icons/>
      <NoContent/>
    </div>
  ))

