// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Beyond Identity Developer Documentation",
  tagline: "Comprehensive guides, tutorials, example code, and more for Beyond Identity developer tools.",
  url: "https://developers.beyondidentity.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gobeyondidentity", // Usually your GitHub org/user name.
  projectName: "developer-docs", // Usually your repo name.

  presets: [
    [
      "docusaurus-preset-openapi",
      /** @type {import('docusaurus-preset-openapi').Options} */
      ({
        api: {
          id: 'first', // omitted => default instance
          path: 'api/v0/openapi.json',
          routeBasePath: 'api/v0',
        },
        docs: {
          id: "first",
          path: 'nodocs',
          routeBasePath: 'nodocs',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: "https://github.com/gobeyondidentity/developer-docs",
        lastVersion: 'current',
        versions: {
          current: {
            label: 'v1',
            path: 'v1',
          },
        },
      },
    ],
    [
      'docusaurus-plugin-openapi',
      {
        id: 'second',
        path: 'api/v1/openapi.yaml',
        routeBasePath: 'api/v1',
      },
    ],
  ],

  themeConfig:
    /** @type {import('docusaurus-preset-openapi').ThemeConfig} */
    ({
      navbar: {
        title: "Developer Docs",
        logo: {
          alt: "Beyond Identity",
          src: "img/logo.svg",
          width: 60,
          height: 55,
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownActiveClassDisabled: true,
          },
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Documentation",
          },
          { to: "/api/v0", label: "REST API v0", position: "left" },
          { to: "/api/v1", label: "REST API v1", position: "left" },
          {
            href: "https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ",
            label: "Join Slack",
            position: "right",
          },
          {
            href: "https://github.com/gobeyondidentity",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "REST API",
                to: "/api",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/beyondidentity",
              },
              {
                label: "Slack",
                href: "https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/beyondidentity",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                href: "https://www.beyondidentity.com/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/gobeyondidentity",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Beyond Identity, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // additionalLanguages: ['kotlin'],
      },
    }),
};

module.exports = config;
