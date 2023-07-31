# Style guide

This section gives writing style guidelines for the Beyond Identity documentation.


## Best practices

1. **Consistency**
   - Use a consistent writing style throughout the documentation.
   - Maintain consistent formatting, such as heading styles, font sizes, and code formatting.
   - Use consistent terminology and language to describe concepts and features.

2. **Clarity and Simplicity**
   - Use clear and concise language to explain technical concepts.
   - Avoid jargon or explain technical terms when necessary.
   - Break down complex ideas into smaller, understandable sections.
   - Use examples, diagrams, and visuals to enhance clarity.

3. **Structure and Organization**
   - Use a logical and hierarchical structure for your documentation.
   - Provide clear and informative headings and subheadings.
   - Use bullet points or numbered lists for step-by-step instructions or procedures.
   - Group related information together for easy navigation.

4. **Audience Awareness**
   - Identify and understand your target audience (developers, system administrators, beginners, etc.).
   - Adapt your writing style and language to match the knowledge level of your audience.
   - Include introductory sections or tutorials for beginners.
   - Provide advanced sections or references for experienced users.

5. **Code Conventions**
   - Follow established coding conventions and style guidelines for code snippets.
   - Use syntax highlighting for code blocks.
   - Clearly indicate placeholders or variables in code examples.
   - Include comments where necessary to explain complex code segments.

6. **Error Handling and Troubleshooting**
   - Include troubleshooting guides or FAQs to address common issues.
   - Provide error messages, error codes, and possible solutions.
   - Explain how to diagnose and debug common problems.
   - Offer tips and best practices for effective error handling.

7. **Use of Images and Multimedia**
   - Include relevant screenshots, diagrams, and illustrations to aid understanding.
   - Use images to illustrate complex processes or user interface elements.
   - Ensure images are clear, properly labeled, and referenced in the text.

8. **Collaboration and Feedback**
    - Encourage user feedback and questions.
    - Regularly review and incorporate user feedback into the documentation.
    - Collaborate with subject matter experts to ensure accuracy and completeness.


## Voice and tone

We aspire to follow these principles when we write technical content. We might not always get there, but we need to keep trying!


|Principle  |Description  |
|---------|---------|
| **Focus on the customer’s intent**  | Customers have a specific purpose in mind when they consult our documentation. Before you begin writing, clearly determine who the customer is and what task he or she is trying to do. Then, write your article to help that specific customer do that specific task.<br /><br />*As a \<customer\>, I \<want to\> \<because\>.*        |
| **Use everyday words**  |   Try to use natural language, the words your customers use. Be less formal but not less technical. Provide examples that explain new concepts.      |
| **Write concisely**  |   Don't waste words. Be affirmative and don't use extra words. Keep sentences short and concise. ***Keep your article focused*** on the scenario or goal (the customer intent). Also, keep the number of notes to a minimum. Use a screenshot when it can save words.      |
| **Make your article easy to scan** |  Put the most important things first. Use sections to chunk long procedures into more manageable groups of steps. (Procedures with more than 12 steps are probably too long.) Use a screenshot when it adds clarity. Also, use sentence case for titles (headings) as they are easier to scan.       |
| **Use minimalist design**  |  Minimalism is a design philosophy that focuses on a user-centered approach. In this approach, we structure information based on users' essential tasks.       |
| **Show empathy**  | Use a supportive tone in the article, and keep disclaimers to a minimum. Honestly call out areas that will be frustrating to customers. Make sure the article focuses on what matters to customers; don't just give a technical lecture.  | 
| **Write in active voice** | Use present tense rather than future or past tense as much as possible.<br /><br />Exceptions: Passive voice is acceptable when any of these conditions are true:<ul><li>The system performs the action.</li><li>It is more appropriate to focus on the receiver of the action.</li><li>You want to avoid blaming the user for an error, such as in an error message.</li><li>The information is clearer in the passive voice.</li></ul> | 
| **Use second person** | Using "you" instead of "we" and "our" to speak directly to the user. |



## Writing principles


### Headings and titles

Headings provide both structure and visual points of reference to help readers scan content. If you can break text logically into smaller sections, the extra spacing and distinct fonts associated with headings will help readers scan content and find entry points.

**Top-level** headings communicate what's most important and divide content into major subjects representing the **lower-level** headings. 

```javascript title="markdown file"
 // highlight-start
 // Top-level heading in the metadata 
 ---
 title: Top-level heading
 ...
 ---
 // highlight-end 

 OR

 // highlight-next-line
 # Top-level heading

 ---

 // highlight-start
 // Lower-level headings within the topic
 ## Lower-level heading

 ### Lower-level heading

 ...
  // highlight-end
```


