import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import SlidesFilters from 'views/containers/slides-filters.container';

storiesOf('Slides filters', module)
  .add('default', () => (
    <div>
      <Icons/>
      <SlidesFilters/>
    </div>
  ))

