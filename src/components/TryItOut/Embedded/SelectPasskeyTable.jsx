import React from "react";
import classNames from "classnames";
import styles from "./SelectPasskeyTable.module.css";
import padding from "../Shared/Padding.module.css";

const SelectPasskeyTable = ({ passkeys, onClick, onChange, selectedPasskeyId }) => {
  return passkeys.map((passkey, i) => {
    return (
      <div
        key={passkey.id}
        onClick={() => onClick(passkey)}
        className={classNames(styles["passkey-select"], i !== 0 ? padding["mt-1"] : "")}>
        <input
          type="radio"
          id={passkey.id}
          name="passkey"
          checked={selectedPasskeyId == passkey.id}
          onChange={onChange}></input>
        <label
          className={classNames(padding["pl-1"])}
          htmlFor={passkey.id}>{passkey.identity.username}</label>
      </div>
    )
  });
};

export default SelectPasskeyTable;