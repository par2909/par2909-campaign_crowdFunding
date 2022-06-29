import React from 'react';
import Header from './Header';
import Head from 'next/head'; // used to moved child tag  to upper component
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

const Layout = (props) => {
    return(
      <Container>
        <Head>
          <link  async rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
        </Head>

        <Header /> 
        {props.children}
      </Container>
    );
  };
  export default Layout;