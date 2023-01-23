import React from "react";
import classNames from "classnames";
import styles from "./SelectCredentialTable.module.css";
import padding from "../../css/Padding.module.css";

const SelectCredentialTable = ({ credentials, onClick, onChange, selectedCredentialId }) => {
  return credentials.map((credential, i) => {
    return (
      <div
        key={credential.id}
        onClick={() => onClick(credential)}
        className={classNames(styles["credential-select"], i !== 0 ? padding["mt-1"] : "")}>
        <input
          type="radio"
          id={credential.id}
          name="credential"
          checked={selectedCredentialId == credential.id}
          onChange={onChange}></input>
        <label
          className={classNames(padding["pl-1"])}
          htmlFor={credential.id}>{credential.identity.username}</label>
      </div>
    )
  });
};

export default SelectCredentialTable;