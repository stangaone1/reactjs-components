import React from 'react';
import RadioList from 'views/components/radio-list';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('RadioList', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<RadioList />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class RadioList', () => {
      const component = shallow(<RadioList />);
      expect(component.hasClass('RadioList')).to.be.true;
    });

    it('should render give class CustomRadioList', () => {
      const component = shallow(<RadioList className="CustomRadioList"/>);
      expect(component.hasClass('CustomRadioList')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<RadioList onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
