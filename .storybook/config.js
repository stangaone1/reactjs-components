import moment from 'moment';
import React from 'react';
import { configure, addDecorator, setAddon, storiesOf } from '@kadira/storybook';
import {story} from '../basis/views/containers/accordion.container.jsx';
import {story as storyBannerCard} from '../basis/views/containers/banner-card.container.jsx';

import getComponentFromDecorator from './component-from-decorator';


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const Containers = requireAll(require.context('../basis/views/containers', true, /^\.\/([\w\-\.]*\.container\.jsx|[\w\-]*\/index\.js)$/))
  .reduce((sum, comp) => {
    console.log('comp', comp, comp.name, comp.displayName)
    if (!comp.name && !comp.displayName) {
      return sum;
    }
    const reactComp = getComponentFromDecorator(comp);
    let compName = reactComp.name || reactComp.displayName;
    if (compName.charAt(0) === '_') {
      return sum;
    }

    while(sum[compName]) {
      compName = compName + ' duplicate';
    }

    sum[compName] = comp;
    return sum;
  }, {});

console.log('ContaineXXrs', Containers);

addDecorator((story) => {
  moment.locale('en');
  return (story());
});

const ContainerDemoComponents = Object.keys(Containers)
  .sort()
  .map(item => item);

function loadStories() {
  const stories = ContainerDemoComponents.map(ContainerDemoComponent=> {
    const componentDemo = require('../basis/views/containers/')[ContainerDemoComponent];
    storiesOf(ContainerDemoComponent)
      .add('default', () => (<componentDemo />))
  });
  console.log('storyBannerCard', storyBannerCard);
  const x = storiesOf('Banner')
    .add('default', () => (<div>{require('../basis/views/containers/banner-card.container')}</div>));
  x;
  //story;
  //storyBannerCard;
}

//setAddon(infoAddon);

configure(loadStories, module);