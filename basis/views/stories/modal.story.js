import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import Modal from 'views/containers/modal.container';

storiesOf('Modal', module)
  .add('default', () => (
    <div>
      <Icons/>
      <Modal/>
    </div>
  ))

