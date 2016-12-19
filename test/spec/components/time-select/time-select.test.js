import React from 'react';
import TimeSelect from 'views/components/time-select';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy} from 'sinon';
import {isFunction} from 'lodash';
import * as utils from '../../../utils/utils';

describe('TimeSelect', () => {
  let component;
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<TimeSelect />);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class TimeSelect', () => {
      const component = shallow(<TimeSelect />);
      expect(component.hasClass('TimeSelect')).to.be.true;
    });

    it('should render give class CustomTimeSelect', () => {
      const component = shallow(<TimeSelect className="CustomTimeSelect"/>);
      expect(component.hasClass('CustomTimeSelect')).to.be.true;
    });
  });

  describe('children', () => {
    beforeEach(() => {
      component = utils.shallowlyRenderedOutput(<TimeSelect time="18:00"/>);
    });
    it('should render children number correctly', () => {
      expect(component.props.children.length).to.equal(3);
    });
    it('should render children component type correctly', () => {
      expect(component.props.children[0].type).to.equal('div');
      expect(component.props.children[1].type).to.equal('div');
    });
    it('should render this.props.children type correctly', () => {
      component = utils.shallowlyRenderedOutput(<TimeSelect time="18:00">
        <div>AAA</div>
      </TimeSelect>);
      expect(component.props.children[2].type).to.equal('div');
    });
  });

  describe('callback', () => {
    it('should not have a callback if it was not sent', () => {
      component = shallow(<TimeSelect time="18:00"/>);
      expect(isFunction(component.node.props.onChange)).to.be.false;
    });
    it('should have a callback if it was sent', () => {
      component = shallow(<TimeSelect time="18:00" onChange={() => {}}/>);
      expect(isFunction(component.node.props.onChange)).to.be.true;
    });
  });

  describe('behavior', () => {
    it('should handle given events onClick', () => {
      const handleClick = spy();
      const component = shallow(<TimeSelect onClick={handleClick}/>);
      expect(handleClick.called).to.be.false;

      component.simulate('click');

      expect(handleClick.calledOnce).to.be.true;
    });
  });
});
