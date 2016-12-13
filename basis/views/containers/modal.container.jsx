import React, { Component } from 'react';
import Button from 'views/components/buttons/button';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'views/components/modal';

export default class ModalContainer extends Component {
  constructor() {
    super();
    this.state = {
      defaultModalIsOpen: false,
      smallModalIsOpen: false,
      paddedModalIsOpen: false,
    };
  }

  openDefaultModal() {
    this.setState({
      defaultModalIsOpen: true,
    });
  }

  closeDefaultModal() {
    this.setState({
      defaultModalIsOpen: false,
    });
  }

  openSmallModal() {
    this.setState({
      smallModalIsOpen: true,
    });
  }

  closeSmallModal() {
    this.setState({
      smallModalIsOpen: false,
    });
  }

  openPaddedModal() {
    this.setState({
      paddedModalIsOpen: true,
    });
  }

  closePaddedModal() {
    this.setState({
      paddedModalIsOpen: false,
    });
  }


  render() {
    return (
      <div>
        <Button onClick={this.openDefaultModal.bind(this)}>Open default modal</Button>
        <Button onClick={this.openSmallModal.bind(this)}>Open small modal</Button>
        <Button onClick={this.openPaddedModal.bind(this)}>Open padded modal</Button>

        <Modal isOpen={this.state.defaultModalIsOpen}
               onClose={this.closeDefaultModal.bind(this)}
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
            viverra diam, nec ultricies orci. Quisque justo velit, consectetur
            id vehicula non, imperdiet at nibh. Integer at elit a orci luctus
            porta eu id velit. Vestibulum a nulla vitae nunc sollicitudin cursus.
            Nunc ac purus arcu. Mauris tempus congue tincidunt. Aenean sit amet
            posuere magna. Vestibulum elementum vehicula urna, eu scelerisque
            risus accumsan eu. Nam finibus porta orci interdum rutrum. Nunc non
            ex ut nunc vestibulum finibus sit amet non risus.
          </ModalBody>
          <ModalFooter>
            <Button>Button</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.smallModalIsOpen}
               onClose={this.closeSmallModal.bind(this)}
               size="small"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
            viverra diam, nec ultricies orci. Quisque justo velit, consectetur
            id vehicula non, imperdiet at nibh. Integer at elit a orci luctus
            porta eu id velit. Vestibulum a nulla vitae nunc sollicitudin cursus.
            Nunc ac purus arcu. Mauris tempus congue tincidunt. Aenean sit amet
            posuere magna. Vestibulum elementum vehicula urna, eu scelerisque
            risus accumsan eu. Nam finibus porta orci interdum rutrum. Nunc non
            ex ut nunc vestibulum finibus sit amet non risus.
          </ModalBody>
          <ModalFooter>
            <Button>Button</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.paddedModalIsOpen}
               onClose={this.closePaddedModal.bind(this)}
               padded
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
            viverra diam, nec ultricies orci. Quisque justo velit, consectetur
            id vehicula non, imperdiet at nibh. Integer at elit a orci luctus
            porta eu id velit. Vestibulum a nulla vitae nunc sollicitudin cursus.
            Nunc ac purus arcu. Mauris tempus congue tincidunt. Aenean sit amet
            posuere magna. Vestibulum elementum vehicula urna, eu scelerisque
            risus accumsan eu. Nam finibus porta orci interdum rutrum. Nunc non
            ex ut nunc vestibulum finibus sit amet non risus.
          </ModalBody>
          <ModalFooter>
            <Button>Button</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
