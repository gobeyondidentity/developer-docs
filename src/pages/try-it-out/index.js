import styles from './styles.module.css';
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import classNames from 'classnames';
import BeyondIdentityEmbeddedSdk from './BeyondIdentityEmbeddedSdk';

const StepOne = ({ props }) => {
  var parentClassNames = function () {
    if (props.visible) {
      return classNames("container", styles.blur);
    }
    return classNames("container");
  }();

  return (
    <div className={parentClassNames}>
      <h1>1. Register a User</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        <form className={classNames(styles["username-form"])} autoComplete="off">
          <label className={classNames(styles.username)} htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"></input>
        </form>
      </div>
      <button className={classNames("button", "button--lg", styles["mt-1"])} role="button">Create Passkey</button>
    </div>
  );
};

const StepTwo = ({ props }) => {
  const [credentials, setCredentials] = useState([]);

  var parentClassNames = function () {
    if (props !== undefined && props.visible !== undefined && props.visible) {
      return classNames("container", styles.blur);
    }
    return classNames("container");
  }();

  useEffect(async () => {
    let credentials = await (await props.embedded.initialized()).getCredentials();
    setCredentials(credentials);
    console.log(credentials);
  }, []);

  return (
    <div className={parentClassNames}>
      <h1>2. See your Passkeys</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        <form className={classNames(styles["username-form"])} autoComplete="off">
          <label className={classNames(styles.username)} htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"></input>
        </form>
      </div>
      <button className={classNames("button", "button--lg", styles["mt-1"])} role="button">Show Passkeys</button>
    </div>
  );
};

const StepThree = ({ props }) => {
  var parentClassNames = function () {
    if (props !== undefined && props.visible !== undefined && props.visible) {
      return classNames("container", styles.blur);
    }
    return classNames("container");
  }();

  return (
    <div className={parentClassNames}>
      <h1>3. Authenticate with your Passkeys</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna. Donec massa sapien faucibus et molestie ac. Est velit egestas dui id ornare arcu odio. Ut lectus arcu bibendum at. Amet aliquam id diam maecenas.</p>
      <div className={classNames(styles["step-input"], "container")}>
        <form className={classNames(styles["username-form"])} autoComplete="off">
          <label className={classNames(styles.username)} htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"></input>
        </form>
      </div>
      <button className={classNames("button", "button--lg", styles["mt-1"])} role="button">Log In</button>
    </div>
  );
};

export default function TryItOut() {
  let embedded = new BeyondIdentityEmbeddedSdk();
  return (
    <Layout title="Try It Out" description="Try out Universal Passkeys">
      <div className={classNames(styles["mt-1"])}></div>
      <StepOne props={{ visible: false, embedded: embedded}}></StepOne>
      <div className={classNames(styles["mt-3"])}></div>
      <StepTwo  props={{ visible: false, embedded: embedded}}></StepTwo>
      <div className={classNames(styles["mt-3"])}></div>
      <StepThree props={{ visible: false, embedded: embedded}}></StepThree>
      <div className={classNames(styles["mt-1"])}></div>
    </Layout>
  );
}
