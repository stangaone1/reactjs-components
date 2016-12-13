import React, {Component} from 'react';
import NextPrev from 'views/components/nextprev';

const limit = 5;

export default class NextPrevContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prevDisabled: true,
      nextDisabled: false,
      counter: 1,
    };
  }

  _increment(step) {
    let counter;
    if (counter === limit) {
      counter = limit;
    } else if (counter === 0) {
      counter = 0;
    } else {
      counter = this.state.counter + step;
    }

    this.setState({
      counter: counter,
      nextDisabled: counter === limit || counter * 100 >= 300,
      prevDisabled: counter === 1,
    });
  }

  render() {
    return (
      <div>
        <h3>NextPrev component - count {this.state.counter}</h3>
        <NextPrev
          nextDisabled={this.state.nextDisabled}
          prevDisabled={this.state.prevDisabled}
          onClickNext={this._increment.bind(this, 1)}
          onClickPrev={this._increment.bind(this, -1)} />

          <h3>NextPrev component - with label</h3>
          <NextPrev
            nextDisabled={this.state.nextDisabled}
            prevDisabled={this.state.prevDisabled}
            onClickNext={this._increment.bind(this, 1)}
            onClickPrev={this._increment.bind(this, -1)}
            labelSide="right"
            current={this.state.counter}
            maxVisible={100}
            total={300}
          />
      </div>
    );
  }
}
