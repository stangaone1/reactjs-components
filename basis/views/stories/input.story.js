import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import InputField from 'views/containers/inputfield.container';

storiesOf('Input', module)
  .add('default', () => (
    <div>
      <Icons/>
      <InputField/>
    </div>
  ))

