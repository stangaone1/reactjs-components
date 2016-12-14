import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Table from 'views/containers/table/table.container';

storiesOf('Table', module)
  .add('default', () => (
    <div>
      <Table/>
    </div>
  ))

