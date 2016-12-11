import React, {Component, PropTypes} from 'react';
import {SidePreviewSection} from 'views/components/side-preview';
import './side-preview-section-restaurant-setup.scss';

export default class SidePreviewSectionRestaurantSetup extends Component {
  static propTypes = {
    sectionList: PropTypes.object,
  };

  render() {
    const sectionList = this.props.sectionList;
    const completePercentage = this.props.sectionList.completed;

    if (completePercentage >= 100) {
      return (
        <SidePreviewSection className="SidePreviewSectionRestaurantSetup">
          <div className="SidePreviewSectionRestaurantSetup-SetupPercentage">Setup: 100%</div>
        </SidePreviewSection>
      );
    }

    return (
      <SidePreviewSection className="SidePreviewSectionRestaurantSetup">
        <div className="SidePreviewSectionRestaurantSetup-SetupPercentage">Setup: {completePercentage}%</div>
        <div className="SidePreviewSectionRestaurantSetup-SetupMissingWarning">
          Please fill up the following:
        </div>

        <ul className="SidePreviewSectionRestaurantSetup-SetupMissingList">
          {
            // initially the object will be sectionList{groupId:{sections: []}}
            // this must be flattend into a simple array
            Array.prototype.concat.apply([],
              // foreach section group
              Object.keys(sectionList)
                .map((sectionSlug) => {
                // for each section
                  return sectionList[sectionSlug].overview
                    .filter((section) => !section.completed)
                    .map((section, index) => (
                      <li key={sectionSlug + '-' + index}> {sectionList[sectionSlug].name} / {section.name}</li>
                    ));
                })
              )
            }
        </ul>

      </SidePreviewSection>
    );
  }
}
