import React, {Component} from 'react';
import Card from 'views/components/card';

export default class CardContainer extends Component {
  render() {
    return (
      <div>
        <Card heading="Lorem Ipsum">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ipsum elit, lobortis egestas augue vel, porttitor
          tincidunt magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ipsum elit, lobortis egestas augue vel, porttitor
          tincidunt magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ipsum elit, lobortis egestas augue vel, porttitor
          tincidunt magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ipsum elit, lobortis egestas augue vel, porttitor
          tincidunt magna.
        </Card>
      </div>
    );
  }
}
