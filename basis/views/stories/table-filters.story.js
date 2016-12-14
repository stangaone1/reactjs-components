import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import TableFilters from 'views/containers/table-filters.container';

storiesOf('Table filters', module)
  .add('default', () => (
    <div>
      <Icons/>
      <TableFilters/>
    </div>
  ))

