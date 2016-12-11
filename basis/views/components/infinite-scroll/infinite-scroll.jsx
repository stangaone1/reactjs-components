import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import './infinite-scroll.scss';

export default class InfiniteScroll extends Component {
  static propTypes = {
    hasMore: PropTypes.bool,
    fetching: PropTypes.bool,
    onScrollBottom: PropTypes.func,
    treshold: PropTypes.number,
    maxHeight: PropTypes.number,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    hasMore: false,
    fetching: false,
    treshold: 50,
    maxHeight: null,
  };

  shouldComponentUpdate(nextProps) {
    return shallowCompare(this, nextProps);
  }

  onScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const hitBottom = scrollTop + clientHeight >= scrollHeight - this.props.treshold;

    if (hitBottom && this.props.hasMore && !this.props.fetching && this.props.onScrollBottom) {
      this.props.onScrollBottom();
    }
  }

  renderSpinner() {
    if (this.props.fetching) {
      return (
        <div>Loading...</div>
      );
    }
  }

  render() {
    const style = {
      maxHeight: this.props.maxHeight,
    };

    return (
      <div
        className="InfiniteScroll"
        {...this.props}
        style={style}
        onScroll={this.onScroll.bind(this)}
      >
        {this.props.children}
        {this.renderSpinner()}
      </div>
    );
  }
}
