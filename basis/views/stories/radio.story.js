import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Radio from 'views/containers/radio.container';

storiesOf('Radio', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Radio/>
    </div>
  ))

