import React from "react";
import Modal from "react-modal";
import classNames from "classnames";
import { CodeBlock, dracula } from "react-code-blocks";
import styles from "../styles.module.css";

Modal.setAppElement(document.querySelectorAll("div")[0]);

function afterOpenModal() {
  // Prevent overlay scrolling of background content
  document.body.style.overflow = "hidden";
}

function afterCloseModal() {
  // Re-enable scrolling of background content
  document.body.style.overflow = "unset";
}

const customStyles = {
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
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
};

const CredentialModal = ({ credential, isOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        onAfterClose={afterCloseModal}
        style={customStyles}
        contentLabel="Credential Info Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className={classNames(styles.modal)}>
          <CodeBlock
            text={JSON.stringify(credential, null, 2)}
            language="json"
            showLineNumbers={true}
            startingLineNumber={0}
            theme={dracula}
          />
        </div>
      </Modal>
    </div>
  )
};

export default CredentialModal;