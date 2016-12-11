import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import validatePositiveInteger from 'lib/utils/positiveInteger';
import restrictedCompare from 'lib/utils/restricted-compare';

import './pagination.scss';

export default class Pagination extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    totalPages: validatePositiveInteger.bind(this, true),
    selectedPage: validatePositiveInteger.bind(this, false),
    maxPrevPages: validatePositiveInteger.bind(this, true),
    maxMidSidePages: validatePositiveInteger.bind(this, true),
    maxNextPages: validatePositiveInteger.bind(this, true),
    compress: PropTypes.bool,
    onPageChange: PropTypes.func,
  };

  static defaultProps = {
    totalPages: 1,
    selectedPage: 1,
    maxPrevPages: 1,
    maxMidSidePages: 1,
    maxNextPages: 1,
    compress: false,
    onPageChange: () => {},
  };

  shouldComponentUpdate(nextProps, nextState) {
    return restrictedCompare(this, nextProps, nextState);
  }

  getCorrectedPageValue(page) {
    if (page < 0) {
      return 0;
    } else if (page >= this.props.totalPages) {
      return this.props.totalPages - 1;
    }
    return page;
  }

  getPageInterval(start, end) {
    const pages = [];
    const {selectedPage, onPageChange} = this.props;
    for (let i = start; i < end; i++) {
      const pageClass = cx('Pagination-page',
        {'Pagination-page--selected': selectedPage === i}
      );
      pages.push(
        <div
          className={pageClass}
          onClick={onPageChange.bind(this, this.getCorrectedPageValue(i))}
          key={i}
          >
          {i + 1}
        </div>
      );
    }
    return pages;
  }

  renderPages(selectedPage) {
    let pages = null;
    const {
      compress,
      maxPrevPages,
      maxMidSidePages,
      maxNextPages,
      totalPages,
    } = this.props;

    if (!compress || maxPrevPages + maxMidSidePages + maxNextPages >= totalPages) {
      pages = (
        <div>
          {this.getPageInterval(0, totalPages)}
        </div>);
    } else {
      if (selectedPage < maxPrevPages + 2 * maxMidSidePages) {
        pages = (
          <div>
            {this.getPageInterval(0, Math.max(maxPrevPages, selectedPage + 2))}
            {" ... "}
            {this.getPageInterval(totalPages - maxNextPages, totalPages)}
          </div>);
      } else if (selectedPage > totalPages - maxNextPages - maxMidSidePages * 2 - 1) {
        pages = (
          <div>
            {this.getPageInterval(0, maxPrevPages)}
            {" ... "}
            {this.getPageInterval(Math.min(totalPages - maxNextPages, selectedPage - 1), totalPages)}
          </div>);
      } else {
        pages = (
          <div>
            {this.getPageInterval(0, maxPrevPages)}
            {" ... "}
            {this.getPageInterval(selectedPage - maxMidSidePages, selectedPage + maxMidSidePages + 1)}
            {" ... "}
            {this.getPageInterval(totalPages - maxNextPages, totalPages)}
          </div>);
      }
    }
    return pages;
  }

  render() {
    const {className,
      children,
      selectedPage,
      onPageChange,
      totalPages,
      ...props} = this.props;

    const componentClasses = cx('Pagination', className);
    const prevClasses = cx('Pagination-prev', {
      'Pagination-prev--disabled': selectedPage === 0,
    });
    const nextClasses = cx('Pagination-next', {
      'Pagination-next--disabled': selectedPage === totalPages - 1,
    });

    return (
      <div className={componentClasses} {...props}>
        <div
          className={prevClasses}
          onClick={onPageChange.bind(this, this.getCorrectedPageValue(selectedPage - 1))}
          />
        {this.renderPages(selectedPage)}
        <div
          className={nextClasses}
          onClick={onPageChange.bind(this, this.getCorrectedPageValue(selectedPage + 1))}
          />
      </div>
    );
  }
}
