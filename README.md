<!-- Reference Links -->
[site]: https://[[developer-docs.vercel.app](https://developer.beyondidentity.com/)](https://developer.beyondidentity.com/)/
[issues]: https://github.com/gobeyondidentity/developer-docs/issues/new?assignees=&labels=triage&projects=&template=content-issue.yml&title=%5BContent+issue%5D%3A+
[repo]: https://github.com/gobeyondidentity/developer-docs
[pr]: https://github.com/gobeyondidentity/developer-docs/pulls
[enhancements]: https://github.com/gobeyondidentity/developer-docs/issues/new?assignees=&labels=%F0%9F%8C%9F+enhancement&projects=&template=enhancement.yml

<div align="center">
   <br/>
   <a href="https://developers.beyondidentity.com" target="_blank"><img src="https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png" width="150px" ></a>
   <h3>Beyond Identity</h3>
   <p>Universal Passkeys for Developers</p>
   <p>
   All devices. Any protocol. Zero shared secrets. 
   </p>
   <h1>Developer documentation</h1>
</div>

Welcome to the Beyond Identity developer documentation repository! This repo is the source for [https://developer.beyondidentity.com/][site], also known as "Next Dev Docs"!

The Beyond Identity developer documentation is completely open-source and we appreciate contributions.

## Provide feedback

Your feedback is essential in shaping the customer content experience. There are several ways to provide feedback:

- [Submit an enhancement idea][enhancements] to make the docs better
- [open a GitHub issue][issues] to report an issue with the content (something is incorrect or confusing)

The team will track these ideas and issues to address your feedback.

## Contribute to the docs

Refer to the [contributor's guide](./contributor-guide/contributor-guide.md) for details on how to submit edits or additions to the documentation.

## Doc branches

Before you get started with the authoring work, it's necessary that you understand the different branches to work on.

* **`main`** - protected branch

  Docs for https://developer.beyondidentity.com/. This branch contains the most recent stable release content.

* **`docs-staging`** - protected branch

  Docs for a forward-version that includes features not yet included in the Beyond Identity stable version. When Secure Customer has a release, its `docs-staging` branch will be merged into `main`. Its content is published on https://customer-docs-git-docs-staging-beyondidentity.vercel.app/ for early validation purpose.

* **`active-development`** - protected branch (currently used for front-end development)

  Its content is published on https://developer-docs-git-active-development-beyondidentity.vercel.app/ for early validation purpose.

* You can have your own personal branch to work on content for a certain issue or feature. However, be sure to check and remove unused personal branches periodically for easy maintenance. Usually when your branch is merged, you can safely delete it.

## Site organization and files

- `/docs/` - Contains the Markdown files for the docs. Customize the order of the docs sidebar in `sidebars.js`.
  - `/docs/images` - Images used in the documentation.
  - `/docs/includes` - Reusable content such as feature descriptions, notes, common steps, and so on.
- `/docusaurus.config.js` - A config file containing the site configuration.
- `/sidebar.js` - Specify the order of documents in the sidebar. If you have a new file to add to the site, modify this file.
- `/src/` - Non-documentation files like pages, custom React components, or Docaurus native components.
  - `/src/components` - Custom react components used for the website or included in the documentation, such as the Try It Out!
  - `/src/pages` - Any files within this directory will be converted into a website page. Currently, we don't use this directory.
  - `/src/theme` - Docusausus native components such as the sidebar, content page, and content page footer designs.
- `/static/` - Static directory. Any contents inside here will be copied into the root of the final `build` directory.
  - `/static/img` - Website images such as Beyond Identity logos and other assets.
- `/package.json` - A Docusaurus website is a React app. You can install and use any npm packages you like in them.
- `versioned_docs_` - Contains the markdown files for the previous supported versions (v0 and v1).
- `versioned_sidebars` - Contains the sidebar files for the previous versions.

## Get started

### Prerequisites

- Code editor, [VS Code](https://code.visualstudio.com) is recommended
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

### Clone the repo

1. Clone the repo. This creates a directory named `developer-docs` in your current working directory.

   ```bash
   git clone https://github.com/gobeyondidentity/developer-docs.git
   cd developer-docs
   ```

2. Next, create a new [branch](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) from `main` (always give your branch a meaningful, descriptive name).

   ```bash
   git checkout -b <branch_name> main
   ```

Refer to the [contributor's guide](./contributor-guide/contributor-guide.md) for details on how to submit edits or additions to the documentation.

### Start the development server

We're finally able to get to the fun stuff! Install the dependencies and start a local development server:

```bash
yarn
yarn start
```

The `http://localhost:3000` opens in your browser so you can see your changes reflected live. As you make changes to the source files, the preview build will be triggered automatically, and then you can refresh your browser to see the changes.

## Project Resources

| Resource | Description |
| --- | --- |
| [CODEOWNERS](https://github.com/gobeyondidentity/developer-docs/blob/main/CODEOWNERS) | Outlines the project lead(s) |

## Thank you!

We appreciate your contributions to our documentation!
