# Style guide

This section gives writing style guidelines for the Beyond Identity documentation.


## Best practices

When arranging information on a page, there are several crucial guidelines to consider that will make your content more effective and helpful to your audience.

1. **Prioritize quick reader feedback**. It's important to inform readers as quickly as possible if they cannot complete a process due to unmet requirements, ineligibility to use a feature, or if continuing an action would be unproductive. This approach values the reader's time and allows them to identify more suitable alternatives swiftly.

1. **Equip every reader with a solution or next step**. Every process you describe should conclude with a clear solution or next step for the reader. For instance, if a process entails adding a feature to a product but necessitates the latest product version, notify the user of this constraint before presenting the steps and offer a link to instructions on how to upgrade.

1. **Stick to the facts**. To sustain trust with your readers, omit any marketing or promotional content from your help sections. While these sections can elucidate a product's or feature's advantages, they should limit their discussion to the direct benefits, carefully avoiding unfounded claims of improvements in speed, quality, or ease of use.

1. **Focus on the usage rather than the benefit**. It's important to frame your content regarding how a reader can utilize a product or feature, as this approach allows them to comprehend the information better and envision how it would integrate into their own circumstances.

1. **Consistency is key**. Use a consistent writing style throughout the documentation and consistent terminology and language to describe concepts and features.

1. **Clarity and simplicity are crucial**. Use clear and concise language to explain technical concepts, avoiding jargon or explaining technical terms when necessary. Break down complex ideas into smaller, understandable sections and use examples, diagrams, and visuals to enhance clarity.

1. **Structure and organization are important for easy navigation**. Use a logical and hierarchical structure for your documentation, provide clear and informative headings and subheadings, use numbered lists for step-by-step instructions or procedures, and use bullet points for lists where the order doesn't matter. Group related information together for easy navigation.

1. **Be aware of your audience**. Identify and understand your target audience (developers, system administrators, beginners, etc.), and adapt your writing style and language to match the knowledge level of your audience. Include introductory sections at the top of each topic for beginners, and provide advanced sections or references for experienced users.

1. **Follow code conventions**. Use syntax highlighting for code blocks, clearly indicate placeholders or variables in code examples, and include comments to explain complex code segments where necessary.

1. **Provide comprehensive error handling and troubleshooting advice**. This includes troubleshooting guides, FAQs, or in-line notes to address common issues, providing error messages, error codes, and possible solutions, explaining how to diagnose and debug common problems, and offering tips and best practices for effective error handling.

1. **Use images and multimedia where appropriate**. Including relevant screenshots, diagrams, and illustrations can aid understanding, particularly when illustrating complex processes or user interface elements. Ensure images are clear, properly labeled, referenced in the text, and follow the guidelines.

1. **Encourage user feedback and questions**, regularly review and incorporate user feedback into the documentation, and collaborate with subject matter experts to ensure accuracy and completeness.

## Voice and tone

We aspire to follow these principles when we write technical content. We might not always get there, but we need to keep trying!


