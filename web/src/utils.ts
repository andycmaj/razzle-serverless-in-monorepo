function getKeycloakConfig() {
  return {
    // server
    url: 'http://localhost:8081/auth',
    clientId: 'react-test',
    realm: 'master',
  };
}

export { getKeycloakConfig };
