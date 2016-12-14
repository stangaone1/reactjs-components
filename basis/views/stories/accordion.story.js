import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Accordion from 'views/containers/accordion.container';

storiesOf('Accordion', module)
  .add('default', () => (
    <Accordion/>
  ))

