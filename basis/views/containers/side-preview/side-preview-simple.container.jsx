import React, {Component} from 'react';
import SidePreview, {SidePreviewSection, SidePreviewActivity, SidePreviewRestaurant} from 'views/components/side-preview';
import restaurant from './restaurant';

export default class SidePreviewSimpleContainer extends Component {
  render() {
    return (
      <SidePreview
        otherActions={[{
          label: 'Clone',
          action: ()=>(console.log('item cloned')),
        }, {
          label: 'Delete',
          action: ()=>(console.log('item deleted')),
        },
        ]}
      >
        <SidePreviewRestaurant
          title={restaurant.name}
          subtitle={restaurant.address}
        >
             <span className="SidePreview-NRN">
              NRN: {restaurant.nrn}
            </span>
        </SidePreviewRestaurant>

        <SidePreviewActivity
          activated={restaurant.activated}
          lastModified={restaurant.lastModified}
          editedBy={restaurant.editedBy}/>

        <SidePreviewSection>

          <div className="SidePreview-SetupPercentage">Setup: 97%</div>

          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>
          <div className="SidePreview-SetupMissingWarning">
            Please fill up the following:
          </div>

        </SidePreviewSection>
      </SidePreview>
    );
  }
}
