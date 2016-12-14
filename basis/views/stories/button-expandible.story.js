import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ButtonExpandible from 'views/containers/button-expandible.container';
import Icons from 'views/components/icons/icons';

storiesOf('Button expandible', module)
  .add('default', () => (
    <div>
      <Icons/>
      <div style={{width:100}}>
        <ButtonExpandible/>
      </div>
    </div>
  ))

