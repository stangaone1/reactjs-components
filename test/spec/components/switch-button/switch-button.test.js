import React from 'react';
import SwitchButton from 'views/components/switch-button';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import * as utils from '../../../utils/utils';

describe('SwitchButton', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<SwitchButton />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class SwitchButton', () => {
      const component = shallow(<SwitchButton />);
      expect(component.hasClass('SwitchButton')).to.be.true;
    });

    it('should render give class CustomSwitchButton', () => {
      const component = shallow(<SwitchButton className="CustomSwitchButton"/>);
      expect(component.hasClass('CustomSwitchButton')).to.be.true;
    });
  });


  let switchButtonComponent = null;
  let toggler = null;

  describe('render', () => {
    it('should have a <div> as container and should have a class of .SwitchButton', () => {
      switchButtonComponent = utils.shallowlyRenderedOutput(<SwitchButton />);
      expect(switchButtonComponent.type).to.equal('div');
      expect(switchButtonComponent.props.className).to.equal('SwitchButton');
    });

    it('should contain a toggle indicator with a class of .SwitchButton-toggle', () => {
      switchButtonComponent = utils.shallowlyRenderedOutput(<SwitchButton />);
      toggler = switchButtonComponent.props.children[1];
      expect(toggler.type).to.equal('div');
      expect(toggler.props.className).to.equal('SwitchButton-toggle');
    });
    it('should have a coresponding via props.checked', () => {
      switchButtonComponent = utils.shallowlyRenderedOutput(<SwitchButton checked/>);
      expect(switchButtonComponent.props.className).to.equal('SwitchButton');
      expect(switchButtonComponent.props.children[1].props.className).to.equal('SwitchButton-toggle SwitchButton-toggle--checked');
    });
  });
});
