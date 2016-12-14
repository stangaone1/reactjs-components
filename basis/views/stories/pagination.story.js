import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Pagination from 'views/containers/pagination.container';

storiesOf('Pagination', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Pagination/>
    </div>
  ))

