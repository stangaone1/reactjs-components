import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import HorizontalList from 'views/containers/horizontal-list.container';

storiesOf('Horizontal list', module)
  .add('default', () => (
    <HorizontalList/>
  ))

