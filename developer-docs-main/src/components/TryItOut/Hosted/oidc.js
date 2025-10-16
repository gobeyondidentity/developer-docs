import { OAuth2Client, generateCodeVerifier } from "@badgateway/oauth2-client";

const DISCOVERY_ENDPOINT =
  "https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/7b92d0ea-4be7-4687-b458-102dc7d63ba6/.well-known/openid-configuration";
const CLIENT_ID = "E6LMHngzsuvYBCFCQ5cAoFd4";

class OIDC {
  static async authenticate() {
    const client = new OAuth2Client({
      discoveryEndpoint: DISCOVERY_ENDPOINT,
      clientId: CLIENT_ID,
      redirectUri: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
    });

    const state = encodeURIComponent(generateRandomState());
    const codeVerifier = encodeURIComponent(await generateCodeVerifier());

    localStorage.setItem("oidcState", state);
    localStorage.setItem("oidcCodeVerifier", codeVerifier);

    document.location = await client.authorizationCode.getAuthorizeUri({
      redirectUri: client.settings.redirectUri,
      state: state,
      codeVerifier: codeVerifier,
      scope: ["openid"],
    });
  }

  static async getToken() {
    const urlParams = new URLSearchParams(window.location.search);
    window.history.replaceState({}, document.title, window.location.pathname);

    // Ensure code and state are in the URL parameters before proceeding
    if (!urlParams.has("code") || !urlParams.has("state")) {
      return null;
    }

    const storedState = localStorage.getItem("oidcState");
    const codeVerifier = localStorage.getItem("oidcCodeVerifier");

    localStorage.removeItem("oidcState");
    localStorage.removeItem("oidcCodeVerifier");

    const code = urlParams.get("code");
    const returnedState = urlParams.get("state");

    if (storedState !== returnedState) {
      return null;
    }

    if (code) {
      const client = new OAuth2Client({
        discoveryEndpoint: DISCOVERY_ENDPOINT,
        clientId: CLIENT_ID,
        redirectUri: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
      });
      await client.discover();

      const body =
        "grant_type=authorization_code" +
        "&client_id=" +
        encodeURIComponent(client.settings.clientId) +
        "&redirect_uri=" +
        encodeURIComponent(client.settings.redirectUri) +
        "&code=" +
        encodeURIComponent(code) +
        "&code_verifier=" +
        encodeURIComponent(codeVerifier);

      const response = await fetch(client.settings.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    }
  }
}

function generateRandomState(length = 16) {
  // Generate a random alphanumeric string for state
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return randomString;
}

export default OIDC;