- 👉 When there's a lot to say under a top-level heading, look for two or more distinct topics, and use lower-level headings (subheads) to break up the large section into more scannable chunks. If you can't find at least two distinct topics, skip the lower-level headings.

- Avoid having two headings in a row without text in between—that might indicate a problem with organization or that the headings are redundant. But don't insert filler text just to separate the headings.

- Each new heading represents a new or more specific topic. The heading should introduce the topic in an interesting way.

- Use headings judiciously. One heading level is usually plenty for a page or two of content. For long content, you might need to use additional heading levels. 

- 👉 Keep headings as short as possible, and put the most important idea at the beginning. 

- Be as specific as you can to catch the reader's attention, and be even more detailed with lower-level headings. For example, a lower-level heading should be more specific than a top-level heading.

- Focus on what matters to customers, and choose words they'd use themselves. In most cases, don't talk about products, features, or commands in headings. Concentrate on what customers can achieve or what they need to know.

- Don’t use ampersands (&) or plus signs (+) in headings unless you're referring to the UI that contains them or space is limited.

- Avoid hyphens in headings if you can. In resized windows or mobile devices, they can result in awkward line breaks.

- Use vs., not v. or versus, in headings.

- Use sentence-style capitalization for headings. Capitalize only the initial letter of the first word in the text and other words that require capitalization, such as proper nouns. Examples of proper nouns include the names of specific people, places, companies, languages, protocols, and products.

- Avoid using gerunds for headings. Gerunds introduce a lot of visual repetition, which hinders skimming and causes noise.

- Consider the following examples for a specific content type:

  | Content type | Examples |
  | --- | --- |
  | For tasks and procedures, start with a verb  | <ul><li>Build an API response</li><li>Set the active build configuration</li></ul>  |
  | For conceptual, overview, and reference information, use noun phrases for headings  | <ul><li>Query language</li><li>Platform and application integration</li></ul>  |
  | For titles of guides, videos, and stand-alone information units (i.e., whitepapers)  | Use headline-style capitalization. <ul><li>Installation and User's Guide</li><li>Quick Start Guides or discrete sets of product documentation</li></ul>  |

### Topic and section introductions

All topics MUST have an introduction.  As the first paragraph for a topic, including heading 2 within the topic, the introduction provides an overview that allows the reader to decide whether to read on quickly.

Guidelines:

- Minimum length = 50 words
- Use complete sentences

Avoid starting short descriptions with phrases such as "This topic describes..." or "This topic is about...."

| :no_entry_sign: **DON'T** |
| --- |
| This support article lists steps to take if you're receiving the message “The version of Beyond Identity that you are on is no longer supported”.  |

<br />

Instead, use something like, "In this guide, you'll do XYZ (what they will accomplish by the end of this guide)..." or “In this article, you’ll….”

| :white_check_mark: **DO** |
| --- |
| In this article, you’ll learn what to do when you get *The version of Beyond Identity that you are on is no longer supported* message.  |

### Interface controls

Categories: checkboxes, fields, icons, menu choices, menu names, buttons, radio buttons, and Tabs.

Style: **Bold**

Example: From the Admin Console, under **Directory**, select **Identities > Add identity**.

## Links

