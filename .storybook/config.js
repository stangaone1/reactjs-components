import moment from 'moment';
import React from 'react';
import { configure, addDecorator, setAddon, storiesOf } from '@kadira/storybook';

import '../basis/assets/styles/main.scss';

const requireContext = require.context('../basis/views/stories', true, /^\.\/([\w\-\.]*\.story\.js)$/);

function requireAll() {
  console.log('requireContext', requireContext.keys())
  return requireContext.keys().map((fileName)=> requireContext(fileName));
}

configure(requireAll, module);