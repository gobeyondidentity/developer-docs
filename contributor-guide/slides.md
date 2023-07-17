name: inverse
layout: true
class: center, middle, inverse
---
![](../static/img/BYD_ID-Y-LOGO_FINAL_WHITE_RGB.png)
#developer-docs 
##Contributor onboarding
####[GitHub | Docusaurus]

.pull-right-footnote[


]

???


---
 

#### We aim to make it possible for you to become a contributor. This contributor onboarding outlines the different ways that you can get involved.

???



---
layout: false
.left-column[
  ## Objectives
]
.right-column[
- Know when to contribute and the different ways to contribute

- Learn the project and organization structure

- Understand the Pull Request process

- Be aware of the documentation style and writing guidelines

- Understand the content development and review process


]

???


---
template: inverse

## WHEN TO CONTRIBUTE.
---
.left-column[
## Contribute vs. Feedback
]
.right-column[
Our docs are a continuous work in progress. You're welcome to contribute to the documentation to help improve it, and we want to make it possible for you to become a contributor. 

But you can also provide us feedback through a couple of channels.  The more detail you provide, the more helpful it is, and it tells us what information you sought. The team will track these ideas and issues to address your feedback. There are several ways to provide feedback:

- **Submit an enhancement idea** to make the docs better
- **open a GitHub issue** to report an issue with the content (something is incorrect or confusing)

If you plan to contribute, you’ll need to understand the different ways to contribute and which is best based on your changes.



.pull-right-footnote[
##### Now, let's talk about HOW you can contribute! >>

]

]

???

 
---

