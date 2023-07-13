// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/*
function getNextVersionName() {
  const latest = versions[0];
  const split = latest.split('.');
  const next = `Next (v2) 🚧`;
  return next;
}
*/

const versions = require('./versions.json');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Beyond Identity Developer Docs",
  tagline: "The easiest way to implement passwordless secure authentication with passkeys on Web, iOS, Android, React Native and Flutter",
  url: "https://developer.beyondidentity.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "gobeyondidentity", // Usually your GitHub org/user name.
  projectName: "developer-docs", // Usually your repo name.
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  staticDirectories: ['static'],

  presets: [
    ['docusaurus-preset-classic',
    {
      gtag: {
        trackingID: 'GTM-K3TCQSV',
        anonymizeIP: false,
      },
      docs: {
        breadcrumbs: true,
        sidebarPath: require.resolve('./sidebars.js'),
      //  routeBasePath: '/',
        path: 'docs',
        showLastUpdateTime: true,
        editUrl:
          'https://github.com/gobeyondidentity/developer-docs/edit/main/',
          versions: {
            current: {
              label: "Next 🚧",
              path: "/next",
            },
            v1: {
              label: "v1",
              path: "v1",
            },
            v0: {
              label: "v0",
              path: "v0",
            },
        },
        lastVersion: "current",

      },
      blog: false,
      theme: {
        customCss: require.resolve("./src/css/custom.css"),
      },
    }],
    [
      'redocusaurus',
      {
        id: "apiv0",
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'static/api/v0/openapi.json',
            url: 'api/v0/openapi.json',
            route: 'api/v0',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#5077c5',
        },
      },
    ],
    [
      'redocusaurus',
      {
        id: "apiv1",
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'static/api/v1/openapi.yaml',
            url: 'api/v1/openapi.yaml',
            route: 'api/v1',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#5077c5',
        },
      },
    ],
    [
      'redocusaurus',
      {
        id: "apiv2",
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: 'static/api/v2/openapi.yaml',
            url: 'api/v2/openapi.yaml',
            route: 'api/v2',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#5077c5',
        },
      },
    ],
  ],
  plugins: [
    
  ],
  scripts: [
    {
      src:
        'https://cdn.optimizely.com/js/22297341556.js',
      async: false,
    },
    {
      src:
        '/js/loadtags.js',
      async: true,
    },
  ],
  themeConfig:
    ({
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        }
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      metadata: [
        { property: 'og:description', content: 'Developer Docs for passwordless authentication' },
        { property: 'og:image', content: 'https://www.beyondidentity.com/sites/default/files/2023-02/zero-trust-announce.png' },
        { name: 'twitter:card', content: 'Beyond Identity Developer Docs' }
      ],
      navbar: {
        title: 'Developer Documentation',
        logo: {
          alt: 'Beyond Identity Logo',
          src: 'img/BYD_ID-LOGO_FINAL_blue_RGB.svg',
          className: 'header-logo',
        },
        items: [
          // { // remove this and see if anybody complains
          //   type: 'docsVersionDropdown',
          //   position: 'left',
          //   dropdownActiveClassDisabled: false,
          // },
/*          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Documentation",
          },
*/
          {
            to: '/docs/next/try-it-out/',
            position: 'left',
            label: 'Try it Out! 🚀',
          },  
          { to: "/api/v2", label: "REST API", position: "left" },
          {
            to: 'https://www.beyondidentity.com/developers/blog',
            position: 'left',
            label: 'Blog',
            },
            {
            label: 'Community',
            type: 'dropdown',
            position: 'left',
            items: [
              {
                to: 'https://github.com/gobeyondidentity',
                label: 'GitHub',
                },
                {
                to: 'https://stackoverflow.com/questions/tagged/beyondidentity',
                label: 'Stack Overflow',
                },
                {
                to: 'https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ',
                label: 'Slack',
                },
                {
                to: 'https://twitter.com/BI_Developers',
                label: 'Twitter',
                },
                {
                to: 'https://dev.to/beyondidentity',
                label: 'DevTo',
                },
            ],
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownItemsBefore: [],
            dropdownActiveClassDisabled: true,
          },

          {
            href: "https://www.beyondidentity.com/developers/signup",
            label: "Signup",
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'Login',
            position: 'right',
            items: [
              {
                href: "https://console-us.beyondidentity.com/login",
                label: "Login-US",
              },
              {
                href: "https://console-eu.beyondidentity.com/login",
                label: "Login-EU",
              },
            ],
          },
          {
            href: "https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ",
            label: "Join Slack",
            position: "right",
          },
        ],
      },
      footer: {
        style: 'dark',
        
        copyright: `© ${new Date().getFullYear()} Beyond Identity&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://www.beyondidentity.com/docs/terms-legal">Terms and Conditions</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['dart','kotlin','swift'],
      },
      hubspot: {
        accountId: "7364297",
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '4P4Q3C985L',

        // Public API key: it is safe to commit it
        apiKey: 'bbddcf64f82147a7adaa021dd3e7f88b',

        indexName: 'developer.beyondidentity.com',

        // Optional: see doc section below
        contextualSearch: false,

        // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // // Optional: Algolia search parameters
        searchParameters: {
          facetFilters: [],
        },

        // // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: 'search',

      },

      announcementBar: {
        id: 'support_us',
        content:
          '👋 We\'re working on a new doc site.  <a rel="noopener noreferrer" href="/docs/next/introduction"><b>Check it out!</b></a>&nbsp;&nbsp;Go back to <a href="/docs/v1/introduction">v1</a>.',
        backgroundColor: '#b9c5e7',
        textColor: '#091E42',
        isCloseable: false,
      },

/*      announcementBar: {
        id: 'hello_world',
        content:
        'Hello world! <a target="_blank" rel="noopener noreferrer" href="https://www.beyondidentity.com/developers/blog/hello-world-presenting-beyond-identity-universal-passkey-sdks-and-apis-developers">Presenting Beyond Identity Universal Passkey SDKs and APIs for Developers.</a>',
        backgroundColor: '#5077c5',
        textColor: '#ffffff',
        isCloseable: true,
      },
*/
    }),
};

module.exports = config;
