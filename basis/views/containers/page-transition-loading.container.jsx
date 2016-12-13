import React, {Component} from 'react';

export default class PageTransitionLoadingContainer extends Component {

  static willTransitionTo() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  render() {
    return (
      <div>
        this page is deferred
      </div>
    );
  }
}
