import React, {Component} from 'react';
import HorizontalList from 'views/components/horizontal-list';
import Panel from 'views/components/panel';

export default class HorizontalListContainer extends Component {

  renderPanelContent(index) {
    if (index % 2) {
      return (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus quam eget quam interdum, ut egestas
          lorem ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo elit eros, sed
          facilisis eros aliquam id. Cras massa magna, laoreet eu massa a, tempor semper tellus. Sed eget turpis non
          sapien vulputate cursus. Nullam lacinia eros tortor, vel ullamcorper turpis molestie sit amet. Aenean feugiat,
          lectus vitae varius hendrerit, mauris dolor aliquam purus, sed auctor neque eros venenatis orci. Phasellus sed
          est in lectus imperdiet tincidunt.
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Horizontal list with self scroll</h2>
        <HorizontalList scrollable style={{maxWidth: '500px'}}>
          {[1, 2, 3, 4, 5, 6].map((index)=>{
            return (
            <Panel element="li" label={'header ' + index} key={index}>
              the {index} panel
              {this.renderPanelContent(index)}
            </Panel>
              );
          })}
        </HorizontalList>
        <h2>Horizontal list without self scroll</h2>
        <HorizontalList>
          {[1, 2, 3, 4, 5, 6].map((index)=>{
            return (
            <Panel element="li" label={'header ' + index} key={index}>
              the {index} panel
              {this.renderPanelContent(index)}
            </Panel>
              );
          })}
        </HorizontalList>
        <br/><br/><br/>
      </div>
    );
  }
}
