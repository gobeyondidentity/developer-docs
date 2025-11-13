import styles from "./TryItOut.module.css";
import padding from "../Shared/Padding.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import AuthenticateResult from "../Shared/AuthenticateResult";
import Button from "../Shared/Button";
import PasskeyTable from "./PasskeyTable";
import SelectPasskeyTable from "./SelectPasskeyTable";
import PasskeyModal from "./PasskeyModal";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { generateRandomStringOfLength, generateCodeChallenge } from "../../../utils/pkce";
import { getPasskeys, bindPasskey, authenticate, deletePasskey, authenticateOtp, redeemOtp } from "../../../utils/bi-sdk-js";
import { getOffsetForElementById } from "../../../utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const StepOne = ({ progressState, setProgressState }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [bindingUrl, setBindingUrl] = useState("");
  const [authenticateUrl, setAuthenticateUrl] = useState("");

  var parentClassNames = function () {
    if (progressState.step.one === IN_PROGRESS || progressState.step.one === COMPLETE) {
      return classNames();
    }
    return classNames(styles.blur);
  }();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Step 1: Call backend to validate email and get credential_binding_link
    const rawResponse = await fetch(
      `https://acme-cloud.byndid.com/passkey`,
      {
        body: JSON.stringify({
          username: email,
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

    // Step 2: Get authenticate_url from /authorize endpoint
    const origin = encodeURIComponent((new URL(document.location.href)).origin);
    const state = generateRandomStringOfLength(15);
    const codeVerifier = generateRandomStringOfLength(43);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authURL = `https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/b464b5a49669c5e0/applications/619a2804-0147-4d72-9fb7-95b38a66c478/authorize?response_type=code&client_id=vs2gorSMyEmhf26lH1U_sDky&redirect_uri=${origin}&scope=openid&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    const authResponse = await fetch(authURL);
    let authJsonResponse = await authResponse.json();
    if (authResponse.status !== 200 || authJsonResponse === null) {
      console.error(authJsonResponse);
      toast.error("Failed to initiate authentication. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Step 3: Call authenticateOtp to send OTP to email
      const otpResponse = await authenticateOtp(authJsonResponse.authenticate_url, email);
      setBindingUrl(response.credential_binding_link);
      setAuthenticateUrl(otpResponse.url); // Use the URL from OtpChallengeResponse
      setOtpSent(true);
      setLoading(false);
      toast.success("OTP sent to your email!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (otp.length !== 6) {
      toast.error("OTP must be 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Redeem OTP using the URL from authenticateOtp response
      await redeemOtp(authenticateUrl, otp);

      // Now bind the passkey using credential_binding_link
      await bindPasskey(bindingUrl);
      window.postMessage("update-passkeys", "*");
      setLoading(false);
      setProgressState(nextProgressState(progressState, STEP_ONE, STEP_TWO));

      // Reset state for next time around
      setEmail("");
      setOtp("");
      setOtpSent(false);
      setBindingUrl("");
      setAuthenticateUrl("");
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
      toast.error("Failed to verify OTP or create passkey. Please try again.");
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const otpResponse = await authenticateOtp(authenticateUrl, email);
      setAuthenticateUrl(otpResponse.url); // Update with new URL from response
      toast.success("OTP resent to your email!");
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to resend OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={parentClassNames}>
      <h2>1. Register a User</h2>
      <p>Enter an email to create a passkey on this browser. Our Universal Passkeys work on any browser, even the ones where passkeys are not officially supported.</p>
      <br />
      <div className={classNames(styles["step-input"], "container")}>
        {!otpSent ? (
          <form id="passkey_creation" onSubmit={handleSubmit} className={classNames(styles["username-form"])} autoComplete="off" autoCapitalize="none">
            <label className={classNames(styles.username)} htmlFor="email">Email:</label>
            <input className={classNames(styles["username-input"])} value={email} type="email" id="email" name="email" onChange={e => setEmail(e.target.value)}></input>
          </form>
        ) : (
          <form id="otp_verification" onSubmit={handleOtpVerification} className={classNames(styles["username-form"])} autoComplete="off">
            <label className={classNames(styles.username)} htmlFor="otp">Enter OTP:</label>
            <input
              className={classNames(styles["username-input"])}
              value={otp}
              type="text"
              id="otp"
              name="otp"
              maxLength="6"
              onChange={e => setOtp(e.target.value)}
              placeholder="6-character code">
            </input>
          </form>
        )}
      </div>
      <div>
        <br />
        {!otpSent ? (
          <Button
            name="Send OTP"
            isLoading={loading}
            isDisabled={email.length === 0}
            form="passkey_creation">
          </Button>
        ) : (
          <div>
            <Button
              name="Verify OTP"
              isLoading={loading}
              isDisabled={otp.length !== 6}
              form="otp_verification">
            </Button>
            <br />
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              style={{
                marginTop: '10px',
                background: 'none',
                border: 'none',
                color: '#0066cc',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}>
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StepTwo = ({ progressState, setProgressState }) => {
  const [passkeys, setPasskeys] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passkeysLoaded, setPasskeysLoaded] = useState(false);
  const [selectedPasskey, setSelectedPasskey] = useState(null);

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
      const passkeys = await getPasskeys();
      setPasskeys(passkeys);
      setPasskeysLoaded(true);
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to get passkeys. Please try again.");
      setLoading(false);
    }
  };

  const handlePasskeyClick = async (passkey) => {
    setSelectedPasskey(passkey);
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
    setSelectedPasskey(null);
  };

  const onDelete = async () => {
    if (confirm(`Are you sure you want to delete this passkey?`)) {
      try {
        await deletePasskey(selectedPasskey.id);
        setSelectedPasskey(null);
        window.postMessage("update-passkeys", "*");
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
      if (event.data === "update-passkeys") {
        try {
          // Only update if passkeys have already been loaded.
          // This account for the case where the user is going back
          // through the steps a second time.
          if (!passkeysLoaded) {
            return;
          }
          const passkeys = await getPasskeys();

          // If there are still passkeys remaining, update
          // the state and return
          if (passkeys.length > 0) {
            setPasskeys(passkeys);
            setPasskeysLoaded(true);
            return;
          }

          // Otherwise, reset the state
          setPasskeys(null);
          setLoading(false);
          setPasskeysLoaded(false);
          setSelectedPasskey(null);

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
      <h2>2. See your passkeys</h2>
      <p>See all the passkeys you've created on this browser. If you've gone through this demo before, you'll see passkeys for all the usernames you've registered in the first step.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {passkeys !== null ? <PasskeyTable passkeys={passkeys} onClick={handlePasskeyClick}></PasskeyTable> : <Button
          name="Show passkeys"
          isDisabled={false}
          isLoading={loading}
          onClick={handleSubmit}
          centered={true}>
        </Button>}
      </div>
      <div className={classNames(padding["mt-1"])}>
        {passkeysLoaded ? <Button
          name="Next"
          isDisabled={false}
          isLoading={false}
          onClick={handleNext}
        ></Button> : <div></div>}
      </div>
      <PasskeyModal
        passkey={selectedPasskey}
        isOpen={selectedPasskey !== null}
        closeModal={closeModal}
        onDelete={onDelete}>
      </PasskeyModal>
    </div>
  );
};



const StepThree = ({ progressState, setProgressState }) => {
  const [passkeys, setPasskeys] = useState(null);
  const [passkeysLoaded, setPasskeysLoaded] = useState(false);
  const [selectedPasskeyId, setSelectedPasskeyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null);
  const [customClaims, setCustomClaims] = useState("");
  const [customClaimsError, setCustomClaimsError] = useState(null);
  const [authMethod, setAuthMethod] = useState("passkey");
  const [authOtpSent, setAuthOtpSent] = useState(false);
  const [authOtp, setAuthOtp] = useState("");
  const [authenticateUrlForOtp, setAuthenticateUrlForOtp] = useState("");

  var parentClassNames = function () {
    if (progressState.step.three === IN_PROGRESS || progressState.step.three === COMPLETE) {
      return classNames("container");
    }
    return classNames("container", styles.blur);
  }();

  if (progressState.step.three === IN_PROGRESS && !passkeysLoaded && ExecutionEnvironment.canUseDOM) {
    getPasskeys().then((passkeys) => {
      setPasskeys(passkeys);
      setPasskeysLoaded(true);
      if (passkeys.length > 0) {
        setSelectedPasskeyId(passkeys[0].id);
      }
    }, (error) => {
      console.error(error);
      toast.error("Failed to get passkeys. Please refresh the page and try again.");
    });
  }

  const onClick = async (passkey) => {
    const el = document.getElementById(passkey.id);
    el.checked = true;
    setSelectedPasskeyId(passkey.id);
  };

  const onChange = (event) => {
    setSelectedPasskeyId(event.target.id);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (selectedPasskeyId === null) {
      toast.error("No passkey has been selected. Please select a passkey and try again.");
      setLoading(false);
      return;
    }
    // Validate optional custom claims JSON
    let customClaimsParam = null;
    if (customClaims && customClaims.trim().length > 0) {
      try {
        JSON.parse(customClaims);
        customClaimsParam = encodeURIComponent(customClaims);
        setCustomClaimsError(null);
      } catch (e) {
        setCustomClaimsError("Invalid JSON for custom claims.");
        toast.error("Custom claims JSON is invalid. Please fix it and try again.");
        setLoading(false);
        return;
      }
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

    // If OTP method is selected, send OTP first
    if (authMethod === "passkey-otp") {
      try {
        const selectedPasskey = passkeys.find(p => p.id === selectedPasskeyId);
        const email = selectedPasskey.identity.username;

        const otpResponse = await authenticateOtp(jsonResponse.authenticate_url, email);
        setAuthenticateUrlForOtp(otpResponse.url); // Use URL from OtpChallengeResponse
        setAuthOtpSent(true);
        setLoading(false);
        toast.success("OTP sent to your email!");

        // Store the state and other params for later use
        window.tempAuthState = { state, codeVerifier, tokenURL, origin, customClaimsParam };
      } catch (e) {
        console.error(e);
        toast.error("Failed to send OTP. Please try again.");
        setLoading(false);
      }
      return;
    }

    // Regular passkey-only authentication
    try {
      let authenticateResult = await authenticate(jsonResponse.authenticate_url, selectedPasskeyId);

      const urlParams = new Proxy(new URLSearchParams(new URL(authenticateResult.redirectUrl).search), {
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
        body: (function () {
          let base = `grant_type=authorization_code&code=${urlParams.code}&client_id=vs2gorSMyEmhf26lH1U_sDky&code_verifier=${codeVerifier}&redirect_uri=${origin}`;
          if (customClaimsParam) {
            base += `&custom_claims=${customClaimsParam}`;
          }
          return base;
        })(),
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

  const handleOtpAuthentication = async () => {
    setLoading(true);

    if (authOtp.length !== 6) {
      toast.error("OTP must be 6 characters");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Redeem OTP
      await redeemOtp(authenticateUrlForOtp, authOtp);

      // Step 2: Make a NEW /authorize call to get a fresh authenticate_url for passkey authentication
      const { origin, customClaimsParam } = window.tempAuthState;
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

      // Step 3: Now authenticate with the passkey using the new authenticate_url
      let authenticateResult = await authenticate(jsonResponse.authenticate_url, selectedPasskeyId);

      const urlParams = new Proxy(new URLSearchParams(new URL(authenticateResult.redirectUrl).search), {
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
        body: (function () {
          let base = `grant_type=authorization_code&code=${urlParams.code}&client_id=vs2gorSMyEmhf26lH1U_sDky&code_verifier=${codeVerifier}&redirect_uri=${origin}`;
          if (customClaimsParam) {
            base += `&custom_claims=${customClaimsParam}`;
          }
          return base;
        })(),
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

      // Reset OTP state
      setAuthOtp("");
      setAuthOtpSent(false);
      setAuthenticateUrlForOtp("");
      delete window.tempAuthState;

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
      toast.error("Failed to verify OTP or authenticate. Please try again.");
      setLoading(false);
    }
  };

  const handleResendAuthOtp = async () => {
    setLoading(true);
    try {
      const selectedPasskey = passkeys.find(p => p.id === selectedPasskeyId);
      const email = selectedPasskey.identity.username;
      const otpResponse = await authenticateOtp(authenticateUrlForOtp, email);
      setAuthenticateUrlForOtp(otpResponse.url); // Update with new URL from response
      toast.success("OTP resent to your email!");
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to resend OTP. Please try again.");
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
      if (event.data === "update-passkeys") {
        try {
          // Only update if passkeys have already been loaded.
          // This account for the case where the user is going back
          // through the steps a second time.
          if (!passkeysLoaded) {
            return;
          }
          const passkeys = await getPasskeys();

          if (passkeys.length > 0) {
            setPasskeys(passkeys);
            setPasskeysLoaded(true);
            const passkeyIsSelected = passkeys.find(p => p.id === selectedPasskeyId);
            if (!passkeyIsSelected) {
              setSelectedPasskeyId(passkeys[0].id);
            }
            return;
          }

          setPasskeys(null);
          setSelectedPasskeyId(null);
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
      <h2>3. Authenticate with your passkey</h2>
      <p>Select a passkey to authenticate with. This flow will take you through a fully compliant OIDC authentication flow without leaving the page that you're on.</p>
      <div className={classNames(styles["step-input"], "container")}>
        {passkeys !== null ?
          <SelectPasskeyTable
            passkeys={passkeys}
            onClick={onClick}
            onChange={onChange}
            selectedPasskeyId={selectedPasskeyId}>
          </SelectPasskeyTable> : <Button
            name="Register a User"
            isDisabled={false}
            isLoading={false}
            onClick={handleTryAgain}
            centered={true}>
          </Button>}
      </div>
      {passkeys !== null && !authOtpSent ? (
        <div className={classNames(padding["mt-1"])}>
          <div className={classNames(styles["step-input"], "container")}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Authentication Method:</label>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="authMethod"
                  value="passkey"
                  checked={authMethod === "passkey"}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                Passkey only
              </label>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="authMethod"
                  value="passkey-otp"
                  checked={authMethod === "passkey-otp"}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                Passkey + OTP
              </label>
            </div>
          </div>
        </div>
      ) : null}
      {authOtpSent ? (
        <div className={classNames(padding["mt-1"])}>
          <div className={classNames(styles["step-input"], "container")}>
            <label htmlFor="auth-otp">Enter OTP:</label>
            <input
              type="text"
              id="auth-otp"
              value={authOtp}
              onChange={(e) => setAuthOtp(e.target.value)}
              maxLength="6"
              placeholder="6-character code"
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <Button
              name="Verify OTP & Authenticate"
              isLoading={loading}
              isDisabled={authOtp.length !== 6}
              onClick={handleOtpAuthentication}>
            </Button>
            <br />
            <button
              type="button"
              onClick={handleResendAuthOtp}
              disabled={loading}
              style={{
                marginTop: '10px',
                background: 'none',
                border: 'none',
                color: '#0066cc',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}>
              Resend OTP
            </button>
          </div>
        </div>
      ) : null}
      <div className={classNames(padding["mt-1"]) }>
        <div className={classNames(styles["step-input"], "container")}>
          <label htmlFor="custom-claims">Optional: Custom Claims (JSON)</label>
          <textarea
            id="custom-claims"
            value={customClaims}
            onChange={(e) => {
              setCustomClaims(e.target.value);
              if (customClaimsError) {
                setCustomClaimsError(null);
              }
            }}
            rows={4}
            style={{ width: "100%" }}
            placeholder='{"claim_a": "value_a", "values": ["Alice", "Bob"]}'>
          </textarea>
          {customClaimsError ? (
            <small style={{ color: "#e74c3c" }}>{customClaimsError}</small>
          ) : null}
        </div>
      </div>
      <div className={classNames(padding["mt-1"]) }>
        {passkeys !== null && !authOtpSent ? <Button
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
