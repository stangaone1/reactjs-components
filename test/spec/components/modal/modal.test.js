import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import Modal from 'views/components/modal/modal';

describe('Modal', () => {
  describe('display', () => {
    it('should render with overlay', () => {
      const wrapper = shallow(<Modal isOpen><div>Modal</div></Modal>);
      expect(wrapper.closest('.Modal-overlay')).to.have.length(1);
    });

    it('should render with class Modal', () => {
      const wrapper = shallow(<Modal isOpen><div>Modal</div></Modal>);
      expect(wrapper.find('.Modal')).to.have.length(1);
    });

    it('should render with class Modal--small when is of size small', () => {
      const wrapper = shallow(<Modal isOpen size="small"><div>Modal</div></Modal>);
      expect(wrapper.find('.Modal--small')).to.have.length(1);
    });

    it('should render with class Modal--padded when is padded', () => {
      const wrapper = shallow(<Modal isOpen padded><div>Modal</div></Modal>);
      expect(wrapper.find('.Modal--padded')).to.have.length(1);
    });
  });

  describe('behaviour', () => {
    it('should close on close button click', () => {
      const onClose = spy();
      const wrapper = shallow(
        <Modal isOpen onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );
      wrapper.find('.Modal-close').simulate('click');
      expect(onClose.calledOnce).to.be.true;
    });

    // TODO fix test (enzyme issue)
    // it('should close on overlay click', () => {
    //   const onClose = spy();
    //   const wrapper = mount(
    //     <Modal isOpen onClose={onClose}>
    //       <div>Modal</div>
    //     </Modal>
    //   );
    //   wrapper.closest('.Modal-overlay').simulate('click');
    //   expect(onClose.calledOnce).to.be.true;
    // });
  });
});
