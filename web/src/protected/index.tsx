import React from 'react';
import styled from '@emotion/styled';

const Root = styled.div``;

class ProtectedPage extends React.Component {
  render() {
    return (
      <Root>
        <p>private stuff</p>
      </Root>
    );
  }
}

export default ProtectedPage;
