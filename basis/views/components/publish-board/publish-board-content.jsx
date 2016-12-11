import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {find} from 'lodash';

import PBActions from './publish-board-actions';
import PBControls from './publish-board-controls';

import './publish-board-content.scss';

const ACTION_PRESETS = [
  {
    preset: 'flip',
    callback: 'onFlip',
  },
];

class PublishBoardContent extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    nextDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    pagination: PropTypes.object,
    onCloseBoard: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onFlip: PropTypes.func,
    displayPrevNext: PropTypes.bool,
  };

  static defaultProps = {
    onFlip: () => {},
    displayPrevNext: true,
  };

  renderActions(actions) {
    let finalActions = null;

    // bind presets to actions
    if (actions && actions.length) {
      finalActions = actions.map((action) => {
        const foundPreset = find(ACTION_PRESETS, {
          preset: action.preset,
        });

        if (foundPreset) {
          action.onClick = this.props[foundPreset.callback];
        }
        return action;
      });

      return <PBActions buttons={finalActions} />;
    }
  }

  renderControls() {
    const {
      nextDisabled,
      prevDisabled,
      pagination,
      onCloseBoard,
      onPrevPage,
      onNextPage,
      displayPrevNext,
    } = this.props;

    return (
      <PBControls
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
        pagination={pagination}
        onCloseBoard={onCloseBoard}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        displayPrevNext={displayPrevNext} />
    );
  }

  renderChildren(element) {
    const {children} = this.props;
    const foundChild = find(children, {'type': element});

    if (!foundChild) {
      return null;
    }

    const {actions, showPagination} = foundChild.props;
    const elementClassname = {
      'PublishBoard-Preview': element === 'preview',
      'PublishBoard-SidebarFront': element === 'sidebar',
      'PublishBoard-SidebarBack': element === 'backface',
      'PublishBoard-SidebarActions': true,
    };

    // render into actual elements
    const actionsElement = actions ? this.renderActions(actions) : null;
    const controlsElement = showPagination || (element === 'sidebar' && typeof showPagination === 'undefined') ? this.renderControls() : null;

    const renderedChild = (
      <div className={cx(elementClassname)}>
        {controlsElement}
        {foundChild}
        {actionsElement}
      </div>
    );

    return (renderedChild);
  }

  render() {
    const {className} = this.props;

    const PBContentClassnames = {
      'PublishBoard-Content': true,
    };

    return (
      <div
        className={cx(PBContentClassnames, className)}
        ref="content">
        {this.renderChildren('preview')}
        <div className="PublishBoard-Sidebar">
          {this.renderChildren('sidebar')}
          {this.renderChildren('backface')}
        </div>
      </div>
    );
  }
}

export default PublishBoardContent;
