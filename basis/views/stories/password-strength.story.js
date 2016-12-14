import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import PasswordStrength from 'views/containers/password-strength.container';

storiesOf('Password strength', module)
  .add('default', () => (
    <div>
      <Icons/>
      <PasswordStrength/>
    </div>
  ))

