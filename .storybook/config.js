import moment from 'moment';
import { configure, addDecorator, setAddon } from '@kadira/storybook';
//import infoAddon from '@kadira/react-storybook-addon-info';

addDecorator((story) => {
  moment.locale('en');
  return (story());
});

function loadStories() {
  require('../basis/views/stories/button');
}

//setAddon(infoAddon);

configure(loadStories, module);