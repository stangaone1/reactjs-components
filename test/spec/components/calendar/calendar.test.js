import React from 'react';
import Calendar from 'views/components/calendar';
import { shallow } from 'enzyme';
import {expect} from 'chai';

describe('Calendar', () => {
  describe('display', () => {
    let component = null;

    it('should be a DatePicker with .Calendar class', () => {
      component = shallow(<Calendar />);
      expect(component.is('DatePicker')).to.be.true;
      expect(component.hasClass('Calendar')).to.be.true;
    });

    it('should render a custom class', () => {
      const customClass = 'Calendar--custom';
      component = shallow(<Calendar className={customClass}/>);
      expect(component.hasClass(customClass)).to.be.true;
    });
  });
});
