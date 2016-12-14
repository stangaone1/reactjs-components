import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CardChecked from 'views/containers/checked-card.container';
import Icons from 'views/components/icons/icons';

storiesOf('Card checked', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CardChecked/>
    </div>
  ))

