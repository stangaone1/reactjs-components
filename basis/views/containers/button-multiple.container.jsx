import React, {Component} from 'react';
import ButtonMultiple from 'views/components/button-multiple';
import {Button} from 'views/components/buttons';

export default class ButtonMultipleContainer extends Component {

  render() {
    const buttonList = [{
      label: 'save',
      onClick: () => {
        console.log('on click save');
      },
    }, {
      label: 'save as draft',
      onClick: () => {
        console.log('on click save as draft');
      },
    }, {
      label: 'move to trash but is really long',
      onClick: () => {
        console.log('on click move to trash');
      },
    }];

    return (
      <div>
        <ButtonMultiple >
          {buttonList.map((but, index) => {
            return (
              <Button
                onClick={but.onClick}
                key={index}
              >
                {but.label}
              </Button>
            );
          })}
        </ButtonMultiple>

        <ButtonMultiple >
          {buttonList.slice(0, 1).map((but, index) => {
            return (
              <Button
                onClick={but.onClick}
                key={index}
              >
                {but.label}
              </Button>
            );
          })}
        </ButtonMultiple>

        <ButtonMultiple >
          {buttonList.slice(0, 2).map((but, index) => {
            return (
              <Button
                onClick={but.onClick}
                key={index}
              >
                {but.label}
              </Button>
            );
          })}
        </ButtonMultiple>
      </div>
    );
  }
}
