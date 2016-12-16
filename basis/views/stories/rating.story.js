import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Rating from 'views/containers/rating.container';

storiesOf('Rating', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Rating/>
    </div>
  ))

