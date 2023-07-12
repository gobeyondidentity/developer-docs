import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Button = ({ name, isDisabled, isLoading, form, onClick, centered }) => {
  return <button
    type="submit"
    form={form}
    className={classNames("button", "button--primary", styles.dimensions, centered ? styles.center : "")}
    role="button"
    onClick={onClick}
    disabled={isDisabled || isLoading}>
    {isLoading ? <ClipLoader
      color="#000"
      loading={true}
      size="25px"
      aria-label="Loading Spinner"
      data-testid="loader"
    /> : name}
  </button>;
};

export default Button;