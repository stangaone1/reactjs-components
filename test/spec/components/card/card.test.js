import React from 'react';
import Card from 'views/components/card';
import {shallow} from 'enzyme';
import {expect} from 'chai';

describe('Card', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<Card>Lorem</Card>);
      expect(component.is('div')).to.be.true;
    });

    it('should render with class Card', () => {
      const component = shallow(<Card>Lorem</Card>);
      expect(component.hasClass('Card')).to.be.true;
    });

    it('should render give class CustomCard', () => {
      const component = shallow(<Card className="CustomCard">Lorem</Card>);
      expect(component.hasClass('CustomCard')).to.be.true;
    });

    it('should render with heading CustomTitle', () => {
      const component = shallow(
        <Card heading="CustomTitle">
          Lorem
        </Card>
      );
      expect(component.contains(<div className="Card-heading">CustomTitle</div>)).to.be.true;
    });

    it('should render children when passed in', () => {
      const component = shallow(
        <Card>
          <div>Lorem</div>
        </Card>
      );
      expect(component.contains(<div>Lorem</div>)).to.be.true;
    });
  });
});
