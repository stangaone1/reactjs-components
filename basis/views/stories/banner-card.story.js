import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BannerCard from 'views/containers/banner-card.container';
import Icons from 'views/components/icons/icons';

storiesOf('Banner card', module)
  .add('default', () => (
    <div>
      <Icons/>
      <BannerCard/>
    </div>
  ))

