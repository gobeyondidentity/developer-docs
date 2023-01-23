import React from "react";
import classNames from "classnames";
import styles from "./CredentialTable.module.css";
import padding from "../../css/Padding.module.css";

const CredentialTable = ({ credentials, onClick }) => {
  return credentials.map((credential, i) => {
    return (
      <div
        key={credential.id}
        onClick={() => onClick(credential)}
        className={classNames(styles.credential, i !== 0 ? padding["mt-1"] : "")}>
        <p>{credential.identity.username}</p>
        <p>&#187;</p>
      </div>
    )
  });
};

export default CredentialTable;