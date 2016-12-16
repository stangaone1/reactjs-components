import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import TextEditor from 'views/containers/text-editor.container';

storiesOf('Text editor', module)
  .add('default', () => (
    <div>
      <Icons/>
      <TextEditor/>
    </div>
  ))

