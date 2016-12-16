import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import UserName from 'views/containers/user-name.container';

storiesOf('User name', module)
  .add('default', () => (
    <div>
      <Icons/>
      <UserName/>
    </div>
  ))

