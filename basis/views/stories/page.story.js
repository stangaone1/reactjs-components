import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Page from 'views/containers/page.container';

storiesOf('Page', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Page/>
    </div>
  ))