Links need to be clear and predictable. Merchants should be able to anticipate what will happen when they select a link. Never mislead someone by mislabeling a link.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| Get started with the [Universal Passkeys](#). | Want to learn more about Universal Passkeys? [Click here](#).<br /><br />Links should never use “click here” or “here” as link text.  |

### Links in a sentence

Links in full sentences shouldn’t link the entire sentence, only the text that describes where merchants go when they select the link.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| Create a [Resource Server](#). | [Create a Resource Server.](#)  |


### “Learn more” links

When linking out to documentation from help text in the admin, link the relevant key words. In general, don’t add another sentence starting with “Learn more...”, because it’s repetitive and takes up unnecessary space.

Only add a “Learn more...” sentence if the help text addresses more than one concept, each of which could be linked to their own help doc. In that situation, pick the most appropriate link and contextualize it with “Learn more...”.


## Clarify results of actions

Show results of actions in the same step as the task and be clear about where in the flow the reader is. In general, omit results statements unless the result is surprising or unexpected.

| What | When to use |
| --- | --- |
| **Put actions and results in the same step**  | If you need to mention the results of a user action, then do it in the same numbered step that describes that action (don’t use a separate numbered step).  |
| **Mention earlier steps to reinforce order of tasks**  |  You can refer to an earlier step to reinforce the order of the steps.<br /><br />For progress within a series of steps, use the phrase “When you’ve” or “After you’ve.” Avoid using “Once you’ve.”<br /><br />For progress between tasks, begin a section with “Now that you’ve” or “After you’ve” (referring back to the previous action or step). |


## Images and screenshots

Use 100% zoom when capturing screenshots on adjustable apps.

Resize image in editor.

Image dimensions for images like the Admin Console should not exceed 1200 px.  This size is great for the larger images.  For dialog boxes or smaller windows should be consistent throughout the article so that the sizes, when displayed on docs, are all over the place.

### Callouts

Red box guidelines (this is not done consistently from the contributors --- they like to use a thicker line (5 px or higher) and they use a different color red):

- **Hex:** EF1B36
- **RGB:** 239, 27, 54
- **Line width:** 3.0 px
- **Line stroke:** solid
- **Drop shadow:** none
- **Shape:** rectangle **(circles are unacceptable)**

### Alt-text guidelines

Begin with the type of image, for example, "Screenshot of…" or "Diagram showing…".  This will soon become a validation error in the publication build and will block the pull request.

| Type | Guidelines |
| --- | --- |
| **Diagrams**  | <ul><li>Express the core idea of the image.</li><li>Don't describe the image literally. For example, "<em>Diagram of Text Analytics service usage. Lines with arrows connect the two elements and show text flowing to the service and a numeric score being returned.</em>"</li><li>Don't write in the style of a title or caption. For example, "<em>Use of the Text Analytics service</em>"</li></ul><br />**EXAMPLE**<br />_"Diagram showing a Logic App using the detect-sentiment action to invoke the Text Analytics service."_  |
| **Screenshots of UIs**  | <ul><li>Begin with "Screenshot of"</li><li>Identify the product</li><li>Identify highlighted areas</li><li>Include the location of UI elements, state of UI controls, and any relevant values in data-entry fields</li></ul><br />**EXAMPLE:**<br />_"Screenshot of the Visual Studio Debug menu. The menu entry titled Start Without Debugging and its keyboard shortcut Ctrl+F5 are highlighted."_  |
| **Screenshots of CLIs**  | <ul><li>Provide both alternative text and a long description</li><li>The long description should include all relevant text shown in the screenshot</li><li>The long description should differentiate between each command and the output of those commands</li></ul><br />**EXAMPLE**<br />_"Screenshot of the Azure Cloud Shell using the PowerShell environment to launch a session and execute the Get-User command." _  |


## Consider reusability

Reusability is the key to scalability by creating content once and using it everywhere (or in multiple places). You can achieve this through structured content, which deconstructs content into "blocks" that you use to restructure to create new experiences.

Topics should be:

- *Individually authorable*. Each topic is about one area and can be created on its own.
- *Always reusable*. A single topic can appear in multiple places and across different channels, so it should be free of being locked to specific content or layout and be used anywhere.
- *Independently understandable*. Each topic should be sufficiently complete so that it can be presented alone. In other words, the topic can stand alone without context but can also be used with context.

Examples include notes, cautions, standard steps in a task-oriented or scenario, or goal-based topics like an integration guide. A better example would be the “Configure Beyond Identity” section of the integration guides because they all have this section. Therefore, we would only update the reusable topic if these instructions change.

### Benefits of content reuse

Assuming Secure Workforce and Secure Customer are in the same content/document management system, reusing content benefits product documentation in these critical areas:

- **Increased consistency.** Reusing the topic through a content management system helps ensure that the topic is consistent wherever it is used.
- **Reduced content development and maintenance.** A topic is written once and stored in a content management system. As a result, development costs are reduced because a topic can be retrieved for reuse. In addition, changes to a topic can be applied everywhere the topic is used.
- **Rapid reconfiguration.** Using smaller units of information, such as a topic, makes it easier to change the order of the topics, include new topics, and exclude existing topics. Topics can be used to build new articles.

### Guidelines for content reuse

Writing for reuse requires writing without context. These guidelines help to make sure that topics are written for reuse in a variety of contexts.

- **Make few assumptions about reading order** because you might not know how users come to the topic. Also, depending on the context, topics within a collection might be organized differently.
- **Provide contextual cues** to help readers understand where information belongs within a large structure. For example, if sequential order is important in a complex task, provide a sense of what comes before and after a topic.
- **Give the precise location of related information.** Avoid the words *above* or *below* in the text as much as possible. These indicators have no meaning in a non-linear context. Instead, use *next* or *previous* if the information is contained in the same topic (article in our case).


## Word usage

### Avoid "may"

Use "can" to indicate ability, or use "might" to indicate possibility.

**Example**

- **Indicating ability**
  
  | :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
  | --- | --- |
  | You can use the command line interface to update your application. |  You may use the command line interface to update your application. |




- **Indicating possibility**

  | :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
  | --- | --- |
  | You might need more advanced features when you are integrating with another application. | You may need more advanced features when you are integrating with another application. |

### Use “make sure” and “confirm” for important tasks

When asking the reader to confirm something, use one of the following terms:

- “Make sure” in cases where there’s still a related important task (instead of “check that” or “verify that”).

- “Confirm” in cases where the reader has already been told to do something, and you’re now reminding them.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
|  |   |

## Tips and tricks

Use this section to suggest hints to help writers create more effective copy for this message type. For example, offer guidance on how to approach message types that appear in more than one context.

- Add your tip here


## Content types

| Topic type | What is it | When to use it |
| --- | --- | --- |
| **Overview/Intro** | Required: One article explaining the service from a technical point of view.<br /><br />Optional: A  second article comparing features across related services/projects. | For new customers. To explain the service, technology, or functionality from a technical point of view. It isn't intended to define benefits or value prop; that would be in marketing content. |
| **Quickstarts** | Recommended: Fundamental day-1 instructions for new customers familiar with similar products to quickly try a specific product/service. <br /><br />Customers are familiar with your product or used something similar, and they don’t want to know what to do — they want to know how they do it with your particular product.<br /><br />The focus is on getting the product/service into customers’ hands so they can use it, not documenting the procedure for setting it up. | When new customers are familiar with similar products, and you want to get the service, technology, or functionality into their hands in less than 10 minutes. <br /><br />Quickstarts are preferred but not required if no meaningful functionality can be introduced to new users in under 10 minutes. |
| **Getting started** | Recommended: Intended for people unfamiliar with your product and similar products — basically, for ‘newbies’ in that field or area. <br /><br />The focus is on giving the users basic concepts, ideally — detailed setup guidelines and explanations about each step they are making and why they are doing what you’re telling them to do. | When new customers are unfamiliar with similar products, and you want to onboard them with detailed setup guidelines with explanations about each step. |
| **Concepts** | Recommended: In-depth explanation of functionality related to a service(s) fundamental to understanding and use. | When you want to:<ul><li>explain what something is and define its critical functions</li><li>describe how something works or what happens when something is done</li><li>provide guidelines for completing a job task in varied situations</li></ul> |
| **How-to** | Required: Procedural articles that show the customer how to accomplish a specific task. It focuses on the 'How.'<br /><br />It assumes you only care about knowing what to do to get something done. As a result, it will often provide the bare minimum level of relevant information in completing a task. | To provide the steps to help customers complete specific tasks in their environment. How-to guides include optional information, explanations, and information to help inform decisions. |
| **Troubleshooting** | Recommended: Articles that help users solve a common issue. | To help resolve a specific error or problem that customers commonly run into and would search on. |
| **Reference** | Recommended: Documentation for APIs, PowerShell cmdlets, CLI commands, or other types of language-based content. | To provide descriptions of things like settings, values, keywords, and configurations. These topics are where readers will go to look up a specific value. |
| **Resources** | Recommended: Non-technical content customers may find useful as they use the product/service. | To provide links to supporting information like pricing, Stack Overflow, blogs, regional availability, video library. |
| **Tutorials** | Optional: Learning-based procedures where the focus is first on the ‘Why’ and then the 'How.' They give more detail at each step of the process to provide an understanding of why it is that what you are doing is relevant or why it works.<br /><br />For example, a 'how to' might go something like "…pour salt and leave for 5 minutes.” In contrast, a Tutorial would be more like "…pour salt and leave for 5 minutes to allow the salt enough time to dissolve in the water completely". | To show the single best procedure for completing a top 10 customer task. |
| **FAQs** | Optional: Common questions a customer asks or would ask about using the product.  These questions will come from product and support. <br /><br />These should not replace troubleshooting articles.  Instead, the FAQs can address some commonly asked questions with a short answer with a link to more details that are in the troubleshooting article. | To help customers with questions about the usage of the product.  Sometimes this is the first place a customer goes when they approach end-user documentation. |