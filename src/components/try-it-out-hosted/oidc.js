import { OAuth2Client, generateCodeVerifier } from "@badgateway/oauth2-client";

class OIDC {
  constructor() {
    this.client = new OAuth2Client({
      discoveryEndpoint:
        "https://auth-us.beyondidentity.run/v1/tenants/0001303dc41a7c4d/realms/296201a3b2a7fd0c/applications/870ea8f5-02b7-4850-b67b-534ffcf12b6b/.well-known/openid-configuration",
      clientId: "Q1xIcik7sSY0LRPg6jrQtkRX",
      authenticationMethod: "client_secret_post",
      redirectUri: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
    });
  }

  generateRandomState(length = 16) {
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

  authenticate = async () => {
    const state = encodeURIComponent(this.generateRandomState());
    const codeVerifier = encodeURIComponent(await generateCodeVerifier());

    localStorage.setItem("oidcState", state);
    localStorage.setItem("oidcCodeVerifier", codeVerifier);

    console.log(state, codeVerifier);

    document.location = await this.client.authorizationCode.getAuthorizeUri({
      redirectUri: this.client.settings.redirectUri,
      state: state,
      codeVerifier: codeVerifier,
      scope: ["openid"],
    });
  };

  getToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    window.history.replaceState({}, document.title, window.location.pathname);

    // Ensure code and state are in the URL parameters before proceeding
    if (!urlParams.has("code") || !urlParams.has("state")) {
      console.log("Not ready to call token yet");
      return;
    }

    const storedState = localStorage.getItem("oidcState");
    const codeVerifier = localStorage.getItem("oidcCodeVerifier");

    localStorage.removeItem("oidcState");
    localStorage.removeItem("oidcCodeVerifier");

    const code = urlParams.get("code");
    const returnedState = urlParams.get("state");

    if (storedState !== returnedState) {
      console.log("State does not match");
      return null;
    }

    if (code) {
      await this.client.discover();

      const body =
        "grant_type=authorization_code" +
        "&client_id=" +
        encodeURIComponent(this.client.settings.clientId) +
        "&redirect_uri=" +
        encodeURIComponent(this.client.settings.redirectUri) +
        "&code=" +
        encodeURIComponent(code) +
        "&code_verifier=" +
        encodeURIComponent(codeVerifier);

      const response = await fetch(this.client.settings.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        return null;
      }
    }
  };
}

export default OIDC;
