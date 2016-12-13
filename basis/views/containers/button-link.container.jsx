import React from 'react';
import {ButtonLink} from 'views/components/buttons';

export default class ButtonLinkContainer extends React.Component {
  onClick(e) {
    e.preventDefault();
  }

  render() {
    return (<ul>
      <li><ButtonLink to="/components/" type="main">Link to /components</ButtonLink></li>
      <li><ButtonLink to="/components/" onClick={this.onClick}>Link to /components - prevent default</ButtonLink></li>
      <li><ButtonLink to="/components/" activeMark>Link to /components, activeMark</ButtonLink></li>
      <li><ButtonLink to="/components/" strictActiveMark>Link to /components, strictActiveMark</ButtonLink></li>
      <li><ButtonLink to="/components/ButtonLinkContainer" strictActiveMark>Link to /components/ButtonLinkContainer, strictActiveMark</ButtonLink></li>
    </ul>);
  }
}

