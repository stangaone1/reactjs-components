import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ChoosePhoto from 'views/containers/choose-photo.container';
import Icons from 'views/components/icons/icons';

storiesOf('Choose photo', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ChoosePhoto/>
    </div>
  ))

