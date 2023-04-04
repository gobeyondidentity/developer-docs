import styles from "./JsSdkQuickstart.module.css";
import padding from "../../css/Padding.module.css";
import React, { useState } from "react";
import classNames from "classnames";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let apiTokenG = '';   //global variable for apitoken

const CreateApp = () => {
  const [tenantId, setTenantId] = useState("");
  const [testmode, setTestmode] = useState("");
  const [apitoken, setApitoken] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupResponse, setSetupResponse] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [identityName, setIdentityName] = useState(null);
  const [identityEmail, setIdentityEmail] = useState(null);
  const [identityResponse, setIdentityResponse] = useState(null);

  const handleIdSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    if (!identityName) {
      toast.error("Please provide a username");
      setLoading(false);
      return;
    }

    if (!identityEmail) {
      toast.error("Please provide an email address for the user");
      setLoading(false);
      return;
    }

    if (!setupResponse) {
      toast.error('please fill out the first form first');
      setLoading(false);
      return;
    }

    let url;
    //url = `https://bihelperapp.azurewebsites.net/create-identity-passkey` + 
    url = `https://bi-quickstart-app.vercel.app/create-identity-passkey` + 
          `?tenantid=${tenantId}&email=${identityEmail}` + 
          `&username=${identityName}` + 
          `&realmid=${setupResponse.REALM_ID}` + 
          `&applicationid=${setupResponse.APPLICATION_ID}` + 
          `&authenticatorconfigid=${setupResponse.AUTHENTICATOR_CONFIG_ID}&apitoken=${apiTokenG}`;

    const rawResponse = await fetch(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'//,
        },
        method: 'GET',
      }
    );

    let jsonResponse = await rawResponse.json(); 
    if (rawResponse.status !== 200) {
      toast.error(jsonResponse.error);
      setLoading(false);
      return;
    }

    try {
  
      setIdentityResponse(jsonResponse);
      setLoading(false);   
      } catch (e) {
        console.error(e);
        toast.error(e.message);
        setLoading(false);
      }

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    if (!apitoken) {
      toast.error("Please provide an api token");
      setLoading(false);
      return;
    }

    //document.getElementById('testmode').value='foo';

    apiTokenG = apitoken;
    setApitoken('');    //try this - use global variable rather than react state

    /*if (!tenantId.match(/^\w{16}$/)) {
      toast.error("Please enter a valid tenant id");
      setLoading(false);
      return;
    }*/

    //replace above with call to decode for apitoken
    let tokenUrl = `https://bi-quickstart-app.vercel.app/decode?apitoken=${apiTokenG}`;

    const tokenResponse = await fetch(
      tokenUrl,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'//,
        },
      method: 'GET',
      }
    )

    let jsonTokenResponse = await tokenResponse.json();
     
    if (tokenResponse.status !== 200) {
      toast.error(jsonTokenResponse.error);
      setLoading(false);
      return;
    }

    if (!jsonTokenResponse.tenantId) {
      toast.error("Please enter a valid apitoken");
      setLoading(false);
      return;
    } else {
      //go forward and tenant id will be ${jsonTokenResponse.tenantId}
      setTenantId(jsonTokenResponse.tenantId);  //set state here instead of from form input, which has been removed
    }

    let url; 

    if (testmode == 'true') {
      url = `https://bihelperapp.azurewebsites.net/bi-setup?test=true`;
    }
    else {
      //url = `https://bihelperapp.azurewebsites.net/bi-setup?tenantid=${tenantId}&apitoken=${apitoken}`;
      //url = `https://bi-quickstart-app.vercel.app/bi-setup?tenantid=${tenantId}&apitoken=${apitoken}`;
      //state set above not available het (?):
      url = `https://bi-quickstart-app.vercel.app/bi-setup?tenantid=${jsonTokenResponse.tenantId}&apitoken=${apitoken}`;
      //url = `https://bi-quickstart-app.vercel.app/bi-setup?tenantid=${tenantId}&apitoken=${apitoken}`;
    }

    const rawResponse = await fetch(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'//,
        },
        method: 'GET',
      }
    );

    //we are done fetching
    //need to clear out UI without clearing react state variable so that we can make next API call to create identity/passkey
    //let inpApiToken = document.getElementById('apitoken');
    //inpApiToken.value = '';
    //setApitoken("");  //this one properly fails on second API call

    let jsonResponse = await rawResponse.json();

    if (rawResponse.status !== 200) {
      toast.error(jsonResponse.error);
      setLoading(false);
      return;
    }

   try {
    //grab the protocol, host and port from redirect URI to guide customer on package.json:
    let re = /^https?\:\/\/\w+\.?\w+:\d+/;
    let redirectUri = jsonResponse.APP_REDIRECT_URI;
    let match = redirectUri.match(re);
    let hostname;
    if (match) {hostname = match[0]}
    else {hostname = 'your app url'}

    setSetupResponse(jsonResponse);
    setHostName(hostname);
    setLoading(false); 

    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div>
        <h2>What you will achieve with this guide</h2>
        <p>In this walk through, you will add passkey based sign on to a Javascript web app using the Beyond Identity <a href="https://developer.beyondidentity.com/docs/v1/workflows/sdk-setup" target='_blank'>Javascript SDK</a> and standard OAuth and OIDC calls.</p>
        <p>Along with the SDK, this guide uses Visual Studio Code (VS Code) and the <a href="https://github.com/nextauthjs/next-auth-example" target='_blank'>example app</a> from <a href="https://next-auth.js.org" target='_blank'>NextAuth.js</a>. However, you can use these concepts to add Beyond Identity to any web app.  </p>
        <h2>Prerequisites</h2>
        <p>First, make sure you've downloaded and installed the following tools on the development machine:</p>
        <ul>
            <li><a href="https://git-scm.com/downloads" target='_blank'>git</a></li>
            <li><a href="https://nodejs.org/en/download" target='_blank'>node.js and npm</a></li>
            <li><a href="https://code.visualstudio.com/download" target='_blank'>VS Code</a></li>
        </ul>
        <p>You can verify that node, npm and git are installed using the following commands in the VS Code terminal (View -&gt; Terminal):</p>
        <pre>
            <code>
            node -v<br/>npm -v<br/>git --version
            </code>
        </pre>
        <h2>Create a new project</h2>
        <ol>
            <li>On the development machine, create a new folder for your project.</li>
            <li>In VS Code, select <b>File</b> -&gt; <b>Open Folder</b> and select your folder.</li>
            <li>In VS Code, open the terminal (<b>View</b> -&gt; <b>Terminal</b>)</li>
            <li>In the VS Code terminal, execute the following commands to use git to clone the example app, change to the app’s directory, and install the app’s dependencies:</li>
        </ol>
        <pre>
            <code>
            git clone https://github.com/nextauthjs/next-auth-example.git<br/>
            cd next-auth-example<br/>
            npm install
            </code>
        </pre>
        <h2>Install the Beyond Identity SDK</h2>
        <p>In the VS Code terminal, execute the following command to install the Beyond Identity Javascript SDK:</p>
        <pre>
            <code>
            npm install @beyondidentity/bi-sdk-js
            </code>
        </pre>
        <h2>Configure your Beyond Identity tenant</h2>
        <ol>
            <li>If you haven't already created your Beyond Identity tenant, create one for free <a href="https://www.beyondidentity.com/developers/signup" target='_blank'>here</a>.</li>
            <li>
                <p>Once you have your tenant, go ahead and log in. You can access the Beyond Identity admin console for your tenant at <a href="https://console-us.beyondidentity.com/login" target='_blank'>BI admin console US</a> or <a href="https://console-eu.beyondidentity.com/login" target='_blank'>BI admin console EU</a>, depending on the region you chose when you signed up.</p>
                <p><i>If you have trouble getting in, try using the same computer and browser as you used when you first signed up.</i></p>
            </li>
            {/*<li>Record your <b>Tenant ID</b>, as you'll need it below. In the admin console, click <b>Edit realm</b>, then copy the <b>Tenant ID</b> from the <b>Edit realm</b> page. For help, see the guidance <a href="https://developer.beyondidentity.com/docs/v1/getting-started#6-get-your-tenant-id">here</a>.</li>*/}
            <li>Next, you will create a Beyond Identity API token. The easiest way is via the admin console under the Beyond Identity Admin realm: 
                <ul>
                    <li>In the console under <b>Tenant Managment</b>, click <b>Go to realm</b> -&gt; <b>Beyond Identity Admin</b>.</li>
                    <li>Then, under <b>Authentication</b> click <b>Apps</b> and then click <b>Beyond Identity Management API</b>.</li>
                    <li>Click the <b>API Tokens</b> tab, then click <b>Create token</b>. Provide your token a name and leave the default set of scopes, as our example app will be managing identities, then click <b>Create token</b>. <b>Be sure to copy your API Token</b> as you will need it for the form below. Once you've copied the token, click <b>Close this message</b>.</li>
                </ul>
                <p><i>For an illustration of these steps, see the video here: <a href="https://developer.beyondidentity.com/docs/v1/workflows/api-token#create-token-with-the-beyond-identity-admin-console" target='_blank'>create a Beyond Identity API token</a>.</i></p>
            </li>

            <li>Next, you'll initialize your tenant using the form below. Once you copy your <b>API Token</b> into the form below and click <b>Configure</b>, we will configure your tenant automatically with a new realm and app for use with this quickstart, then return the information you need. (Note that a realm is just a logical grouping that helps you apply policy later). </li>
        </ol>
        <h2>Initialize your tenant's configuration:</h2>
        <p>Copy your new <b>API Token</b> into the form below, then click <b>Configure</b> to initialize your tenant:</p>
      <div className={classNames(styles["qs-input"], "container")}>
        <form id="create_app" onSubmit={handleSubmit} className={classNames(styles["qs-form"])} autoComplete="off" autoCapitalize="none">
          <label className={classNames(styles.qslabel)} htmlFor="apitoken">API token:</label>
          <input className={classNames(styles["qs-form-input"])} value={apitoken} type="text" id="apitoken" name="apitoken" onChange={e => setApitoken(e.target.value)}></input>
         </form>
      </div>
      <div className={classNames(padding["mt-1"])}>
        <Button
          name="Configure"
          isLoading={loading}
          isDisabled={false}
          form="create_app" >
        </Button>
      </div>
      <br/>
        <h2>Create Beyond Identity as an OAuth provider in the app</h2>
        {(setupResponse !== null) ? (
        <div id="authenticate-result" className={classNames(padding["mt-1"])}>
        <p>In VS Code, you'll make the following changes to the example app project: </p>
        <ol>
            <li>Make a copy of the file env.local.example called <b>.env.local</b>. From the VS Code terminal:</li>
            <code>
            copy .env.local.example .env.local
            </code>
            <br/>
            <br/>
            <li>Copy and paste the information below, replacing your <b>.env.local</b> file's contents with the following: </li>
            <pre>
                <code>
                NEXTAUTH_URL=http://localhost:3000<br/>
                NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32<br/>
                <br/>
                # -- Beyond Identity<br/>
              REGION="us"<br/>
              TENANT_ID={setupResponse.TENANT_ID}<br/>
              REALM_ID={setupResponse.REALM_ID}<br/>
              API_TOKEN={setupResponse.API_TOKEN}<br/>
              APPLICATION_ID={setupResponse.APPLICATION_ID}<br/>
              AUTHENTICATOR_CONFIG_ID={setupResponse.AUTHENTICATOR_CONFIG_ID}<br/>
              APP_CLIENT_ID={setupResponse.APP_CLIENT_ID}<br/>
              APP_CLIENT_SECRET={setupResponse.APP_CLIENT_SECRET}<br/>
                </code>
            </pre>
            <li>Replace the contents of the file <b>process.d.ts</b> with the following:</li>
            <pre>
                <code>
                    declare namespace NodeJS &#123;<br/>
                    export interface ProcessEnv &#123;<br/>
                    &nbsp;&nbsp;NEXTAUTH_URL: string<br/>
                    &nbsp;&nbsp;NEXTAUTH_SECRET: string<br/>
                    &nbsp;&nbsp;TENANT_ID: string<br/>
                    &nbsp;&nbsp;API_TOKEN: string<br/>
                    &nbsp;&nbsp;REALM_ID: string<br/>
                    &nbsp;&nbsp;AUTHENTICATOR_CONFIG_ID: string<br/>
                    &nbsp;&nbsp;APPLICATION_ID: string<br/>
                    &nbsp;&nbsp;APP_CLIENT_ID: string<br/>
                    &nbsp;&nbsp;APP_CLIENT_SECRET: string<br/>
                    &nbsp;&nbsp;REGION: string<br/>
                    &nbsp;&nbsp;&#125;<br/>
                    &#125;
                </code>
            </pre>
            <li>Update the file <b>pages/api/auth/[...nextauth].js</b>. Inside the <code>providers[]</code> array, add the following entry:</li>
            <pre>
                <code>
                &#123;<br/>
                &nbsp;&nbsp;id: "beyondidentity",<br/>
                &nbsp;&nbsp;name: "Beyond Identity",<br/>
                &nbsp;&nbsp;type: "oauth",<br/>
                &nbsp;&nbsp;wellKnown: `https://auth-us.beyondidentity.com/v1/tenants/$&#123;process.env.TENANT_ID&#125;/realms/$&#123;process.env.REALM_ID&#125;/applications/$&#123;process.env.APPLICATION_ID&#125;/.well-known/openid-configuration`,<br/>
                &nbsp;&nbsp;authorization: &#123; params: &#123; scope: "openid" &#125; &#125;,<br/>
                &nbsp;&nbsp;clientId: process.env.APP_CLIENT_ID,<br/>
                &nbsp;&nbsp;clientSecret: process.env.APP_CLIENT_SECRET,<br/>
                &nbsp;&nbsp;idToken: true,<br/>
                &nbsp;&nbsp;checks: ["pkce", "state"],<br/>
                &nbsp;&nbsp;profile(profile) &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;return &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: profile.sub,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: profile.sub,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: profile.sub,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                &nbsp;&nbsp;&#125;,<br/>
                &#125;,<br/>
                </code>
            </pre>
            <li>Inside the <b>package.json</b> file, ensure that the scripts that run the app use the correct port that matches the app's configured <b>redirect URI</b> in your BI tenant. 
            <ul>
              <li>Your app's <b>redirect URI</b> is <code>{setupResponse.APP_REDIRECT_URI}</code>.</li>
              <li>The <b>package.json</b> scripts should run the app on hostname and port <code>{hostName}</code>.</li>
              <li><i>The default port for the nextauth.js sample app is 3000, so you do not need to specify a port via the -p option if you are using port 3000</i>.</li>
            </ul>
            </li>
        </ol>
        <h2>Verify the app runs</h2>
        <p>In VS Code execute <code>npm run dev</code> at the terminal prompt. The app should come up at <code>{hostName}</code>. Next you'll create a user to test signin, using the form below.</p>
 
        </div>
      ) : (
        <div>
            <code>
            <i>To populate the helper content for your tenant, copy your <b>API Token</b> into the form above, then click <b>Configure</b></i>
            </code>
            <br/><br/>
        </div>
      )}
        <h2>Get ready to test: create a user and enroll a passkey</h2>
        <p>In the form below, enter an email address where we can send your passkey invite, then click Create:</p>
      <div className={classNames(styles["qs-input"], "container")}>
        <form id="create_id" onSubmit={handleIdSubmit} className={classNames(styles["qs-form"])} autoComplete="off" autoCapitalize="none">
          <label className={classNames(styles.qslabel)} htmlFor="identityname">Username:</label>
          <input className={classNames(styles["qs-form-input"])} value={identityName} type="text" id="identityname" name="identityname" onChange={e => setIdentityName(e.target.value)}></input>
          <label className={classNames(styles.qslabel)} htmlFor="identityemail">Email:</label>
          <input className={classNames(styles["qs-form-input"])} value={identityEmail} type="text" id="identityemail" name="identityemail" onChange={e => setIdentityEmail(e.target.value)}></input>
        </form>
      </div>
      <div className={classNames(padding["mt-1"])}>
        <Button
          name="Create"
          isLoading={loading}
          isDisabled={false}
          form="create_id">
        </Button>
      </div>
      <br/>
      {(identityResponse !== null) ? (
        <div id="authenticate-result" className={classNames(padding["mt-1"])}>
          {/*<p>{identityResponse.STATE}</p>*/}
          <p>Check your email.</p>
          <p>From the browser you wish to use for testing, open the email and click the link. This will initiate a passkey enrollment and registration for your app in Beyond Identity.</p>
        <h2>Run the app and sign in</h2>
        <p>If you have not already done so, in VS Code execute <code>npm run dev</code> at the terminal prompt. The app should come up at <code>{hostName}</code>. Here you should be able to click <b>Sign in</b> and sign in to the app as shown below.</p>
        </div>
      ) : (
        <div>
            <code>
            <i>Create your test user account and passkey by entering an email address in the form above, then click <b>Create</b></i>
            </code>
            <br/><br/>
        </div>
      )}

    </div>
    
  );
};

export function QuickStart() {
  return (
    <div id="quickstart">
      <div id="create-app">
          <CreateApp></CreateApp>
      </div>
      <div className={classNames(padding["mt-1"])}></div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light" />
    </div>
  );
}

