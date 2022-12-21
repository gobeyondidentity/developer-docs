import '@beyondidentity/bi-sdk-js';
import { Embedded } from '@beyondidentity/bi-sdk-js';

class BeyondIdentityEmbeddedSdk {
  embedded = null;

  initialized = async () => {
    if (!this.embedded) {
      this.embedded = await Embedded.initialize();
    }
    return this.embedded;
  };

  bindCredential = async (url) => {
    return (await this.initialized()).bindCredential(url);
  };

  getCredentials = async () => {
    return (await this.initialized()).getCredentials();
  };

  deleteCredential = async (id) => {
    return (await this.initialized()).deleteCredential(id);
  };

  isAuthenticateUrl = async (url) => {
    return (await this.initialized()).isAuthenticateUrl(url);
  };

  isBindCredentialUrl = async (url) => {
    return (await this.initialized()).isBindCredentialUrl(url);
  };

  authenticate = async (url, credentialId) => {
    return (await this.initialized()).authenticate(url, credentialId);
  };
}

export default BeyondIdentityEmbeddedSdk;