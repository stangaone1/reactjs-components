import { storiesOf, action } from '@kadira/storybook';
import React from 'react';


export function addStory(componentName) {
  if (componentName) {
    const componentDemo = require('../containers/')[componentName];
    storiesOf(componentName)
      .addDecorator((story) => (
        <div style={{textAlign: 'center'}}>
          {story()}
        </div>
      ))
      .add('without props', () => (<componentDemo />))

  }

}