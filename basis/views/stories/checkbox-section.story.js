import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckboxSection from 'views/containers/checkbox-section.container';
import Icons from 'views/components/icons/icons';

storiesOf('Checkbox section', module)
  .add('default', () => (
    <div>
      <Icons/>
      <CheckboxSection/>
    </div>
  ))

