import styles from "./styles.module.css";
import React, { useState } from "react";
import Layout from "@theme/Layout";
import classNames from "classnames";
import AuthenticateResult from "./components/AuthenticateResult";
import Button from "./components/Button";
import CredentialTable from "./components/CredentialTable";
import SelectCredentialTable from "./components/SelectCredentialTable";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { generateRandomStringOfLength, generateCodeChallenge } from "./utils/pkce";
import { getCredentials, bindCredential, authenticate } from "./utils/bi-sdk-js";

const StepOne = ({ progressState, setProgressState }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  var parentClassNames = function () {
    if (progressState.step.one === IN_PROGRESS) {
      return classNames("container");
    }
    return classNames("container", styles.blur);
  }();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    // const rawResponse = await fetch(
    //   `https://acme-cloud.byndid.com/passkey`,
    //   {
    //     body: JSON.stringify({
    //       username: username,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       accept: 'application/json',
    //     },
    //     method: 'POST',
    //   }
    // );
    // let response = await rawResponse.json();
    // if (rawResponse.status !== 200) {
    //   console.log("Show some sort of error. Try Again?");
    // }

    // let result = await bindCredential(response.credential_binding_link);
    // console.log(result);
    setLoading(false);
    setProgressState({
      step: {
        one: COMPLETE,
        two: IN_PROGRESS,
        three: NOT_STARTED,
      }
    });

    // Reset state for next time around
    setUsername("");
    setLoading(false);
  };

  return (
    <div className={parentClassNames}>
      <h1>1. Register a User</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        <form id="passkey_creation" onSubmit={handleSubmit} className={classNames(styles["username-form"])} autoComplete="off">
          <label className={classNames(styles.username)} htmlFor="username">Username:</label>
          <input className={classNames(styles["username-input"])} value={username} type="text" id="username" name="username" onChange={e => setUsername(e.target.value)}></input>
        </form>
      </div>
      <div className={classNames(styles["mt-1"])}>
        <Button
          name="Create Passkey"
          isLoading={loading}
          isDisabled={username.length === 0}
          form="passkey_creation">
        </Button>
      </div>
    </div>
  );
};

const StepTwo = ({ progressState, setProgressState }) => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);

  var parentClassNames = function () {
    if (progressState.step.two === IN_PROGRESS) {
      return classNames("container");
    }
    return classNames("container", styles.blur);
  }();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    const credentials = await getCredentials();
    setCredentials(credentials);
    setCredentialsLoaded(true);
    setLoading(false);
  };

  const handleCredentialClick = async (credential) => {
    console.log(credential);
  };

  const handleNext = () => {
    // Reset state for next time around
    setCredentials(null);
    setLoading(false);
    setCredentialsLoaded(false);
    setProgressState({
      step: {
        one: COMPLETE,
        two: COMPLETE,
        three: IN_PROGRESS,
      }
    });
  };

  return (
    <div className={parentClassNames}>
      <h1>2. See your Passkeys</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {credentials !== null ? <CredentialTable credentials={credentials} onClick={handleCredentialClick}></CredentialTable> : <Button
          name="Show Passkeys"
          isDisabled={false}
          isLoading={loading}
          onClick={handleSubmit}
          centered={true}>
        </Button>}
      </div>
      <div className={classNames(styles["mt-1"])}>
        {credentialsLoaded ? <Button
          name="Next"
          isDisabled={false}
          isLoading={false}
          onClick={handleNext}
        ></Button> : <div></div>}
      </div>
    </div>
  );
};

