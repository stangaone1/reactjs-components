// deps
import React, { Component, PropTypes } from 'react';
import DashboardCard from 'views/components/dashboardcard-list/dashboardcard';
import { Button } from 'views/components/buttons';

// style
import './dashboardcard-list.scss';

export default class DashboardcardList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    limit: PropTypes.number,
    type: PropTypes.string,
    onClick: PropTypes.func,
    actions: PropTypes.array,
  };

  static defaultProps = {
    list: [],
    limit: 5,
    type: null,
    actions: ['ADD', 'CHANGE', 'EDIT', 'DELETE', 'PREVIEW'], // cards control options
  };

  onAction(idx, action) {
    if (this.props.onClick) {
      const { type, actions } = this.props;
      const actionId = (actions[action + 1]) ? (action + 1) : 0;

      // issue callback caller
      this.props.onClick(type, idx, actions[actionId]);
    }
  }

  getBoardsList() {
    const { list } = this.props;

    // map boards list
    const boardsList = list.map((board, idx) => {
      return (
        <DashboardCard
          key={'board-' + idx}
          backgroundImageSrc={board.template.preview}
          onBackgroundClick={this.onAction.bind(this, idx)}
          onOptionClick={this.onAction.bind(this, idx)}
        />
      );
    });

    return boardsList;
  }

  getAddMore() {
    const { list, limit } = this.props;

    // got room for more cards ?
    if (list.length < limit) {
      // get remaining cards message
      const remainingCards = `${limit - list.length} more slides available for you to use`;

      return (
        <div className="DashboardCardList-Remaining">
          <Button onClick={this.onAction.bind(this, null)}>Add new slide</Button>
          <span>{remainingCards}</span>
        </div>
      );
    }

    return null;
  }

  render() {
    // get board items list
    const boardsList = this.getBoardsList();
    const addMore = this.getAddMore();

    return (
      <div className="DashboardCardList">
        <div className="DashboardCardList-Items">
          {boardsList}
        </div>
        {addMore}
      </div>
    );
  }
}
