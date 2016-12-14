import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InputMultipleAuthors from 'views/containers/input-multiple-authors.container';

storiesOf('Input multiple authors', module)
  .add('default', () => (
    <InputMultipleAuthors/>
  ))