const StepThree = ({ progressState, setProgressState }) => {
  const [credentials, setCredentials] = useState(null);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [selectedCredentialId, setSelectedCredentialId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null);

  var parentClassNames = function () {
    if (progressState.step.three === IN_PROGRESS) {
      return classNames("container");
    }
    return classNames("container", styles.blur);
  }();

  if (progressState.step.three === IN_PROGRESS && !credentialsLoaded && ExecutionEnvironment.canUseDOM) {
    getCredentials().then((credentials) => {
      setCredentials(credentials);
      setCredentialsLoaded(true);
      if (credentials.length > 0) {
        setSelectedCredentialId(credentials[0].id);
      }
    }, (error) => {
      console.log(error);
    });
  }

  const onClick = async (credential) => {
    const el = document.getElementById(credential.id);
    el.checked = true;
    setSelectedCredentialId(credential.id);
  };

  const onChange = (event) => {
    setSelectedCredentialId(event.target.id);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (selectedCredentialId === null) {
      // Handle this error appropriatley
      console.log("No credential has been selected");
      return;
    }

    const origin = encodeURIComponent((new URL(document.location.href)).origin);
    const state = generateRandomStringOfLength(15);
    const codeVerifier = generateRandomStringOfLength(43);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    console.log(codeVerifier, codeChallenge);
    // const authURL = `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/619a2804-0147-4d72-9fb7-95b38a66c478/authorize?response_type=code&client_id=vs2gorSMyEmhf26lH1U_sDky&redirect_uri=${encodeURIComponent(origin)}&scope=openid&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    // const tokenURL = `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/619a2804-0147-4d72-9fb7-95b38a66c478/token`;
    const authURL = `https://auth-us.beyondidentity.run/v1/tenants/0001303dc41a7c4d/realms/5bacd2585013eaae/applications/62e058fa-da5f-4102-a46c-f97682318357/authorize?response_type=code&client_id=v_cN2Qa4oSFbi7diee5gt5IP&redirect_uri=${origin}&scope=openid&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    const tokenURL = `https://auth-us.beyondidentity.run/v1/tenants/0001303dc41a7c4d/realms/5bacd2585013eaae/applications/62e058fa-da5f-4102-a46c-f97682318357/token`;

    const response = await fetch(authURL);
    let jsonResponse = await response.json();
    if (response.status !== 200 || jsonResponse === null) {
      console.log(jsonResponse);
      return;
    }

    let authenticateResult = await authenticate(jsonResponse.authenticate_url, selectedCredentialId);

    const urlParams = new Proxy(new URLSearchParams(new URL(authenticateResult.redirectURL).search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (urlParams.state !== state) {
      console.log("State does not match");
      return;
    }

    let tokenResponse = await fetch(tokenURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&code=${urlParams.code}&client_id=v_cN2Qa4oSFbi7diee5gt5IP&code_verifier=${codeVerifier}&redirect_uri=${origin}`,
    });

    let jsonTokenResponse = await tokenResponse.json();
    if (tokenResponse.status !== 200 || jsonTokenResponse === null) {
      console.log(jsonTokenResponse);
      return;
    }
    setTokenResponse(jsonTokenResponse);
    setLoading(false);
  };

  const handleTryAgain = () => {
    // Reset state for next time around
    setCredentials(null);
    setCredentialsLoaded(false);
    setSelectedCredentialId(null);
    setLoading(false);
    setTokenResponse(null);

    // Reset state
    setProgressState({
      step: {
        one: IN_PROGRESS,
        two: NOT_STARTED,
        three: NOT_STARTED,
      }
    });

    // Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={parentClassNames}>
      <h1>3. Authenticate with your Passkey</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {credentials !== null ?
          <SelectCredentialTable
            credentials={credentials}
            onClick={onClick}
            onChange={onChange}
            selectedCredentialId={selectedCredentialId}>
          </SelectCredentialTable> : <div></div>}
      </div>
      {tokenResponse === null ?
        <div className={classNames(styles["mt-1"])}>
          <Button
            name="Login"
            isDisabled={false}
            isLoading={loading}
            onClick={handleLogin}>
          </Button>
        </div> : <div></div>
      }
      {tokenResponse !== null ? (
        <div className={classNames(styles["mt-1"])}>
          <Button
            name="Try Again"
            isDisabled={false}
            isLoading={false}
            onClick={handleTryAgain}>
          </Button>
          <div className={classNames(styles["mt-1"])}></div>
          <AuthenticateResult {...tokenResponse}></AuthenticateResult>
        </div>
      ) : (
        <div></div>
      )}
    </div >
  );
};

const NOT_STARTED = "not_started";
const IN_PROGRESS = "in_progress";
const COMPLETE = "complete";

export default function TryItOut() {
  const [progressState, setProgressState] = useState({
    step: {
      one: IN_PROGRESS,
      two: NOT_STARTED,
      three: NOT_STARTED,
    }
  });

  const state = {
    progressState: progressState,
    setProgressState: setProgressState,
  };

  return (
    <Layout title="Try It Out" description="Try out Universal Passkeys">
      <div className={classNames(styles["mt-1"])}></div>
      <StepOne {...state}></StepOne>
      <div className={classNames(styles["mt-3"])}></div>
      <StepTwo {...state}></StepTwo>
      <div className={classNames(styles["mt-3"])}></div>
      <StepThree {...state}></StepThree>
      <div className={classNames(styles["mt-1"])}></div>
    </Layout>
  );
}
