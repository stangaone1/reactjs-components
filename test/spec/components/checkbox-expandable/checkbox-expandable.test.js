import React from 'react';
import CheckboxExpandable from 'views/components/checkbox-expandable';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';
import * as utils from '../../../utils/utils';

describe('CheckboxExpandable', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<CheckboxExpandable />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class CheckboxExpandable', () => {
      const component = shallow(<CheckboxExpandable />);
      expect(component.hasClass('CheckboxExpandable')).to.be.true;
    });

    it('should render give class CustomCheckboxExpandable', () => {
      const component = shallow(<CheckboxExpandable className="CustomCheckboxExpandable"/>);
      expect(component.hasClass('CustomCheckboxExpandable')).to.be.true;
    });
  });

  describe('children', () => {
    it('has 4 children', () => {
      const component = utils.shallowlyRenderedOutput(<CheckboxExpandable checked>
        <div>testrds</div>
      </CheckboxExpandable>);
      expect(component.props.children.length).to.equal(4);
    });
    it('has 200 children', () => {
      const elements = new Array(200).fill(false);

      const component = shallow(<div>
        {elements.map(() => {
          return (<CheckboxExpandable />);
        })}
      </div>);
      expect(component.node.props.children.length).to.equal(200);
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<CheckboxExpandable onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
