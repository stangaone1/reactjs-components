import React, {Component, PropTypes} from 'react';

import Icon from 'views/components/icon';
import NextPrev from 'views/components/nextprev/nextprev';

import './publish-board-controls.scss';

class PublishBoardControls extends Component {
  static propTypes = {
    nextDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    pagination: PropTypes.object,
    onCloseBoard: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    displayPrevNext: PropTypes.bool,
  };

  static defaultProps = {
    pagination: {},
    displayPrevNext: true,
  };

  getPaginationState() {
    const {
      nextDisabled,
      prevDisabled,
      pagination,
    } = this.props;

    const paginationStateObject = {
      prevDisabled,
      nextDisabled,
    };

    if (
      Object.keys(pagination)
      &&
      pagination.hasOwnProperty('current')
      &&
      pagination.hasOwnProperty('total')
    ) {
      paginationStateObject.prevDisabled = pagination.current === 0 ? true : prevDisabled;
      paginationStateObject.nextDisabled = pagination.current === pagination.total - 1 ? true : nextDisabled;
    }

    return paginationStateObject;
  }

  render() {
    const {onCloseBoard, onPrevPage, onNextPage, displayPrevNext} = this.props;
    const paginationState = this.getPaginationState();

    return (
      <div className="PublishBoardControls">
        <button className="PublishBoardControls-CloseButton" onClick={onCloseBoard}>
          <Icon name="close" />
        </button>
        {displayPrevNext && <NextPrev
          prevDisabled = {paginationState.prevDisabled}
          nextDisabled = {paginationState.nextDisabled}
          onClickNext = {onPrevPage}
          onClickPrev = {onNextPage}
        />}
      </div>
    );
  }
}

export default PublishBoardControls;
