import React from 'react';
import ExpandibleMailBox from 'views/components/expandible-mail-box';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('ExpandibleMailBox', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<ExpandibleMailBox />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class ExpandibleMailBox', () => {
      const component = shallow(<ExpandibleMailBox />);
      expect(component.hasClass('ExpandibleMailBox')).to.be.true;
    });

    it('should render give class CustomExpandibleMailBox', () => {
      const component = shallow(<ExpandibleMailBox className="CustomExpandibleMailBox"/>);
      expect(component.hasClass('CustomExpandibleMailBox')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<ExpandibleMailBox onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
