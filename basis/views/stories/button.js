import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import {Button} from 'views/components/buttons';

addStory(componentName);
export function addStory() {
  return storiesOf('Button', module)
    .add('default', () => (
      <div>
        <Button className="u-marginRight2" onClick={action('clicked')}>
          Default Button
        </Button>
        <Button disabled onClick={action('clicked')}>
          Disabled Default Button
        </Button>
        <Button selected onClick={action('clicked')}>
          Selected default Button
        </Button>
        <div>
          <br/>
          <br/>
          <br/>
          <Button centered onClick={action('clicked')}>
            Centered default Button
          </Button>
        </div>
        <br/>
        <br/>
        <Button block onClick={action('clicked')}>
          Block default Button
        </Button>
      </div>
    ))
    .add('primary', () => (
      <div>
        <Button type="primary" className="u-marginRight2" onClick={action('clicked')}>
          Primary Button
        </Button>
        <Button type="primary" disabled onClick={action('clicked')}>
          Disabled Primary Button
        </Button>
        <div>
          <br/>
          <br/>
          <br/>
          <Button type="primary" centered onClick={action('clicked')}>
            Centered main Button
          </Button>
        </div>
      </div>
    ))
    .add('main', () => (
      <div>
        <Button type="main" className="u-marginRight2" onClick={action('clicked')}>
          Main Button
        </Button>
        <Button type="main" disabled onClick={action('clicked')}>
          Disabled main Button
        </Button>
        <Button type="main" selected onClick={action('clicked')}>
          Selected main Button
        </Button>
        <div>
          <br/>
          <br/>
          <br/>
          <Button type="main" centered onClick={action('clicked')}>
            Centered main Button
          </Button>
        </div>
        <br/>
        <br/>
        <Button type="main" block onClick={action('clicked')}>
          Block main Button
        </Button>
      </div>
    ))
    .add('submit', () => (
      <div>
        <Button type="submit" className="u-marginRight2" onClick={action('clicked')}>
          Submit Button
        </Button>
        <Button type="submit" disabled onClick={action('clicked')}>
          Disabled submit Button
        </Button>
      </div>
    ))
    .add('dropdown', () => (
      <div>
        <Button type="dropdown" className="u-marginRight2" onClick={action('clicked')}>
          Dropdown Button
        </Button>
        <Button type="dropdown" disabled onClick={action('clicked')}>
          Disabled dropdown Button
        </Button>
        <Button type="dropdown" opened onClick={action('clicked')}>
          Opened dropdown Button
        </Button>
      </div>
    ))
    .add('transparent', () => (
      <div>
        <Button type="transparent" className="u-marginRight2" onClick={action('clicked')}>
          Transparent Button
        </Button>
        <br/>
        <Button type="transparent" disabled onClick={action('clicked')}>
          Disabled transparent Button
        </Button>
      </div>
    ));
}

