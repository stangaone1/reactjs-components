import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ButtonGrup from 'views/containers/button-group.container';
import Icons from 'views/components/icons/icons';

storiesOf('Button Group', module)
  .add('default', () => (
    <div>
      <Icons/>
      <ButtonGrup/>
    </div>
  ))

