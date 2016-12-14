import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Preloader from 'views/containers/preloader.container';

storiesOf('Preloader', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Preloader/>
    </div>
  ))

