import styles from './styles.module.css';
import React from 'react';
import Layout from '@theme/Layout';
import classNames from 'classnames';

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
  var parentClassNames = function () {
    if (props !== undefined && props.visible !== undefined && props.visible) {
      return classNames("container", styles.blur);
    }
    return classNames("container");
  }();

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
      <button className={classNames("button", "button--lg", styles["mt-1"])} role="button">Create Passkey</button>
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
      <button className={classNames("button", "button--lg", styles["mt-1"])} role="button">Create Passkey</button>
    </div>
  );
};

export default function TryItOut() {
  return (
    <Layout title="Try It Out" description="Try out Universal Passkeys">
      <div className={classNames(styles["mt-1"])}></div>
      <StepOne props={{ visible: false }}></StepOne>
      <div className={classNames(styles["mt-3"])}></div>
      <StepTwo></StepTwo>
      <div className={classNames(styles["mt-3"])}></div>
      <StepThree></StepThree>
      <div className={classNames(styles["mt-1"])}></div>
    </Layout>
  );
}
