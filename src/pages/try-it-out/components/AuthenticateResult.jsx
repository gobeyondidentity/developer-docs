import React from "react";
import { Tabs } from "react-simple-tabs-component";
import "react-simple-tabs-component/dist/index.css";
import { CodeBlock, dracula } from "react-code-blocks";
import jwt_decode from "jwt-decode";

const AccessToken = (tokenResponse) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.access_token), null, 2);
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={dracula}
    />
  );
};

const IdToken = (tokenResponse) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.id_token), null, 2);
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={dracula}
    />
  );
};

const RefreshToken = (tokenResponse) => {
  const decoded = JSON.stringify(jwt_decode(tokenResponse.refresh_token), null, 2)
  return (
    <CodeBlock
      text={decoded}
      language="json"
      showLineNumbers={true}
      startingLineNumber={0}
      theme={dracula}
    />
  );
};

const tabs = (tokenResponse) => [
  {
    label: 'Access Token',
    Component: () => AccessToken(tokenResponse)
  },
  {
    label: 'Id Token',
    Component: () => IdToken(tokenResponse)
  },
  {
    label: 'Refresh Token',
    Component: () => RefreshToken(tokenResponse)
  }
];

const AuthenticateResult = (tokenResponse) => {
  return (
    <div>
      <Tabs tabs={tabs(tokenResponse)} />
    </div>
  )
};

export default AuthenticateResult;
