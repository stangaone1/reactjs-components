import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import UploadBox from 'views/containers/upload-box.container';

storiesOf('Upload box', module)
  .add('default', () => (
    <div>
      <Icons/>
      <UploadBox/>
    </div>
  ))

