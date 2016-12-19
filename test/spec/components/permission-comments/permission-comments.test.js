import React from 'react';
import PermissionComments from 'views/components/permission-comments';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';

describe('PermissionComments', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<PermissionComments />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class PermissionComments', () => {
      const component = shallow(<PermissionComments />);
      expect(component.hasClass('PermissionComments')).to.be.true;
    });

    it('should render give class CustomPermissionComments', () => {
      const component = shallow(<PermissionComments className="CustomPermissionComments"/>);
      expect(component.hasClass('CustomPermissionComments')).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<PermissionComments onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
