import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckboxExpandable from 'views/containers/checkbox-expandable.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox Expandable', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CheckboxExpandable/>
    </div>
  ))

