import styles from './styles.module.css';
import React from 'react';
import Layout from '@theme/Layout';
import classNames from 'classnames';

const Register = ({ visible }) => {
  return (
    <div className={classNames(styles["mt-1"], "container", styles.blur)}>
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

export default function TryItOut() {
  return (
    <Layout title="Try It Out" description="Try out Universal Passkeys">
      <Register></Register>
    </Layout>
  );
}
