import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Select from 'views/containers/select.container';

storiesOf('Select', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Select/>
    </div>
  ))