|Principle  |Description  |
|---------|---------|
| **Focus on the customer’s intent**  | Customers have a specific purpose in mind when they consult our documentation. Before you begin writing, clearly determine who the customer is and what task he or she is trying to do. Then, write your article to help that specific customer do that specific task.<br /><br />*As a &#60;customer&#62;, I &#60;want to&#62; &#60;because&#62;.*        |
| **Use everyday words**  |   Try to use natural language, the words your customers use. Be less formal but not less technical. Provide examples that explain new concepts.      |
| **Write concisely**  |   Don't waste words. Be affirmative and don't use extra words. Keep sentences short and concise. ***Keep your article focused*** on the scenario or goal (the customer intent). Also, keep the number of notes to a minimum. Use a screenshot when it can save words.      |
| **Make your article easy to scan** |  Put the most important things first. Use sections to chunk long procedures into more manageable groups of steps. (Procedures with more than 12 steps are probably too long.) Use a screenshot when it adds clarity. Also, use sentence case for titles (headings) as they are easier to scan.       |
| **Use minimalist design**  |  Minimalism is a design philosophy that focuses on a user-centered approach. In this approach, we structure information based on users' essential tasks.       |
| **Show empathy**  | Use a supportive tone in the article, and keep disclaimers to a minimum. Honestly call out areas that will be frustrating to customers. Make sure the article focuses on what matters to customers; don't just give a technical lecture.  | 
| **Write in active voice** | Use present tense rather than future or past tense as much as possible.<br /><br />Exceptions: Passive voice is acceptable when any of these conditions are true:<ul><li>The system performs the action.</li><li>It is more appropriate to focus on the receiver of the action.</li><li>You want to avoid blaming the user for an error, such as in an error message.</li><li>The information is clearer in the passive voice.</li></ul> | 
| **Use second person** | Using "you" instead of "we" and "our" to speak directly to the user. |



## Writing principles

Content should be written and structured to help users understand and take the most important actions.


### Headings and titles

Headings provide structure and visual reference points to help readers scan content. Structuring headings in a hierarchy can make a larger topic easily scannable while helping search engines understand the context of your content.

#### Effective headings

Effective headings make it clear to readers which sections of a document are most relevant to their current tasks. The heading should directly reflect the result of any actions or summarize the content within the section.

Headings also give readers a good sense of progress while moving from one task to the next.


#### Heading levels

**Top-level** headings communicate what's most important and divide content into major subjects representing the **lower-level** headings. Generally, the lower a heading is in the doc's hierarchy, the more flexible you can be with its tone. For example, low-level headings can be longer, more specific, or less formal.

Maintain the heading hierarchy throughout the doc, and follow heading levels. Don't skip heading levels. For example, go directly from H1 to H2, then to H3, etc. This helps the readers know where they are in the document, whether they're going through a specific workflow or scanning.


```javascript title=" markdown file"
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

 #### Lower-level heading

 ...
  // highlight-end
```

#### Best practices

- 👉 Keep headings short and place the most important idea at the beginning. If there is a lot to say, use lower-level headings to break up the section into smaller, more scannable chunks. 

