import React from 'react';
import DropdownTooltip from 'views/components/dropdown-tooltip';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('DropdownTooltip', () => {
  describe('display', () => {
    it('should render with class DropdownTooltip', () => {
      const component = shallow(<DropdownTooltip />);
      expect(component.hasClass('DropdownTooltip')).to.be.true;
    });

    it('should render give class CustomDropdownTooltip', () => {
      const component = shallow(<DropdownTooltip className="CustomDropdownTooltip"/>);
      expect(component.hasClass('CustomDropdownTooltip')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = mount(<DropdownTooltip onClick={handleClick}/>);

      component.simulate('click');
      expect(handleClick).to.have.been.called;
    });
  });
});
