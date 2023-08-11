import React from "react";
import styles from "./TryItOut.module.css";
import OIDC from "./oidc";
import AuthenticateResult from "../try-it-out-embedded/AuthenticateResult";
import Button from "../try-it-out-embedded/Button";
import classNames from "classnames";
import padding from "../try-it-out-embedded/Padding.module.css";

export default function TryItOut() {
  const oidcClient = new OIDC();
  const [tokenResponse, setTokenResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    oidcClient.getToken().then((tokenResponse) => {
      console.log(tokenResponse);
      setTokenResponse(tokenResponse);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Button
          name={tokenResponse ? "Try Again" : "Continue With Passwordless"}
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={oidcClient.authenticate}
          centered={true}
        ></Button>
      </div>
      {tokenResponse ? (
        <div id="authenticate-result" className={classNames(padding["mt-1"])}>
          <AuthenticateResult {...tokenResponse}></AuthenticateResult>
        </div>
      ) : null}
    </>
  );
}
