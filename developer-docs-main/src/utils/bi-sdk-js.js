async function initialized() {
  const BeyondIdentityEmbeddedSdk = await import("@beyondidentity/bi-sdk-js");
  const embedded = await BeyondIdentityEmbeddedSdk.Embedded.initialize();
  return embedded;
}

export async function getPasskeys() {
  const embedded = await initialized();
  const passkeys = await embedded.getPasskeys();
  passkeys.sort((a, b) => a.identity.username.localeCompare(b.identity.username))
  return passkeys;
}

export async function bindPasskey(url) {
  const embedded = await initialized();
  return await embedded.bindPasskey(url);
}

export async function authenticate(url, passkeyId) {
  const embedded = await initialized();
  return await embedded.authenticate(url, passkeyId);
}

export async function deletePasskey(passkeyId) {
  const embedded = await initialized();
  return await embedded.deletePasskey(passkeyId);
}