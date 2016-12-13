// deps
import React, { Component } from 'react';
import { Page, Header, Body, Footer } from 'views/components/page';

import { Button } from 'views/components/buttons';

class PageContainer extends Component {
  render() {
    return (
      <Page>
        <Header>
          <Button>Bttn #01</Button>
          <Button>Bttn #02</Button>

          and some text
        </Header>

        <Body>
          page content goes here
        </Body>

        <Footer>this is page footer bro</Footer>
      </Page>
    );
  }
}

export default PageContainer;
