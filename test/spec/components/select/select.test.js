import React from 'react';
import Select from 'views/components/select';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import Sinon, {spy} from 'sinon';

describe('Select', () => {
  describe('display', () => {
    it('should render as div', () => {
      const component = shallow(<Select />);
      expect(component.shallow().is('div')).to.be.true;
    });

    it('should render div with class Select', () => {
      const component = shallow(<Select />);
      expect(component.shallow().contains('<div className="Select"></div>'));
    });

    it('should render give class CustomSelect', () => {
      const component = shallow(<Select className="CustomSelect"/>);
      expect(component.shallow().find('.CustomSelect')).to.have.length(1);
    });

    it('should render with class Select--multiple when is multiple', () => {
      const component = shallow(<Select multiple/>);
      expect(component.shallow().find('.Select--multiple')).to.have.length(1);
    });

    it('should render without class Select--multiple when is not multiple', () => {
      const component = shallow(<Select multiple={false}/>);
      expect(component.shallow().hasClass('Select--multiple')).to.be.false;
    });

    it('should render without class Select--opened when is not open', () => {
      const component = shallow(<Select multiple={false}/>);
      expect(component.find('.Select--opened')).to.have.length(0);
    });

    it('should render one label', () => {
      const component = shallow(<Select multiple={false} label="Label"/>).shallow();

      expect(component.find('.Select-Label')).to.have.length(1);
    });

    it('should render an error', () => {
      const component = shallow(<Select error="Error" />).shallow();

      expect(component.find('.Select-error')).to.have.length(1);
    });
  });

  describe('behavior', () => {
    describe('both', () => {
      it('should render with class Select--opened when is clicked', () => {
        const component = shallow(<Select/>).shallow();

        component.find('.Select').simulate('click');

        expect(component.find('.Select--opened')).to.have.length(1);
      });

      it('should render without class Select--opened when is clicked twice', () => {
        const component = shallow(<Select/>).shallow();

        component.find('.Select').simulate('click');
        component.find('.Select').simulate('click');

        expect(component.find('.Select--opened')).to.have.length(0);
      });

      it('should render without class Select--opened when clicking outside', () => {
        const component = mount(<div> <Select /> <div className="outside">outside</div> </div>);

        component.find('.Select').simulate('click');
        component.find('.outside').simulate('click');

        expect(component.find('Select--opened')).to.have.length(0);
      });


      it('should not render children by default', () => {
        const component = shallow(
          <Select>
            <option value="1">option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );
        expect(component.shallow().find('.Select-Option')).to.have.length(0);
      });

      it('should render options when clicked', () => {
        const component = mount(
          <Select>
            <option value="1">option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>);

        component.find('.Select').simulate('click');

        expect(component.find('.Select-Option')).to.have.length(3);
      });

      it('should render options from props when clicked', () => {
        const component = mount(
          <Select options={[
            {
              label: 'option 1',
              value: 1,
            }, {
              label: 'option 2',
              value: 2,
            }, {
              label: 'option 3',
              value: 3,
            },
          ]} />
        );

        component.find('.Select').simulate('click');
        expect(component.find('.Select-Option')).to.have.length(3);
      });

      it('should render one option as selected when open when option given as child with prop selected=true', () => {
        const component = mount(
          <Select>
            <option value="1" selected>option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');

        expect(component.find('.Select-Option--selected')).to.have.length(1);
      });

      it('should trigger onChange when option clicked', () => {
        const handleChange = spy();
        const component = mount(
          <Select onChange={handleChange}>
            <option value="1" selected>option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');
        component.find('.Select-Option').first().simulate('click');

        expect(handleChange).to.have.been.called;
      });

      it('should not change selection when option clicked and event is preventDefault', () => {
        const handleChange = spy(function handleClick() {
          return false;
        });

        const component = mount(
          <Select onChange={handleChange}>
            <option value="1" selected>option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');
        component.find('.Select-Option').first().simulate('click');

        expect(handleChange.called).to.be.true;
        expect(component.find('.Select-Option--selected')).to.have.length(0);
      });
    });

    describe('single', () => {
      it('should render one option as selected when open when value="1"', () => {
        const component = mount(
          <Select value="1">
            <option value="1">option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');

        expect(component.find('.Select-Option--selected')).to.have.length(1);
      });

      it('should close after selecting an option', () => {
        const component = mount(
          <Select value="1">
            <option value="1">option 1</option>
            <option value="2">option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');
        component.find('.Select-Option').first().simulate('click');

        expect(component.find('.Select--opened')).to.have.length(0);
      });

      it('should render one and only one option as selected', () => {
        const component = mount(
          <Select >
            <option value="1" selected>option 1</option>
            <option value="2" selected>option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');

        expect(component.find('.Select-Option--selected')).to.have.length(1);
      });

      it('should trigger onChange("1") when first option clicked', () => {
        const handleChange = spy();
        const component = mount(
          <Select onChange={handleChange}>
            <option value="1">option 1</option>
            <option value="2" selected>option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');
        component.find('.Select-Option').first().simulate('click');
        expect(handleChange.calledWith(Sinon.match.any, '1')).to.be.true;
        expect(handleChange.calledOnce).to.be.true;
      });
    });

    describe('multiple', () => {
      it('should render all selected options with class Select-Option--selected', () => {
        const component = mount(
          <Select multiple>
            <option value="1" selected>option 1</option>
            <option value="2" selected>option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');

        expect(component.find('.Select-Option--selected')).to.have.length(2);
      });

      it('should trigger onChange(["2", "1"]) when first option clicked and second is already selected', () => {
        const handleChange = spy();
        const component = mount(
          <Select multiple onChange={handleChange}>
            <option value="1">option 1</option>
            <option value="2" selected>option 2</option>
            <option value="3">option 3</option>
          </Select>
        );

        component.find('.Select').simulate('click');
        component.find('.Select-Option').first().simulate('click');

        expect(handleChange.calledWith(Sinon.match.any, ['2', '1'])).to.be.true;
        expect(handleChange.calledOnce).to.be.true;
      });
    });
  });
});