- Avoid using h1 (#) headings. The metadata tile represents this heading level and is automatically displayed. Always start with h2 (##), and respect the order h2 → h3 → h4. Never skip the hierarchy level, such as h2 → h4. Avoid h5 and h6 as much as possible. If you have content with h5 and h6 headers, rethink the structure of your document. Can the content be better scanned in a table or bullet list?

- Avoid having two headings in a row without text in between, as this may indicate a problem with organization or redundancy. Do not use filler text to separate headings.

- Each new heading should introduce a new or more specific topic in an interesting way.

- Be specific to catch the reader's attention and use even more detail for lower-level headings.

- Focus on customer needs and use their vocabulary. Avoid talking about products, features, or commands in headings.

- Do not use ampersands (&) or plus signs (+) in headings unless referring to the UI or space is limited.

- Avoid hyphens in headings when possible to prevent awkward line breaks in resized windows or mobile devices.

- Use "vs." instead of "v." or "versus" in headings.

- Use sentence-style capitalization, capitalizing only the initial letter of the first word and other words that require capitalization, such as proper nouns.

- Avoid using gerunds in headings, as they introduce visual repetition that hinders skimming and causes noise.

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

When referring to labels of user interface items, do not include ending punctuation such as the ellipse (…) or colon (:). 

Whenever possible, refer to user interface items without identifying them as any special type of element. Complex dialogs may require more specific wording.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| click OK | click the OK button  |


### Acronyms

Acronyms and abbreviations can hurt clarity, voice, and findability. Although some acronyms are widely understood and preferred to the spelled-out term, others aren't well known or are familiar only to a specific group of customers.

- Only use acronyms that are familiar to your audience.

- If you must use an acronym, spell it out in the first instance for clarity. In general, include the acronym in parentheses following the spelled-out term. You can use the acronym without spelling it out on subsequent mentions in the same article, page, or screen.

- Don't introduce acronyms that are used just once. If an acronym will appear only once in your content, just spell out the term. Don't introduce it in parentheses after the spelled-out version.

- Be careful with acronyms in titles and headings. Avoid using an acronym for the first time in a title or heading unless it's a keyword you need to place in the title or heading for SEO. If the first use of the acronym is in a title or heading, introduce the acronym (in parentheses, following the spelled-out term) in the following body text.

- Lowercase all words in the spelled-out form of an acronym except for proper nouns. The names of many protocols and specifications are considered proper nouns and are capitalized when spelled out. 

   **Examples**

   - infrastructure as a service (IaaS)
   
   - dynamic-link library (DLL)

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
|  |   |

### Abbreviations
 
Do not use Latin abbreviations. Use the full English form: for example, use “that is” instead of “i.e.”. As an exception to this rule, the abbreviation etc. is allowed.

### Results of actions

Show results of actions in the same step as the task and be clear about where in the flow the reader is. In general, omit results statements unless the result is surprising or unexpected.


Put actions and results in the same step.  If you need to mention the results of a user action, then do it in the same numbered step that describes that action (don’t use a separate numbered step).  


### Referring to earlier steps

Mention earlier steps to reinforce order of tasks. You can refer to an earlier step to reinforce the order of the steps.

- For progress within a series of steps, use the phrase “When you’ve” or “After you’ve.” Avoid using “Once you’ve.”

- For progress between tasks, begin a section with “Now that you’ve” or “After you’ve” (referring back to the previous action or step).
### Links

Links need to be clear and predictable. Merchants should be able to anticipate what will happen when they select a link. Never mislead someone by mislabeling a link.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| Get started with the [Universal Passkeys](#). | Want to learn more about Universal Passkeys? [Click here](#).<br /><br />Links should never use “click here” or “here” as link text.  |

#### Links in a sentence

Links in full sentences shouldn’t link the entire sentence, only the text that describes where merchants go when they select the link.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| Create a [Resource Server](#). | [Create a Resource Server.](#)  |


#### “Learn more” links

When linking out to documentation from help text in the admin, link the relevant key words. In general, don’t add another sentence starting with “Learn more...”, because it’s repetitive and takes up unnecessary space.

Only add a “Learn more...” sentence if the help text addresses more than one concept, each of which could be linked to their own help doc. In that situation, pick the most appropriate link and contextualize it with “Learn more...”.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
|  |   |

## Word usage

### Avoid "and/or"

Rewrite the sentence to clarify the meaning. Note that or can mean _either_ or _both_.

**Example**

You can save the document using the current name or a new name.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| The **Events** page provides information on various types of events associated with user or device activity, or both.  | The **Events** page provides information on various types of events associated with user and/or device activity.   |

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

### Avoid "check that" or "verify that"

Use “make sure” or “confirm” instead. When asking the reader to confirm something for important tasks, use one of the following terms:

- Use “make sure” in cases where there’s still a related important task.   
  
  | :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
  | --- | --- |
  |  | instead of “check that” or “verify that”  |

- Use “confirm” in cases where the reader has already been told to do something, and you’re now reminding them.


### Avoid "Once you've"

You can refer to an earlier step to reinforce the order of the steps.

- For progress within a series of steps, use the phrase “When you’ve” or “After you’ve.” Avoid using “Once you’ve.”

- For progress between tasks, begin a section with “Now that you’ve” or “After you’ve” (referring back to the previous action or step).

## Images and screenshots

Use 100% zoom when capturing screenshots on adjustable apps.

Resize the image in an editor.

Image dimensions for images like the Admin Console should not exceed 1200 px.  This size is great for larger images.  Dialog boxes or smaller windows should be consistent throughout the article so that the sizes, when displayed in docs, are all over the place.

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