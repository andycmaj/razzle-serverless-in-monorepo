import React from 'react';
import logo from './react.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';

const Root = styled.div`
  text-align: center;

  .Home-logo {
    animation: Home-logo-spin infinite 20s linear;
    height: 80px;
  }

  .Home-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }

  .Home-intro {
    font-size: large;
  }

  .Home-resources {
    list-style: none;
  }

  .Home-resources > li {
    display: inline-block;
    padding: 1rem;
  }

  @keyframes Home-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CoolText = styled.code`
  color: green;
`;

const Home: FC = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  if (!(keycloak && initialized)) {
    return null;
  }

  return (
    <Root>
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzles</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.tsx</code> or{' '}
        <CoolText>src/Home.tsx</CoolText> and save to reload.
      </p>
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
        <Link to="protected">Protected Page</Link>
        <div>
          {!keycloak.authenticated ? (
            <button
              onClick={() => {
                console.log('clicked');
                keycloak.login();
              }}
            >
              Login
            </button>
          ) : (
            <button onClick={() => keycloak.logout()}>Logout</button>
          )}
        </div>
      </ul>
    </Root>
  );
};

// @ts-ignore
Home.getInitialProps = () => ({ allowAnonymous: true });

export default Home;
