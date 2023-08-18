import React from "react";
import classNames from "classnames";
import styles from "./PasskeyTable.module.css";
import padding from "../Shared/Padding.module.css";

const PasskeyTable = ({ passkeys, onClick }) => {
  return passkeys.map((passkey, i) => {
    return (
      <div
        key={passkey.id}
        onClick={() => onClick(passkey)}
        className={classNames(styles.passkey, i !== 0 ? padding["mt-1"] : "")}>
        <p>{passkey.identity.username}</p>
        <p>&#187;</p>
      </div>
    )
  });
};

export default PasskeyTable;