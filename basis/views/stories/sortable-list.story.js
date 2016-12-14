import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import SortableList from 'views/containers/sortable-list.container';

storiesOf('Sortable list', module)
  .add('default', () => (
    <div>
      <Icons/>
      <SortableList/>
    </div>
  ))

