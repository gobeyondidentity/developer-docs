import React, { useState } from "react";
import { Tabs } from "react-simple-tabs-component";
import "react-simple-tabs-component/dist/index.css";
import { CodeBlock, dracula } from "react-code-blocks";
import jwt_decode from "jwt-decode";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const DARK_MODE_THEME = dracula;
const LIGHT_MODE_THEME = null;

const AccessToken = (tokenResponse, theme) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.access_token), null, 2);
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={theme}
    />
  );
};

const IdToken = (tokenResponse, theme) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.id_token), null, 2);
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={theme}
    />
  );
};

const RefreshToken = (tokenResponse, theme) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.refresh_token), null, 2)
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={theme}
    />
  );
};

const tabs = (tokenResponse, theme) => [
  {
    label: 'Access Token',
    Component: () => AccessToken(tokenResponse, theme)
  },
  {
    label: 'Id Token',
    Component: () => IdToken(tokenResponse, theme)
  },
  {
    label: 'Refresh Token',
    Component: () => RefreshToken(tokenResponse, theme)
  }
];

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
      <Tabs tabs={tabs(tokenResponse, theme)} />
    </div>
  )
};

export default AuthenticateResult;
