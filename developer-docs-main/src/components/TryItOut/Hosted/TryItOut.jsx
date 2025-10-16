import React from "react";
import styles from "./TryItOut.module.css";
import OIDC from "./oidc";
import AuthenticateResult from "../Shared/AuthenticateResult";
import Button from "../Shared/Button";
import classNames from "classnames";
import padding from "../Shared/Padding.module.css";
import { getOffsetForElementById } from "../../../utils/helpers";

export default function TryItOut() {
  const [tokenResponse, setTokenResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    OIDC.getToken().then((tokenResponse) => {
      setTokenResponse(tokenResponse);
      setIsLoading(false);
      const offset = getOffsetForElementById("authenticate-result");
      setTimeout(() => {
        window.scrollTo({
          top: offset.top,
          left: offset.left,
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <>
      {tokenResponse ? (
        <div id="authenticate-result" className={classNames(padding["mt-1"])}>
          <AuthenticateResult {...tokenResponse}></AuthenticateResult>
        </div>
      ) : null}
      <Button
        name={tokenResponse ? "Try Again" : "Try Hosted Web Authenticator"}
        isDisabled={isLoading}
        isLoading={isLoading}
        onClick={OIDC.authenticate}
        centered={false}
      ></Button>
      {tokenResponse ? (
        <p className={classNames(padding["mt-1"])}>
          <b>
            Try again to authenticate using the passkey you created (if you
            created one).
          </b>
        </p>
      ) : null}
    </>
  );
}
