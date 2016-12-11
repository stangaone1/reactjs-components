import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import {Button} from 'views/components/buttons';

import './publish-board-actions.scss';

class PublishBoardActions extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      className: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
      element: PropTypes.element,
      other: PropTypes.object,
    })),
  };
  static defaultProps = {
    buttons: [],
  };

  renderControls() {
    const {buttons} = this.props;

    return buttons.map((item, key) => {
      const buttonClasses = {
        'PublishBoardActions-Button': true,
      };
      const Element = item.element || Button;

      return (
        <Element
          key={'pbId_' + key}
          className={cx(buttonClasses, item.className)}
          onClick={item.onClick}
          {...item.other}>
            {item.label}
        </Element>
      );
    });
  }

  render() {
    return (
      <div className="PublishBoardActions">
        {this.renderControls()}
      </div>
    );
  }
}

export default PublishBoardActions;
