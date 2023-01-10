async function initialized() {
  const BeyondIdentityEmbeddedSdk = await import("@beyondidentity/bi-sdk-js");
  const embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();
  return embedded;
}

export async function getCredentials() {
  const embedded = await initialized();
  return await embedded.getCredentials();
}

export async function bindCredential(url) {
  const embedded = await initialized();
  return await embedded.bindCredential(url);
}

export async function authenticate(url, credentialId) {
  const embedded = await initialized();
  return await embedded.authenticate(url, credentialId);
}

export async function deleteCredential(credentialId) {
  const embedded = await initialized();
  return await embedded.deleteCredential(credentialId);
}