import React, { Component } from 'react';
import ProgressBar from 'views/components/progress-bar';
export default class ProgressBarContainer extends Component {
  render() {
    return (
      <div>
        <br/>
        <br/>
        <ProgressBar completed={40}>40 %</ProgressBar>
        <br/>
        <br/>
        <ProgressBar completed={100}>100 %</ProgressBar>
        <br/>
        <br/>
      </div>
    );
  }
}
