import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ClipLoader from "react-spinners/ClipLoader";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * Example Usage:
 * 
 * import MultiLanguageCodeBlock from "../../src/components/MultiLanguageCodeBlock";
 * <MultiLanguageCodeBlock
 *   curl={`curl http://localhost:3000`}
 *   title="/token"
 * />
 * 
 * Note:
 * 
 * curl must be correctly formatted as this component does not format
 * it for you. 
*/

const DARK_MODE_THEME = oneDark;
const LIGHT_MODE_THEME = oneLight;

const MultiLanguageCodeBlock = ({ curl, title }) => {
  const [response, setResponse] = useState(null);
  const [theme, setTheme] = useState(function () {
    if (ExecutionEnvironment.canUseDOM && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_MODE_THEME;
    } else {
      return LIGHT_MODE_THEME;
    }
  }());

  if (ExecutionEnvironment.canUseDOM) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (event.matches) {
          //dark mode
          setTheme(DARK_MODE_THEME);
        } else {
          //light mode
          setTheme(LIGHT_MODE_THEME);
        }
      });
  }

  useEffect(async () => {
    const rawResponse = await fetch(
      `https://curl-converter-backend.vercel.app/api/convert`,
      {
        body: JSON.stringify({
          curl: curl,
        }),
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        method: 'POST',
      }
    );
    let jsonResponse = await rawResponse.json();
    if (rawResponse.status !== 200) {
      console.error(jsonResponse);
      return;
    }
    setResponse(jsonResponse);
  }, []);

  const CodeBlock = ({ language, title, text }) => {
    return (
      <div>
        <SyntaxHighlighter
          language={language}
          style={theme}>
          {title}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          showLineNumbers={true}
          language={language}
          style={theme}
        >
          {text}
        </SyntaxHighlighter>
      </div>
    );
  };

  return <div>
    {response === null ? <ClipLoader
      color="#ffffff"
      loading={true}
      size="25px"
      aria-label="Loading Spinner"
      data-testid="loader"
    /> :
      <Tabs groupId="multi-language-platform" queryString>
        <TabItem value="curl" label="Curl">
          <CodeBlock
            language="bash"
            title={title}
            text={curl}
          ></CodeBlock>
        </TabItem>
        <TabItem value="csharp" label="CSharp">
          <CodeBlock
            language="csharp"
            title={title}
            text={response?.csharp}
          ></CodeBlock>
        </TabItem>
        <TabItem value="dart" label="Dart">
          <CodeBlock
            language="dart"
            title={title}
            text={response?.dart}
          ></CodeBlock>
        </TabItem>
        <TabItem value="go" label="Go">
          <CodeBlock
            language="go"
            title={title}
            text={response?.go}
          ></CodeBlock>
        </TabItem>
        <TabItem value="java" label="Java">
          <CodeBlock
            language="java"
            title={title}
            text={response?.java}
          ></CodeBlock>
        </TabItem>
        <TabItem value="node" label="Node">
          <CodeBlock
            language="javascript"
            title={title}
            text={response?.node}
          ></CodeBlock>
        </TabItem>
        <TabItem value="python" label="Python">
          <CodeBlock
            language="python"
            title={title}
            text={response?.python}
          ></CodeBlock>
        </TabItem>
        <TabItem value="ruby" label="Ruby">
          <CodeBlock
            language="ruby"
            title={title}
            text={response?.ruby}
          ></CodeBlock>
        </TabItem>
        <TabItem value="rust" label="Rust">
          <CodeBlock
            language="rust"
            title={title}
            text={response?.rust}
          ></CodeBlock>
        </TabItem>
      </Tabs>
    }
  </div>;
};

export default MultiLanguageCodeBlock;

