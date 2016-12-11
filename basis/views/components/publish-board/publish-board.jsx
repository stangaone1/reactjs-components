import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import PBContent from './publish-board-content';

import './publish-board.scss';

const ANIMATIONS = {
  prevEnter: 'prevEnter',
  prevLeave: 'prevLeave',
  nextEnter: 'nextEnter',
  nextLeave: 'nextLeave',
};

class PublishBoard extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    isFlipped: PropTypes.bool,
    loadingMessage: PropTypes.string,
    nextDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    pagination: PropTypes.object,
    onCloseBoard: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    displayPrevNext: PropTypes.bool,
  };

  static defaultProps = {
    loadingMessage: 'Loading... Please wait',
    displayPrevNext: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      contentProxy: null,
      delayedFunction: null,
      direction: null,
      isDelayed: false,
      loading: false,
      flipped: false,
    };
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    element.addEventListener('animationend', this.onAnimationEnd.bind(this));
  }


  componentWillReceiveProps() {
    // remove any delayed state changes from the statck
    clearTimeout(this.state.delayedFunction);

    const newState = this.state;
    newState.loading = false;
    newState.flipped = false;
    newState.delayedFunction = null;

    this.setState(newState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.delayedFunction) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    const element = ReactDOM.findDOMNode(this);
    element.removeEventListener('animationend', this.onAnimationEnd.bind(this));
  }

  onAnimationEnd(ev) {
    const {animationName} = ev;
    const newState = this.state;

    if (animationName === ANIMATIONS.prevEnter || animationName === ANIMATIONS.nextEnter) {
      newState.contentProxy = null;
      newState.direction = null;
      newState.isDelayed = false;

      this.setState(newState);
    }
  }

  onPrevPage() {
    const {onPrevPage} = this.props;
    if (onPrevPage) {
      this.onPageChange('prev', onPrevPage);
    }
  }

  onNextPage() {
    const {onNextPage} = this.props;
    if (onNextPage) {
      this.onPageChange('next', onNextPage);
    }
  }

  onPageChange(direction, callback) {
    const newState = this.state;

    newState.loading = true;
    newState.direction = direction;

    // create proxy
    newState.contentProxy = this.renderContentProxy(
      Object.assign({}, this.props, {className: 'PublishBoard-ContentProxy'})
    );

    // perform the callback to the page
    // ahead of any other operation and
    // see if it responds within the
    // delayed time limit

    newState.delayedFunction = setTimeout(() => {
      this.state.isDelayed = true; // we silently set a delay flag
      this.forceUpdate();
    }, 25);

    this.setState(newState, callback);
  }

  onFlip() {
    const newState = this.state;
    const {children} = this.props;

    const hasBackface = !!children.filter((item) => {
      return item && item.type === 'backface';
    }).length;

    if (hasBackface) {
      newState.flipped = newState.flipped ? false : true;
      this.setState(newState);
    }
  }

  renderContentProxy(props) {
    const {children} = props;
    return React.createElement(PBContent, props, children);
  }

  render() {
    // props
    const {
      className,
      children,
      isFlipped,
      loadingMessage,
      prevDisabled,
      nextDisabled,
      pagination,
      onCloseBoard,
      displayPrevNext,
    } = this.props;

    // state
    const {
      contentProxy,
      direction,
      isDelayed,
      loading,
      flipped,
    } = this.state;

    const PublishBoardClassnames = {
      'PublishBoard': true,
      'PublishBoard--reversed': isFlipped,
      'PublishBoard--flipped': flipped,
      'PublishBoard--loading': loading,
      'PublishBoard--delayed': isDelayed,
      'PublishBoard--prevPage': direction === 'prev',
      'PublishBoard--nextPage': direction === 'next',
    };

    return (
      <div className={cx(PublishBoardClassnames, className)}>
        <PBContent
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
          pagination={pagination}
          onCloseBoard={onCloseBoard}
          onPrevPage={this.onPrevPage.bind(this)}
          onNextPage={this.onNextPage.bind(this)}
          onFlip={this.onFlip.bind(this)}
          displayPrevNext={displayPrevNext}>
            {children}
        </PBContent>

        {contentProxy}

        <p className="PublishBoard-LoadingMessage">
          {loadingMessage}
        </p>
      </div>
    );
  }
}

export default PublishBoard;
