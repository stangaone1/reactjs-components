import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import ProfilePhoto from 'views/containers/profile-photo.container';

storiesOf('Profile photo', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ProfilePhoto/>
    </div>
  ))

