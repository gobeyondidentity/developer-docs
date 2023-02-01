import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames";
import styles from "./CodeBlock.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, title, text, theme, enableBorderRadius }) => {
  const titleStyle = theme === "dark" ? oneDark : oneLight;
  const bodyStyle = theme === "dark" ? structuredClone(oneDark) : structuredClone(oneLight);
  titleStyle["pre[class*=\"language-\"]"].margin = "0";
  titleStyle["pre[class*=\"language-\"]"].boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.1)";
  bodyStyle["pre[class*=\"language-\"]"].margin = "0";
  bodyStyle["pre[class*=\"language-\"]"].boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.1)";

  if (enableBorderRadius) {
    if (title === null || title == undefined) {
      bodyStyle["pre[class*=\"language-\"]"].borderRadius = "0.4rem";
    } else {
      titleStyle["pre[class*=\"language-\"]"].borderRadius = "0.4rem 0.4rem 0 0";
      bodyStyle["pre[class*=\"language-\"]"].borderRadius = "0 0 0.4rem 0.4rem";
    }
  } else {
    titleStyle["pre[class*=\"language-\"]"].borderRadius = "0";
    bodyStyle["pre[class*=\"language-\"]"].borderRadius = "0";
  }

  return (
    <div>
      {title === null || title == undefined ? (
        <div></div>
      ) : (
        <div className={classNames(styles.title)}>
          <SyntaxHighlighter language="plaintext" style={titleStyle}>
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
          style={bodyStyle}
        >
          {text}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeBlock;