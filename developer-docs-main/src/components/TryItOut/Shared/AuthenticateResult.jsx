import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "../../CodeBlocks/CodeBlock";

const DARK_MODE_THEME = "dark";
const LIGHT_MODE_THEME = "light";

const Token = ({token, theme}) => {
  const decoded = JSON.stringify(jwt_decode(token), null, 2);
  return (
    <CodeBlock
      language="json"
      text={decoded}
      theme={theme}
      enableBorderRadius={true}
    />
  );
};

const AuthenticateResult = (tokenResponse) => {
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

  return (
    <div>
      <Tabs groupId="authenticate-result" queryString>
        <TabItem value="access_token" label="Access Token">
          <Token
            token={tokenResponse.access_token}
            theme={theme}
          ></Token>
        </TabItem>
        <TabItem value="id_token" label="Id Token">
          <Token
            token={tokenResponse.id_token}
            theme={theme}
          ></Token>
        </TabItem>
        <TabItem value="refresh_token" label="Refresh Token">
          <Token
            token={tokenResponse.refresh_token}
            theme={theme}
          ></Token>
        </TabItem>
      </Tabs>
    </div >
  )
};

export default AuthenticateResult;
