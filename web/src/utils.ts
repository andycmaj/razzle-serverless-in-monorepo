const serverEnv = (key: string, def: string) => process?.env?.[key] ?? def;

declare global {
  interface Window {
    env: any;
  }
}

function getKeycloakConfig() {
  return typeof window !== 'undefined' && window.env !== 'undefined'
    ? {
        // client
        url: window.env.url,
        clientId: window.env.clientId,
        realm: window.env.realm,
      }
    : {
        // server
        url: serverEnv('KEYCLOAK_URL', 'http://localhost:8081/auth'),
        clientId: serverEnv('KEYCLOAK_CLIENT_ID', 'react-test'),
        realm: serverEnv('KEYCLOAK_REALM', 'master'),
      };
}

export { getKeycloakConfig };
