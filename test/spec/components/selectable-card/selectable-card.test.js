import React from 'react';
import SelectableCard from 'views/components/selectable-card';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('SelectableCard', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<SelectableCard />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class SelectableCard', () => {
      const component = shallow(<SelectableCard />);
      expect(component.hasClass('SelectableCard')).to.be.true;
    });

    it('should render give class CustomSelectableCard', () => {
      const component = shallow(<SelectableCard className="CustomSelectableCard"/>);
      expect(component.hasClass('CustomSelectableCard')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<SelectableCard onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });

    it('should have selected class if component have selected prop = true', () => {
      const component = shallow(<SelectableCard selected />);

      expect(component.hasClass('SelectableCard--selected')).to.be.true;
    });
  });
});
