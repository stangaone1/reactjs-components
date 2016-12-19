import React from 'react';
import ButtonMultiple from 'views/components/button-multiple';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('ButtonMultiple', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<ButtonMultiple />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class ButtonMultiple', () => {
      const component = shallow(<ButtonMultiple />);
      expect(component.hasClass('ButtonMultiple')).to.be.true;
    });

    it('should render give class CustomButtonMultiple', () => {
      const component = shallow(<ButtonMultiple className="CustomButtonMultiple"/>);
      expect(component.hasClass('CustomButtonMultiple')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<ButtonMultiple onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
