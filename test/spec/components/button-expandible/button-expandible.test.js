import React from 'react';
import ButtonExpandible from 'views/components/button-expandible';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('ButtonExpandible', () => {
  describe('display', () => {
    it('should render with class ButtonExpandible', () => {
      const component = shallow(<ButtonExpandible />);
      expect(component.hasClass('ButtonExpandible')).to.be.true;
    });

    it('should render give class CustomButtonExpandible', () => {
      const component = shallow(<ButtonExpandible className="CustomButtonExpandible"/>);
      expect(component.hasClass('CustomButtonExpandible')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<ButtonExpandible onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
