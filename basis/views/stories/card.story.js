import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Card from 'views/containers/card.container';
import Icons from 'views/components/icons/icons';

storiesOf('Card', module)
  .add('default', () => (
    <div>
      <Icons/>
      <div style={{width: 400}}>
        <Card/>
      </div>
    </div>
  ))

