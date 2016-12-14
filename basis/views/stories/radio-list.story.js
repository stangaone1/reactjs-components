import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import RadioList from 'views/containers/radio-list.container';

storiesOf('Radio List', module)
  .add('default', () => (
    <div>
      <Icons/>
      <RadioList/>
    </div>
  ))

