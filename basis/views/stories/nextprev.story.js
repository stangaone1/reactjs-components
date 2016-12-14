import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import NextPrev from 'views/containers/next-prev.container';

storiesOf('Next Prev', module)
  .add('default', () => (
    <div>
      <Icons/>
      <NextPrev/>
    </div>
  ))

