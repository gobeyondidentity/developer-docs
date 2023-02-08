import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames";
import styles from "./CodeBlock.module.css";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, title, text, theme }) => {
  const style = theme === "dark" ? oneDark : oneLight;
  style["pre[class*=\"language-\"]"].margin = "0";
  style["pre[class*=\"language-\"]"].boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.1)";
  style["pre[class*=\"language-\"]"].borderRadius = "0";

  return (
    <div>
      {title === null || title == undefined ? (
        <div></div>
      ) : (
        <div className={classNames(styles.title)}>
          <SyntaxHighlighter language="plaintext" style={style}>
            {title}
          </SyntaxHighlighter>
        </div>
      )}
      {text === null || text == undefined ? (
        <ClipLoader
          color="#545"
          loading={true}
          size="25px"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <SyntaxHighlighter
          showLineNumbers={true}
          language={language}
          style={style}
        >
          {text}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeBlock;