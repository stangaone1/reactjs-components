import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import {cloneDeep, camelCase} from 'lodash';

import SelectableCard from 'views/components/selectable-card';
import Icon from 'views/components/icon';

import './sortable-list.scss';

export default class SortableList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    cards: PropTypes.object,
    cardsOrder: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    cardsOrder: [],
    disabled: false,
  };

  constructor() {
    super();
    this.state = {
      selectedCard: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onCardSelected(index) {
    this.setState({
      selectedCard: index,
    });
  }

  onArrowClick(action) {
    const {cardsOrder, onChange} = this.props;
    const newCardsOrder = cloneDeep(cardsOrder);
    let aux;
    if (action === 'first' && this.state.selectedCard !== 0) {
      aux = newCardsOrder[this.state.selectedCard];
      newCardsOrder.splice(this.state.selectedCard, 1);
      newCardsOrder.splice(0, 0, aux);
      this.setState({
        selectedCard: 0,
      });
    } else if (action === 'last' && this.state.selectedCard !== newCardsOrder.length - 1) {
      aux = newCardsOrder[this.state.selectedCard];
      newCardsOrder.splice(this.state.selectedCard, 1);
      newCardsOrder.push(aux);
      this.setState({
        selectedCard: newCardsOrder.length - 1,
      });
    } else if (action === 'prev' && this.state.selectedCard !== newCardsOrder.length - 1) {
      aux = newCardsOrder[this.state.selectedCard + 1];
      newCardsOrder[this.state.selectedCard + 1] = newCardsOrder[this.state.selectedCard];
      newCardsOrder[this.state.selectedCard] = aux;
      this.setState({
        selectedCard: this.state.selectedCard + 1,
      });
    } else if (action === 'next' && this.state.selectedCard !== 0) {
      aux = newCardsOrder[this.state.selectedCard - 1];
      newCardsOrder[this.state.selectedCard - 1] = newCardsOrder[this.state.selectedCard];
      newCardsOrder[this.state.selectedCard] = aux;
      this.setState({
        selectedCard: this.state.selectedCard - 1,
      });
    }
    if (onChange) {
      onChange(newCardsOrder);
    }
  }

  renderArrows(show, index, length) {
    if (show) {
      return (
        <div className="SortableList-arrows">
          <div className="SortableList-arrowsLine" />
          <div className="SortableList-arrowFirst" onClick={this.onArrowClick.bind(this, 'first')}>
            <div>
              <div className={cx('SortableList-arrowFirstBorder', {'SortableList-arrowFirstBorder--disabled': index === 0})} />
              <Icon className={cx({'Icon-websiteFocusDisabled': index === 0})} name="arrow"/>
            </div>
          </div>
          <div className="SortableList-arrowNext" onClick={this.onArrowClick.bind(this, 'next')}>
            <Icon className={cx({'Icon-websiteFocusDisabled': index === 0})} name="arrow"/>
          </div>
          <div className="SortableList-arrowPrevious" onClick={this.onArrowClick.bind(this, 'prev')}>
            <Icon className={cx({'Icon-websiteFocusDisabled': index + 1 === length})} name="arrow"/>
          </div>
          <div className="SortableList-arrowLast" onClick={this.onArrowClick.bind(this, 'last')}>
            <Icon className={cx({'Icon-websiteFocusDisabled': index + 1 === length})} name="arrow"/>
            <div className={cx('SortableList-arrowLastBorder', {'SortableList-arrowLastBorder--disabled': index + 1 === length})} />

          </div>
        </div>
      );
    }
  }

  renderCards() {
    const {cards, cardsOrder, disabled} = this.props;
    const {selectedCard} = this.state;
    return cardsOrder.map((card, index) => {
      const cardClasses = cx('SortableList-card', {
        'SortableList-card--selected': selectedCard === index && !disabled,
      });

      return (
        <div key={index} className={cardClasses}>
          {this.renderArrows(selectedCard === index && !disabled, index, cardsOrder.length)}
          <SelectableCard key={index}
                          disabled={disabled}
                          className="SelectableCard-sortableList"
                          selected={selectedCard === index}
                          onSelect={this.onCardSelected.bind(this, index)}
                          card={cards[camelCase(card)]}/>
        </div>
      );
    });
  }

  render() {
    const {className, children, ...props} = this.props;
    const componentClasses = cx('SortableList', {
      // modifiers here
    }, className);

    return (
      <div className={componentClasses} {...props}>
        {this.renderCards()}
        {children}
      </div>
    );
  }
}

