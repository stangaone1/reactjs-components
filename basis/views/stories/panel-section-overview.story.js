import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Icons from 'views/components/icons/icons';

import PanelSectionOverview from 'views/containers/panel-section-overview.container';

storiesOf('Panel section overview', module)
  .add('default', () => (
    <div>
      <Icons/>
      <PanelSectionOverview/>
    </div>
  ))