.left-column[
  ## How to contribute
]
.right-column[

#### Does the document or topic exist?

The acceptance criteria for contributing to Beyond Identity developer documentation are:

- If YES, determine which use case best fits your update:

  - **Use case #1:** Minor changes - If you only need to fix a typo or make a clarification to a sentence or section, this option is your best choice. In this use case, you will not be able to upload files, such as an image, and you can update only one file.

  - **Use case #2:** Significant changes - Suppose you need to make substantial changes, such as adding an image or editing multiple topics. In that case, this method is your best friend, as you'll have one pull request to manage.

- If NO, should it? If so, consider adding it (**Use case #3**) but don't add a topic or doc just because you can. Consult with the Sr. Technical Writer first before adding.


]

???




---
.left-column[
  ## How to contribute
  ### Use case #1
]
.right-column[

#### Minor changes

Despite all efforts, small grammar and spelling errors _do_ make their way into our published documents. While you can create GitHub issues to report mistakes, creating a PR to fix the issue is faster and easier when the option is available.

If you only need to fix a typo or clarify a sentence or section, making the change in GitHub.com repo directly is your best choice. It streamlines the process of reporting and correcting minor errors and omissions in the documentation. 

In the repo, navigate to the `/docs` folder and locate the file you want to edit. Then, select the pencil icon to edit the article.

![GitHub Edit file icon](./img/github-edit-file.png)<br />

]

???






---
.left-column[
## How to contribute
### Use case #2
]
.right-column[

#### Significant changes

Suppose you need to make substantial changes, such as adding images or editing multiple topics. In that case, working locally and pushing your changes is your best friend, as you'll have one pull request to manage. 

- Make sure you're back on the main (default) branch so you can sync your local working branch.

- Create a working branch for your proposed changes.

- Make your changes and update the metadata details as necessary.

- Validate your changes and no warnings or errors are generated, such as broken links. If so, address them and ensure it builds without issues.

- Submit your Pull Request and go through the review process.


]

???



---
.left-column[
## How to contribute
### Use case #3
]
.right-column[

#### Add new topics

Unlike the first two use cases where the topic exists, this use case is when you need to add a new topic like a how-to topic.

But don't add a topic or doc just because you can. Consult with the Sr. Technical Writer first before you get started. It's possible your new topic could be added to an existing one or someone else is working on a similar topic. 

- Make sure you're back on the main (default) branch so you can sync your local working branch.

- Create a working branch for your proposed changes.

- Navigate to the `/docs` folder, add a new markdown file for your content, add the metadata details, and then add the topic to the `sidebar.js` file.

- Validate your changes and no warnings or errors are generated, such as broken links. If so, address them and ensure it builds without issues.

- Submit your Pull Request and go through the review process.


]



???





---
.left-column[
## How to contribute
### Use case #4
]
.right-column[

#### No access or not comfortable

If you're not comfortable using GitHub or VS Code or don't have access to GitHub, you can provide the Sr. Technical Writer a document (Google Docs, Microsoft Word, text file, or Confluence page). The document can be converted to markdown. So don't fret! We'll get your content published.

Another option for when you're not ready to contribute, you can provide us feedback.  Your feedback is essential in shaping the customer content experience. There are several ways to provide feedback:

- [Submit an enhancement idea](https://github.com/gobeyondidentity/next-dev-docs/issues/new?assignees=&labels=%F0%9F%8C%9F+enhancement&projects=&template=enhancement.yml) to make the docs better
- [open a GitHub issue](https://github.com/gobeyondidentity/next-dev-docs/issues/new?assignees=&labels=triage&projects=&template=content-issue.yml&title=%5BContent+issue%5D%3A+) to report an issue with the content (something is incorrect or confusing)

The team will track these ideas and issues to address your feedback. 

]



???






---
template: inverse

## BEST PRACTICES.
---
.left-column[
  ## Best Practices
  ### Content Development
]
.right-column[

To keep the process productive and beneficial for all involved:

- Always **verify your content for technical accuracy** before submitting your Pull Request. Your Pull Request should be of a final draft.

- Always **consult with the Sr. Technical Writer when adding topics** or want to propose changes to the content structure. The Sr. Technical Writer maintains the content's quality, reduces duplication, and provides a consistent user experience. They can also strategize how to deliver complex information—for example, adding an explainer video (~90 secs) can help with complex scenarios or issues.



]

???


---
.left-column[
  ## Best Practices
  ### GitHub 
]
.right-column[


- Always **create a *working branch* when introducing logically related changes** and keep your branch up-to-date. This helps you manage your changes through the workflow. We refer to it here as a working branch because it's a workspace to iterate or refine your changes until they can be integrated into the default branch.

- Always **check and remove unused personal branches** periodically for easy maintenance. Usually, when your branch is merged, you can safely delete it.


]

???



---
template: inverse

## SITE ORGANIZATION AND FILES.
---
.left-column[
  ## Site Organization
  ### Content Files
]
.right-column[

- `/docs/` - Contains the Markdown files for the docs. Customize the order of the docs sidebar in `sidebars.js`.

  - `/docs/images` - Images used in the documentation.

  - `/docs/includes` - Reusable content such as feature descriptions, notes, common steps, and so on.

- `versioned_docs` - Contains the markdown files for the previous supported versions (v0 and v1).

- `versioned_sidebars` - Contains the sidebar files for the previous versions.

- `/sidebar.js` - Specify the order of documents in the sidebar. If you have a new file to add to the site, modify this file.

- `static/api` - Contains the API documentation for v0 and v1.

]

???



---
.left-column[
  ## Site Organization
  ### Doc Site Config Files
]
.right-column[

- `/docusaurus.config.js` - A config file containing the site configuration.

- `/src/` - Non-documentation files like pages, custom React components, or Docusaurus native components.

- `/static/` - Static directory. Any contents inside here will be copied into the root of the final `build` directory.

- `/package.json` - A Docusaurus website is a React app. You can install and use any npm packages you like in them.



]

???




---
.left-column[
  ## Doc Site Branches

]
.right-column[

Before starting the authoring work, you must understand the different branches to work on. You'll use your branch to work on content for a certain issue or feature, but you'll submit your Pull Request against one of the branches listed below: 

- **`main`** - protected branch
    
    Docs for https://deverloper.beyondidentity.com/. This branch contains the most recent stable release content.
    
- **`docs-staging`** - protected branch
    
    Docs for the upcoming release. When Secure Customer has a release, its `docs-staging` branch will be merged into `main`.
    
- Branches starting with **`release-`** contain archived release documentation for historical tracking, such as `release-xx`.

- **`active-development`** - protected branch (used for front-end and back-end development). 



]

???



---
template: inverse

## PULL REQUESTS.
---

.left-column[
## Pull Requests
### Guidelines

]
.right-column[

Points to note when you are submitting a PR.

- Try to make the review cycle short.

- Make sure the markdown follows the style guidelines of this project.

- Perform a self-review of your markdown, especially spelling errors.

- Verify that the PR does not generate new warnings before pushing your changes. The best way is to run the clear command.
  
  ```nodejs
  npm run clear
  yarn build
  ```

---  

After your changes pass the validation and get staged to Vercel, you can start the review process.  

You can verify your changes at the appropriate URL: https://developer-docs-git-{your-branch-name}-beyondidentity.vercel.app/<path-to-your-article-without-the-md-extension>.

]

???





---
.left-column[
## Pull Request
### Reviewer Guidelines
]
.right-column[




#### Be kind in code reviews

- Step away from your personal opinions on how things should be. It's not time to be nit-picky and rude.

- Find at least one good thing to say about the pull request, and always thank the contributor.

- If you get a pull request that you don't plan to merge, maybe because it's the wrong scope or direction or something you don't want to add, it is important to deal with it straightaway instead of ignoring it. It does not help anyone to ignore pull requests, and it only serves to clutter your repository. Thank the contributor, explain why you don't plan to merge the changes and close the pull request.

- If you merge the changes, tag the contributor when it goes out so they know it had an impact.


]

???






---
.left-column[
## Pull Request
### Reviewer Guidelines
]
.right-column[

#### Be responsive

It is important to be responsive and not let people wait. Giving someone some response—even if you can't help them right now—and setting expectations for when you can follow up is super-important.

Sometimes a comment goes undiscovered—you miss a notification and find it three months later. It's tricky to respond in those situations, but it's still better to acknowledge the message, apologize for the delay, and ask if they still want help (with this or something else) rather than just ignore them forever. It sets the tone that you care about your work and community, even when you make mistakes.



]

???



---
.left-column[
## Pull Request
### Merging
]
.right-column[

Remember, your pull request has to be merged by the Sr. Technical Writer before the changes can be included in the next scheduled publishing run. Pull requests are normally reviewed/merged in the order of submission. If your pull request requires merging for a specific publishing run, you must work with your PR reviewer to ensure that merging happens before publishing.

Articles can take up to 15 minutes to appear online after publishing. 



]

???






---
template: inverse

## MINOR CHANGES.
#### [HOW TO]
---
.slide-inverse[
## Minor changes


 
<div style="position: relative; padding-bottom: calc(68.66666666666666% + 44px); height: 0;"><iframe src="https://app.supademo.com/embed/clk7fd03gua59zgx6kvjhjj84" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


]

???





---


template: inverse

## SIGNIFICANT CHANGES. 
#### [HOW TO]

---
.left-column[
## Areas in progress
]
.right-column[


]

???



---
template: inverse

## ADDING TOPICS.
#### [HOW TO]

---
.left-column[
## Areas in progress
]
.right-column[


]

???




---
template: inverse

## SUPPORT CHANNELS.

---
.left-column[
## Areas in progress
]
.right-column[


]

???





---
.left-column[
## Referenced links
]
.right-column[



]

???



---
name: last-page
template: inverse

## Thank you!

Slideshow created using [remark](http://github.com/gnab/remark).