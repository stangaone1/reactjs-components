import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Sortable from 'views/containers/sortable.container';

storiesOf('Sortable', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Sortable/>
    </div>
  ))

