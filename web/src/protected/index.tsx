import { Ctx } from '@jaredpalmer/after';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div``;

class ProtectedPage extends React.Component {
  static getInitialProps({ req, res, match }: Ctx<unknown>) {
    return {
      allowAnonymous: false,
    };
  }

  render() {
    return (
      <Root>
        <p>private stuff</p>
      </Root>
    );
  }
}

export default ProtectedPage;
