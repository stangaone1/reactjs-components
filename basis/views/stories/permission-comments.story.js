import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import PermissionComments from 'views/containers/permission-comments.container';

storiesOf('Permission comments', module)
  .add('default', () => (
    <div>
      <Icons/>
      <PermissionComments/>
    </div>
  ))

