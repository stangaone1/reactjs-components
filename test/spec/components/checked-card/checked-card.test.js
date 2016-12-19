import React from 'react';
import CheckedCard from 'views/components/checked-card';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as utils from '../../../utils/utils';
import {isElementOfType} from 'react-addons-test-utils';

import CheckBox from 'views/components/checkbox';
import Icon from 'views/components/icon';

describe('CheckedCard', () => {
  let checkedCardComponent = null;

  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<CheckedCard />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class CheckedCard', () => {
      const component = shallow(<CheckedCard />);
      expect(component.hasClass('CheckedCard')).to.be.true;
    });

    it('should render give class CustomCheckedCard', () => {
      const component = shallow(<CheckedCard className="CustomCheckedCard"/>);
      expect(component.hasClass('CustomCheckedCard')).to.be.true;
    });
  });

  describe('children', () => {
    beforeEach(() => {
      checkedCardComponent = utils.shallowlyRenderedOutput(
        <CheckedCard title="3rwefdg" subtitle="3w4try" icon="attachment"/>);
    });
    it('should render children number correctly', () => {
      expect(checkedCardComponent.props.children.length).to.equal(5);
    });
    it('should render children component type correctly', () => {
      expect(isElementOfType(checkedCardComponent.props.children[0], CheckBox)).to.be.true;
      expect(isElementOfType(checkedCardComponent.props.children[1], Icon)).to.be.true;
      expect(checkedCardComponent.props.children[2].type).to.equal('div');
      expect(checkedCardComponent.props.children[3].type).to.equal('div');
    });
  });

  describe('selected', () => {
    it('should not be selected when initialised', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard />);
      expect(checkedCardComponent.props.className).to.not.contain('CheckedCard--select');
    });

    it('should be selected when true prop is send', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard checked />);
      expect(checkedCardComponent.props.className).to.contain('CheckedCard--select');
    });

    it('should not be selected when false prop is send', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard checked={false} />);
      expect(checkedCardComponent.props.className).to.not.contain('CheckedCard--select');
    });

    it('icon should be selected when component is checked', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard
        checked icon="attachment" />);
      expect(checkedCardComponent.props.children[1].props.className).to.contain('CheckedCard-icon--select');
    });

    it('icon should not be selected when component is not checked', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard
        checked={false} icon="attachment" />);
      expect(checkedCardComponent.props.children[1].props.className).to.not.contain('CheckedCard-icon--select');
    });

    it('icon should not be selected when component is default', () => {
      checkedCardComponent = utils.shallowlyRenderedOutput(<CheckedCard icon="attachment" />);
      expect(checkedCardComponent.props.children[1].props.className).to.not.contain('CheckedCard-icon--select');
    });
  });
});
