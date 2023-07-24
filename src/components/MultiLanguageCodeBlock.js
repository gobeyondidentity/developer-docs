import React, { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import CodeBlock from "./CodeBlock";

/**
 * Example Usage:
 *
 * import MultiLanguageCodeBlock from "@site/src/components/MultiLanguageCodeBlock";
 * <MultiLanguageCodeBlock
 *   curl='curl "https://auth-$(REGION).beyondidentity.com/v1/tenants/$(TENANT_ID)/realms/$(REALM_ID)/applications/$(MANAGEMENT_APPLICATION_ID)/token" \
 * -X POST \
 * -u "$(MANAGEMENT_API_CLIENT_ID):$(MANAGEMENT_API_CLIENT_SECRET)" --basic \
 * -H "Content-Type: application/x-www-form-urlencoded" \
 * -d "grant_type=client_credentials&scope=$(SCOPES)"'
 *   title="/token"
 * />
 *
 * Note:
 *
 * curl must be correctly formatted as this component does not format
 * it for you.
 */

const DARK_MODE_THEME = "dark";
const LIGHT_MODE_THEME = "light";

const MultiLanguageCodeBlock = ({ curl, title }) => {
  const [response, setResponse] = useState(null);
  const [theme, setTheme] = useState(
    (function () {
      if (
        ExecutionEnvironment.canUseDOM &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return DARK_MODE_THEME;
      } else {
        return LIGHT_MODE_THEME;
      }
    })()
  );

  if (ExecutionEnvironment.canUseDOM) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
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

  return (
    <div>
      <Tabs groupId="multi-language-platform">
        <TabItem value="curl" label="Curl">
          <CodeBlock
            language="bash"
            title={title}
            text={curl}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="csharp" label="CSharp">
          <CodeBlock
            language="csharp"
            title={title}
            text={response?.csharp}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="dart" label="Dart">
          <CodeBlock
            language="dart"
            title={title}
            text={response?.dart}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="go" label="Go">
          <CodeBlock
            language="go"
            title={title}
            text={response?.go}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="java" label="Java">
          <CodeBlock
            language="java"
            title={title}
            text={response?.java}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="node" label="Node">
          <CodeBlock
            language="javascript"
            title={title}
            text={response?.node}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="python" label="Python">
          <CodeBlock
            language="python"
            title={title}
            text={response?.python}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="ruby" label="Ruby">
          <CodeBlock
            language="ruby"
            title={title}
            text={response?.ruby}
            theme={theme}
          ></CodeBlock>
        </TabItem>
        <TabItem value="rust" label="Rust">
          <CodeBlock
            language="rust"
            title={title}
            text={response?.rust}
            theme={theme}
          ></CodeBlock>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default MultiLanguageCodeBlock;
