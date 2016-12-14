import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import ProgressBar from 'views/containers/progress-bar.container';

storiesOf('Progress bar', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ProgressBar/>
    </div>
  ))

