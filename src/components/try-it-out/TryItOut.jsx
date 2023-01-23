import styles from "./TryItOut.module.css";
import padding from "../../css/Padding.module.css";
import React, { useState } from "react";
import Layout from "@theme/Layout";
import classNames from "classnames";
import AuthenticateResult from "./AuthenticateResult";
import Button from "./Button";
import CredentialTable from "./CredentialTable";
import SelectCredentialTable from "./SelectCredentialTable";
import CredentialModal from "./CredentialModal";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { generateRandomStringOfLength, generateCodeChallenge } from "../../utils/pkce";
import { getCredentials, bindCredential, authenticate, deleteCredential } from "../../utils/bi-sdk-js";
import { getOffsetForElementById } from "../../utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepOne = ({ progressState, setProgressState }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  var parentClassNames = function () {
    if (progressState.step.one === IN_PROGRESS || progressState.step.one === COMPLETE) {
      return classNames();
    }
    return classNames(styles.blur);
  }();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    if (username.match(/\s/)) {
      toast.error("Username cannot contain spaces");
      setLoading(false);
      return;
    }

    const rawResponse = await fetch(
      `https://acme-cloud.byndid.com/passkey`,
      {
        body: JSON.stringify({
          username: username,
        }),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        method: 'POST',
      }
    );
    let response = await rawResponse.json();
    if (rawResponse.status !== 200) {
      toast.error("Failed to generate a passkey. Please try again.");
      setLoading(false);
      return;
    }

    try {
      await bindCredential(response.credential_binding_link);
      window.postMessage("update-credentials", "*");
      setLoading(false);
      setProgressState(nextProgressState(progressState, STEP_ONE, STEP_TWO));

      // Reset state for next time around
      setUsername("");
      setLoading(false);

      // Scroll to Step Two
      const offset = getOffsetForElementById("step-two");
      setTimeout(() => {
        window.scrollTo({
          top: offset.top,
          left: offset.left,
          behavior: 'smooth'
        });
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to create a passkey. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={parentClassNames}>
      <div className={classNames(padding["mt-1"], padding["mb-1"])}>
        <p>Explore what's possible using the Beyond Identity platform before having to write any code.</p>
        <p>The three steps below allow you to:</p>
        <ol>
          <li><strong>Register a new user:</strong> We help developers manage user accounts and associate passkeys with each.</li>
          <li><strong>See your passkeys:</strong> To help developers and users identify which passkeys are available on any given device, we create a record on each browser of passkeys that are available for users to authenticate with.</li>
          <li><strong>Authenticate with your passkey:</strong> In this step, you can try authentication from the user's standpoint and experience yourself how easy it is to use passkeys.</li>
        </ol>
      </div>
      <h1>1. Register a User</h1>
      <p>Enter a username to create a passkey on this browser. Our Universal Passkeys work on any browser, even the ones where passkeys are not officially supported.</p>
      <div className={classNames(styles["step-input"], "container")}>
        <form id="passkey_creation" onSubmit={handleSubmit} className={classNames(styles["username-form"])} autoComplete="off" autoCapitalize="none">
          <label className={classNames(styles.username)} htmlFor="username">Username:</label>
          <input className={classNames(styles["username-input"])} value={username} type="text" id="username" name="username" onChange={e => setUsername(e.target.value)}></input>
        </form>
      </div>
      <div className={classNames(padding["mt-1"])}>
        <Button
          name="Create passkey"
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
  const [selectedCredential, setSelectedCredential] = useState(null);

  var parentClassNames = function () {
    if (progressState.step.two === IN_PROGRESS || progressState.step.two === COMPLETE) {
      return classNames("container");
    }
    return classNames("container", styles.blur);
  }();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {
      const credentials = await getCredentials();
      setCredentials(credentials);
      setCredentialsLoaded(true);
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to get passkeys. Please try again.");
      setLoading(false);
    }
  };

  const handleCredentialClick = async (credential) => {
    setSelectedCredential(credential);
  };

  const handleNext = () => {
    // Reset state for next time around
    setLoading(false);
    setProgressState(nextProgressState(progressState, STEP_TWO, STEP_THREE));

    // Scroll to Step Three
    const offset = getOffsetForElementById("step-three");
    setTimeout(() => {
      window.scrollTo({
        top: offset.top,
        left: offset.left,
        behavior: 'smooth'
      });
    });
  };

  const closeModal = () => {
    setSelectedCredential(null);
  };

  const onDelete = async () => {
    if (confirm(`Are you sure you want to delete this passkey?`)) {
      try {
        await deleteCredential(selectedCredential.id);
        setSelectedCredential(null);
        window.postMessage("update-credentials", "*");
      } catch (e) {
        console.error(e);
        toast.error("Failed to delete passkey. Please try again.");
        setLoading(false);
        return;
      }
    }
  }

  if (ExecutionEnvironment.canUseDOM) {
    window.addEventListener("message", async (event) => {
      if (event.data === "update-credentials") {
        try {
          // Only update if credentials have already been loaded.
          // This account for the case where the user is going back
          // through the steps a second time.
          if (!credentialsLoaded) {
            return;
          }
          const credentials = await getCredentials();

          // If there are still credentials remaining, update
          // the state and return
          if (credentials.length > 0) {
            setCredentials(credentials);
            setCredentialsLoaded(true);
            return;
          }

          // Otherwise, reset the state
          setCredentials(null);
          setLoading(false);
          setCredentialsLoaded(false);
          setSelectedCredential(null);

          setTimeout(() => {
            // And scroll back to Step One
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          });
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong. Please refresh the page and try again.");
          setLoading(false);
        }
      } else {
        console.log("Unknown event data received:", event.data);
      }
    });
  }

  return (
    <div className={parentClassNames}>
      <h1>2. See your passkeys</h1>
      <p>See all the passkeys you've created on this browser. If you've gone through this demo before, you'll see passkeys for all the usernames you've registered in the first step.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {credentials !== null ? <CredentialTable credentials={credentials} onClick={handleCredentialClick}></CredentialTable> : <Button
          name="Show passkeys"
          isDisabled={false}
          isLoading={loading}
          onClick={handleSubmit}
          centered={true}>
        </Button>}
      </div>
      <div className={classNames(padding["mt-1"])}>
        {credentialsLoaded ? <Button
          name="Next"
          isDisabled={false}
          isLoading={false}
          onClick={handleNext}
        ></Button> : <div></div>}
      </div>
      <CredentialModal
        credential={selectedCredential}
        isOpen={selectedCredential !== null}
        closeModal={closeModal}
        onDelete={onDelete}>
      </CredentialModal>
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
    if (progressState.step.three === IN_PROGRESS || progressState.step.three === COMPLETE) {
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
      console.error(error);
      toast.error("Failed to get credentials. Please refresh the page and try again.");
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
      toast.error("No credential has been selected. Please select a credential and try again.");
      setLoading(false);
      return;
    }

    const origin = encodeURIComponent((new URL(document.location.href)).origin);
    const state = generateRandomStringOfLength(15);
    const codeVerifier = generateRandomStringOfLength(43);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authURL = `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/619a2804-0147-4d72-9fb7-95b38a66c478/authorize?response_type=code&client_id=vs2gorSMyEmhf26lH1U_sDky&redirect_uri=${origin}&scope=openid&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    const tokenURL = `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/619a2804-0147-4d72-9fb7-95b38a66c478/token`;

    const response = await fetch(authURL);
    let jsonResponse = await response.json();
    if (response.status !== 200 || jsonResponse === null) {
      console.error(jsonResponse);
      toast.error("Failed to authenticate. Please try again.");
      setLoading(false);
      return;
    }

    try {
      let authenticateResult = await authenticate(jsonResponse.authenticate_url, selectedCredentialId);

      const urlParams = new Proxy(new URLSearchParams(new URL(authenticateResult.redirectURL).search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      if (urlParams.state !== state) {
        console.error(`State mismatch. Incoming state: ${urlParams.state} does not match outgoing state: ${state}.`);
        toast.error("State does not match. Please try again.");
        setLoading(false);
        return;
      }

      let tokenResponse = await fetch(tokenURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&code=${urlParams.code}&client_id=vs2gorSMyEmhf26lH1U_sDky&code_verifier=${codeVerifier}&redirect_uri=${origin}`,
      });

      let jsonTokenResponse = await tokenResponse.json();
      if (tokenResponse.status !== 200 || jsonTokenResponse === null) {
        console.error(jsonTokenResponse);
        toast.error("Failed to get token. Please try again.");
        setLoading(false);
        return;
      }
      setTokenResponse(jsonTokenResponse);
      setLoading(false);

      // Scroll to Authenticate Result
      const offset = getOffsetForElementById("authenticate-result");
      setTimeout(() => {
        window.scrollTo({
          top: offset.top,
          left: offset.left,
          behavior: 'smooth'
        });
      });

    } catch (e) {
      console.error(e);
      toast.error("Failed to authenticate. Please try again.");
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setTimeout(() => {
      // Scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  };

  if (ExecutionEnvironment.canUseDOM) {
    window.addEventListener("message", async (event) => {
      if (event.data === "update-credentials") {
        try {
          // Only update if credentials have already been loaded.
          // This account for the case where the user is going back
          // through the steps a second time.
          if (!credentialsLoaded) {
            return;
          }
          const credentials = await getCredentials();

          if (credentials.length > 0) {
            setCredentials(credentials);
            setCredentialsLoaded(true);
            const credentialIsSelected = credentials.find(c => c.id === selectedCredentialId);
            if (!credentialIsSelected) {
              setSelectedCredentialId(credentials[0].id);
            }
            return;
          }

          setCredentials(null);
          setSelectedCredentialId(null);
          setTokenResponse(null);
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong. Please refresh the page and try again.");
          setLoading(false);
        }
      } else {
        console.log("Unknown event data received:", event.data);
      }
    });
  }

  return (
    <div className={parentClassNames}>
      <h1>3. Authenticate with your passkey</h1>
      <p>Select a passkey to authenticate with. This flow will take you through a fully compliant OIDC authentication flow without leaving the page that you're on.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {credentials !== null ?
          <SelectCredentialTable
            credentials={credentials}
            onClick={onClick}
            onChange={onChange}
            selectedCredentialId={selectedCredentialId}>
          </SelectCredentialTable> : <Button
            name="Register a User"
            isDisabled={false}
            isLoading={false}
            onClick={handleTryAgain}
            centered={true}>
          </Button>}
      </div>
      <div className={classNames(padding["mt-1"])}>
        {credentials !== null ? <Button
          name="Login"
          isDisabled={false}
          isLoading={loading}
          onClick={handleLogin}>
        </Button> : <div></div>}
      </div>
      {tokenResponse !== null ? (
        <div id="authenticate-result" className={classNames(padding["mt-1"])}>
          <AuthenticateResult {...tokenResponse}></AuthenticateResult>
          <div className={classNames(padding["mt-1"])}>
            <Button
              name="Try Again"
              isDisabled={false}
              isLoading={false}
              onClick={handleTryAgain}
              centered={true}>
            </Button>
          </div>
          <div className={classNames(padding["mt-1"], padding["mb-1"])}>
            <h1>What's Next?</h1>
            <p>Ready to start implementing passkeys in your application? Check out our <a href="/docs/v1/getting-started">getting started guide</a>.</p>
          </div>
          <div className={classNames(padding["mt-1"])}></div>
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

const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;

function nextProgressState(progressState, currentStep, nextStep) {
  // Helper function to determine legal state transitions
  const nextStepHelper = function (step) {
    switch (step) {
      case NOT_STARTED:
        return IN_PROGRESS;
      case IN_PROGRESS:
        return COMPLETE;
      case COMPLETE:
        return COMPLETE;
      default:
        return NOT_STARTED;
    }
  };

  // Step progression is not allowed to go backwards and
  // cannot stay the same.
  if (nextStep <= currentStep) {
    return progressState;
  }

  // Steps cannot be skipped
  if (nextStep - currentStep > 1) {
    return progressState;
  }

  if (currentStep === STEP_ONE && nextStep === STEP_TWO) {
    const nextStepOne = nextStepHelper(progressState.step.one);
    const nextStepTwo = nextStepHelper(progressState.step.two);
    const nextStepThree = progressState.step.three;
    return {
      step: {
        one: nextStepOne,
        two: nextStepTwo,
        three: nextStepThree,
      }
    };
  } else if (currentStep === STEP_TWO && nextStep === STEP_THREE) {
    const nextStepOne = nextStepHelper(progressState.step.one);
    const nextStepTwo = nextStepHelper(progressState.step.two);
    const nextStepThree = nextStepHelper(progressState.step.three);
    return {
      step: {
        one: nextStepOne,
        two: nextStepTwo,
        three: nextStepThree,
      }
    };
  } else {
    return progressState;
  }
}

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
    <div id="try-it-out">
      <div id="step-one" className={classNames(padding["mt-1"])}>
        <StepOne {...state}></StepOne>
      </div>
      <div id="step-two" className={classNames(padding["mt-3"])}>
        <StepTwo {...state}></StepTwo>
      </div>
      <div id="step-three" className={classNames(padding["mt-3"])}>
        <StepThree {...state}></StepThree>
      </div>
      <div className={classNames(padding["mt-1"])}></div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        closeButton={false}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored" />
    </div>
  );
}
