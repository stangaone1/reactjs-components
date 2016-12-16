import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import VideoSelector from 'views/containers/video-selector.container';

storiesOf('Video selector', module)
  .add('default', () => (
    <div>
      <Icons/>
      <VideoSelector/>
    </div>
  ))

