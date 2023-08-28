/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  mainSidebar: [
    {
      type: 'category',
      label: 'Foundations',
      collapsed: false,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'foundations/foundations',
      },
      items: [
        'foundations/overview',
        'foundations/universal-passkeys',
        'foundations/platform-overview',
        'foundations/api-endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: true,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'get-started/get-started',
      },
      items: [
        'get-started/get-started-react',
        'get-started/get-started-angular',
        'get-started/get-started-nextjs',
      ],
    },
/*
    {
      type: 'category',
      label: 'Quickstarts',
      collapsed: true,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'quickstarts/quickstart',
      },
      items: [],
    },
*/
    {
      type: 'category',
      label: 'Authentication',
      collapsed: true,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'authentication/authentication',
      },
      items: [
        {
          type: 'category',
          label: 'Hosted Web',
          collapsed: true,
          collapsible: true,
          items: [
            'authentication/hosted-add-authentication',
            'authentication/hosted-add-otp-email',
          ],
        },
        {
          type: 'category',
          label: 'Embedded SDK',
          collapsed: true,
          collapsible: true,
          items: [
            'authentication/embedded-sdk-add-passkeys',
            'authentication/embedded-sdk-add-otp-email',
/*
            {
              type: 'category',
              label: 'Integrations',
              collapsed: true,
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'integration-guides/expo-react-native',
                  label: 'Expo React Native',
                },
                {
                  type: 'doc',
                  id: 'integration-guides/next-auth',
                  label: 'NextAuth',
                },
              ],
            },
*/
          ],
        },
        {
          type: 'category',
          label: 'Session Management',
          collapsed: true,
          collapsible: true,
          link: {
            type: 'doc',
            id: 'authentication/session-management',
          },
          items: [
            'authentication/session-management-overview',
            'authentication/session-management-console',
          ],
        },
      ],
    },
    {
      type: 'doc',
      label: 'SDKs',
      id: 'sdks/sdk-setup',
    },
    {
      type: 'category',
      label: 'How-to Guides',
      collapsed: false,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'how-to/how-to-guides',
      },
      items: [
        'how-to/find-tenant-id',
        'how-to/create-realm',
        'how-to/add-resource-server',
        'how-to/add-an-application',
        'how-to/add-an-identity',
        'how-to/add-passkey',
        'how-to/configure-rbac',
        'how-to/create-role',
        'how-to/add-user-group-to-role',
        {
          type: 'category',
          label: 'Administrative',
          collapsed: true,
          collapsible: true,
          items: [
            'how-to/invite-teammate',
            'how-to/login-another-account',
            'how-to/add-groups',
            'how-to/configure-rbac-admin-realm',
            'how-to/create-bi-api-token',
            'how-to/add-rule-policy',
            'scim-server',
            'how-to/view-event-details',
            'how-to/customize-app',
          ],
        },
        {
          type: 'category',
          label: 'Access Tokens',
          collapsed: true,
          collapsible: true,
          link: {
            type: 'doc',
            id: 'api-tokens/api-tokens',
          },
          items: [
            'api-tokens/api-token-overview',
            'api-tokens/api-scopes',
            'api-tokens/create-api-token',
            'api-tokens/validate-access-tokens',
            'api-tokens/list-access-tokens',
            'api-tokens/revoke-access-tokens',
            'api-tokens/enable-refresh-tokens',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      collapsed: false,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'integration-guides/integration-guides',
      },
      items: [
        {
          type: 'doc',
          id: 'integration-guides/bubble',
          label: 'bubble.io',
        },
        {
          type: 'doc',
          id: 'integration-guides/drupal',
          label: 'Drupal',
        },
        {
          type: 'doc',
          id: 'integration-guides/expo-react-native',
          label: 'Expo React Native',
        },
        {
          type: 'doc',
          id: 'integration-guides/next-auth',
          label: 'NextAuth',
        },
        {
          type: 'doc',
          id: 'integration-guides/wordpress',
          label: 'WordPress',
        },
        {
          type: 'category',
          label: 'Primary IDP Integrations',
          collapsed: true,
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'integration-guides/auth0',
              label: 'Auth0',
            },
            {
              type: 'doc',
              id: 'integration-guides/aws-cognito',
              label: 'AWS Cognito',
            },
            {
              type: 'doc',
              id: 'integration-guides/azure-ad-b2c',
              label: 'Azure AD B2C',
            },
            {
              type: 'doc',
              id: 'integration-guides/curity',
              label: 'Curity',
            },
            {
              type: 'doc',
              id: 'integration-guides/firebase',
              label: 'Firebase',
            },
            {
              type: 'doc',
              id: 'integration-guides/google-identity-platform',
              label: 'Google Identity Platform',
            },
            {
              type: 'doc',
              id: 'integration-guides/keycloak',
              label: 'KeyCloak',
            },
            {
              type: 'doc',
              id: 'integration-guides/okta-oidc',
              label: 'Okta OIDC',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      collapsible: false,
      link: {
        type: 'doc',
        id: 'resources',
      },
      items: [
        'glossary',
        {
          type: 'link',
          label: 'Service Status',
          href: 'https://status.beyondidentity.com/',
        },
      ],
    },
  ],

  sdkSidebar: [
    {
      type: 'doc',
      id: 'welcome',
      label: '<- Back to main docs',
    },
    {
      type: 'html',
      value: '<hr>',
    },
    'sdks/sdk-setup',
    'sdks/sdk-size',
    {
      type: 'category',
      label: 'JavaScript',
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'JS Reference guide',
          collapsed: true,
          collapsible: true,
          items: [
            'sdks/js-reference-guide/js-reference-initialize',
            'sdks/js-reference-guide/js-reference-isBindPasskeyUrl',
            'sdks/js-reference-guide/js-reference-bindPasskey',
            'sdks/js-reference-guide/js-reference-isAuthenticateUrl',
            'sdks/js-reference-guide/js-reference-authenticate',
            'sdks/js-reference-guide/js-reference-getPasskeys',
            'sdks/js-reference-guide/js-reference-deletePasskey',
            'sdks/js-reference-guide/js-reference-passkey-type',
            'sdks/js-reference-guide/js-reference-getAuthenticationContext',
            'sdks/js-reference-guide/js-reference-authenticateOtp',
            'sdks/js-reference-guide/js-reference-redeemOtp',
          ],
        },
        {
          type: 'link',
          label: 'Documentation',
          href: 'https://gobeyondidentity.github.io/bi-sdk-js/',
        },
      ],
    },
    {
      type: 'link',
      label: 'Kotlin',
      href: 'https://gobeyondidentity.github.io/bi-sdk-android/',
    },
    {
      type: 'link',
      label: 'Flutter',
      href: 'https://gobeyondidentity.github.io/bi-sdk-flutter/',
    },
    {
      type: 'link',
      label: 'React Native',
      href: 'https://gobeyondidentity.github.io/bi-sdk-react-native/',
    },
    {
      type: 'link',
      label: 'Swift',
      href: 'https://gobeyondidentity.github.io/bi-sdk-swift/documentation/beyondidentityembedded/',
    },
  ],
};

module.exports = sidebars;
