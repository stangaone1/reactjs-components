import React, {Component} from 'react';
import PanelSectionOverview from 'views/components/panel-section-overview';

export default class PanelSectionOverviewContainer extends Component {
  onSectionEdit(page, id) {
    console.log('editing page', id, page);
  }

  getSectionOverview() {
    return [{
      id: 1,
      name: 'Info',
      pages: [
        {
          id: 1,
          completed: true,
          name: 'Privacy Policy',
        }, {
          id: 2,
          completed: true,
          name: 'Color Theme',
        }, {
          id: 2,
          completed: true,
          name: 'Header',
        },
      ],
    }, {
      id: 2,
      name: 'Another one',
      pages: [
        {
          id: 1,
          completed: true,
          name: 'Privacy Policy',
        }, {
          id: 2,
          completed: true,
          name: 'Color Theme',
        }, {
          id: 2,
          completed: false,
          name: 'Header',
        },
      ],
    }];
  }

  render() {
    const sectionList = this.getSectionOverview();
    return (
      <div>
        {
          sectionList.map((section) => {
            return (
            <PanelSectionOverview
              key={section.id}
              section={section}
              onEdit={this.onSectionEdit.bind(this)}/>

            );
          })
        }
      </div>
    );
  }
}
