import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ButtonMultiple from 'views/containers/button-multiple.container';
import Icons from 'views/components/icons/icons';

storiesOf('Button multiple', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ButtonMultiple/>
    </div>
  ))

