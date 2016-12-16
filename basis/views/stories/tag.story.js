import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Tag from 'views/containers/tag.container';

storiesOf('Tag', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Tag/>
    </div>
  ))

