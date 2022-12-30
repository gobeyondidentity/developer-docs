import React, { useState } from "react";
import Modal from "react-modal";
import classNames from "classnames";
import { CodeBlock, dracula } from "react-code-blocks";
import styles from "../styles.module.css";

const DARK_MODE_OVERYLAY_BACKGROUND_COLOR = "rgba(0, 0, 0, 0.75)";
const LIGHT_MODE_OVERLAY_BACKGROUND_COLOR = "rgba(1, 1, 1, 0.3)";
const DARK_MODE_THEME = dracula;
const LIGHT_MODE_THEME = null;

Modal.setAppElement(document.querySelectorAll("div")[0]);

function afterOpenModal() {
  // Prevent overlay scrolling of background content
  document.body.style.overflow = "hidden";
}

function afterCloseModal() {
  // Re-enable scrolling of background content
  document.body.style.overflow = "unset";
}

const CredentialModal = ({ credential, isOpen, closeModal }) => {
  const [theme, setTheme] = useState(function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_MODE_THEME;
    } else {
      return LIGHT_MODE_THEME;
    }
  }());

  const [overlayBackgroundcolor, setOverlayBackgroundColor] = useState(function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_MODE_OVERYLAY_BACKGROUND_COLOR;
    } else {
      return LIGHT_MODE_OVERLAY_BACKGROUND_COLOR;
    }
  }());

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
      if (event.matches) {
        //dark mode
        setTheme(DARK_MODE_THEME);
        setOverlayBackgroundColor(DARK_MODE_OVERYLAY_BACKGROUND_COLOR);
      } else {
        //light mode
        setTheme(LIGHT_MODE_THEME);
        setOverlayBackgroundColor(LIGHT_MODE_OVERLAY_BACKGROUND_COLOR);
      }
    });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        onAfterClose={afterCloseModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderStyle: "none",
          },
          overlay: {
            backgroundColor: overlayBackgroundcolor
          },
        }}
        contentLabel="Credential Info Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {credential !== null ?
          <div className={classNames(styles["modal-header"], styles["mb-1"])}>
            <h2 className={classNames(styles["ml-1"])}>{credential.identity.username}</h2>
            <div onClick={closeModal} style={{ cursor: "pointer" }}>
              <h2 className={classNames(styles["mr-1"])}>&#10005;</h2>
            </div>
          </div>
          : <div></div>
        }
        <div className={classNames(styles.modal)}>
          <CodeBlock
            text={JSON.stringify(credential, null, 2)}
            language="json"
            showLineNumbers={true}
            startingLineNumber={0}
            theme={theme}
          />
        </div>
      </Modal>
    </div>
  )
};

export default CredentialModal;