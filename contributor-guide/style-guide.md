# Style guide

This section gives writing style guidelines for the Beyond Identity documentation.


## Content types

| Topic type | What is it | When to use it |
| --- | --- | --- |
| Overview/Intro | Required: One article explaining the service from a technical point of view.<br /><br />Optional: A  second article comparing features across related services/projects. | For new customers. To explain the service, technology, or functionality from a technical point of view. It isn't intended to define benefits or value prop; that would be in marketing content. |
| Quickstarts | Recommended: Fundamental day-1 instructions for new customers familiar with similar products to quickly try a specific product/service. <br /><br />Customers are familiar with your product or used something similar, and they don’t want to know what to do — they want to know how they do it with your particular product.<br /><br />The focus is on getting the product/service into customers’ hands so they can use it, not documenting the procedure for setting it up. | When new customers are familiar with similar products, and you want to get the service, technology, or functionality into their hands in less than 10 minutes. <br /><br />Quickstarts are preferred but not required if no meaningful functionality can be introduced to new users in under 10 minutes. |
| Getting started | Recommended: Intended for people unfamiliar with your product and similar products — basically, for ‘newbies’ in that field or area. <br /><br />The focus is on giving the users basic concepts, ideally — detailed setup guidelines and explanations about each step they are making and why they are doing what you’re telling them to do. | When new customers are unfamiliar with similar products, and you want to onboard them with detailed setup guidelines with explanations about each step. |
| Concepts | Recommended: In-depth explanation of functionality related to a service(s) fundamental to understanding and use. | When you want to:<ul><li>explain what something is and define its critical functions</li><li>describe how something works or what happens when something is done</li><li>provide guidelines for completing a job task in varied situations</li></ul> |
| How-to | Required: Procedural articles that show the customer how to accomplish a specific task. It focuses on the 'How.'<br /><br />It assumes you only care about knowing what to do to get something done. As a result, it will often provide the bare minimum level of relevant information in completing a task. | To provide the steps to help customers complete specific tasks in their environment. How-to guides include optional information, explanations, and information to help inform decisions. |
| Troubleshooting | Recommended: Articles that help users solve a common issue. | To help resolve a specific error or problem that customers commonly run into and would search on. |
| Reference | Recommended: Documentation for APIs, PowerShell cmdlets, CLI commands, or other types of language-based content. | To provide descriptions of things like settings, values, keywords, and configurations. These topics are where readers will go to look up a specific value. |
| Resources | Recommended: Non-technical content customers may find useful as they use the product/service. | To provide links to supporting information like pricing, Stack Overflow, blogs, regional availability, video library. |
| Tutorials | Optional: Learning-based procedures where the focus is first on the ‘Why’ and then the 'How.' They give more detail at each step of the process to provide an understanding of why it is that what you are doing is relevant or why it works.<br /><br />For example, a 'how to' might go something like "…pour salt and leave for 5 minutes.” In contrast, a Tutorial would be more like "…pour salt and leave for 5 minutes to allow the salt enough time to dissolve in the water completely". | To show the single best procedure for completing a top 10 customer task. |
| FAQs | Optional: Common questions a customer asks or would ask about using the product.  These questions will come from product and support. <br /><br />These should not replace troubleshooting articles.  Instead, the FAQs can address some commonly asked questions with a short answer with a link to more details that are in the troubleshooting article. | To help customers with questions about the usage of the product.  Sometimes this is the first place a customer goes when they approach end-user documentation. |


## Best practices

- Start documentation early as it's an ongoing part of the software development lifecycle and must begin alongside writing the software itself.
- Focus on key issues, specifically those where customers submit the most support tickets or stumble the most.
- Include visuals like screenshots, diagrams, and videos to add variety to break up the monotony of text and create a more pleasurable user experience. They can also illustrate instructions that can be clunky and difficult to communicate with words.
- Check the spelling and grammar in your articles.
- Use a casual and friendly voice—like you're talking to another person one-on-one.
- Use simple sentences. Easy-to-read sentences mean the reader can quickly scan and use the guidance you share.


## 🗣 Voice and tone

We aspire to follow these principles when we write technical content. We might not always get there, but we need to keep trying!

- **Focus on the customer intent**: Customers have a specific purpose in mind when they consult our documentation. Before you begin writing, clearly determine who the customer is and what task he or she is trying to do. Then, write your article to help that specific customer do that specific task.
    - As a \<customer\>, I \<want to\> \<because\>.
- **Use everyday words**: Try to use natural language, the words your customers use. Be less formal but not less technical. Provide examples that explain new concepts.
- **Write concisely**: Don't waste words. Be affirmative and don't use extra words. Keep sentences short and concise. ***Keep your article focused*** on the scenario or goal (the customer intent). Also, keep the number of notes to a minimum. Use a screenshot when it can save words.
- **Make your article easy to scan**: Put the most important things first. Use sections to chunk long procedures into more manageable groups of steps. (Procedures with more than 12 steps are probably too long.) Use a screenshot when it adds clarity. Also, use sentence case for titles (headings) as they are easier to scan.
- **Show empathy**: Use a supportive tone in the article, and keep disclaimers to a minimum. Honestly call out areas that will be frustrating to customers. Make sure the article focuses on what matters to customers; don't just give a technical lecture.


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
- **Shape:** rectangle **(circles are unacceptable)**

### Alt-text guidelines

Begin with the type of image, for example, "Screenshot of…" or "Diagram showing…".  This will soon become a validation error in the publication build and will block the pull request.

<table id="64876c23-e526-4542-970d-13b4185630f8" class="simple-table"><tbody><tr id="a06b7622-f60a-4434-b0d2-980a6b4bf174"><td id="?ncm" class=""><strong>Diagrams</strong><ul><li>Express the core idea of the image.</li><li>Don&#x27;t describe the image literally. For example, &quot;<em>Diagram of Text Analytics service usage. Lines with arrows connect the two elements and show text flowing to the service and a numeric score being returned.</em>&quot;</li><li>Don&#x27;t write in the style of a title or caption. For example, &quot;<em>Use of the Text Analytics service</em>&quot;</td><td id=":aP|" class=""><strong>EXAMPLE:</strong>
&quot;<em>Diagram showing a Logic App using the detect-sentiment action to invoke the Text Analytics service.</em>&quot;</li></ul>
</td></tr><tr id="32888b3d-71d2-4976-82b0-2c63eb6d0ab0"><td id="?ncm" class=""><strong>Screenshots of UIs</strong><ul><li>Begin with &quot;Screenshot of&quot;</li><li>Identify the product</li><li>Identify highlighted areas</li><li>Include the location of UI elements, state of UI controls, and any relevant values in data-entry fields</td><td id=":aP|" class=""><strong>EXAMPLE:</strong>
&quot;<em>Screenshot of the Visual Studio Debug menu. The menu entry titled Start Without Debugging and its keyboard shortcut Ctrl+F5 are highlighted.</em>&quot;</li></ul></td></tr><tr id="afe91caf-428d-49eb-8c69-fe68b34bd22f"><td id="?ncm" class=""><strong>Screenshots of CLIs</strong><ul><li>Provide both alternative text and a long description</li><li>The long description should include all relevant text shown in the screenshot</li><li>The long description should differentiate between each command and the output of those commands</td><td id=":aP|" class=""><strong>EXAMPLE:</strong>
&quot;<em>Screenshot of the Azure Cloud Shell using the PowerShell environment to launch a session and execute the Get-User command.</em>&quot;</li></ul></td></tr></tbody></table>


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

## ✍ Writing principles

List 3-5 writing principles that content designers should follow when writing this type of message.

### All topics MUST have an introduction

As the first paragraph for a topic, including heading 2 within the topic, the introduction provides an overview that allows the reader to decide whether to read on quickly.

Guidelines:

- Minimum length = 50 words
- Use complete sentences

Avoid starting short descriptions with phrases such as "This topic describes..." or "This topic is about...."

| :no_entry_sign: **DON'T** |
| --- |
| This support article lists steps to take if you're receiving the message “The version of Beyond Identity that you are on is no longer supported”.  |

Instead, use something like, "In this guide, you'll do XYZ (what they will accomplish by the end of this guide)..." or “In this article, you’ll….”

| :white_check_mark: **DO** |
| --- |
| In this article, you’ll learn what to do when you get *The version of Beyond Identity that you are on is no longer supported* message.  |

### Focus on the customer’s intent

Customers have a specific purpose in mind when they consult our documentation. Before you begin writing, clearly determine who the customer is and what task he or she is trying to do. Then, write your article to help that specific customer do that specific task.

As a <customer>, I <want to> <because>.


### Use everyday words

Try to use natural language, the words your customers use. Be less formal but not less technical. Provide examples that explain new concepts.

### Write concisely

Don't waste words. Be affirmative and don't use extra words. Keep sentences short and concise. Keep your article focused on the scenario or goal (the customer intent). Also, keep the number of notes to a minimum. Use a screenshot when it can save words.

### Make your article easy to scan

Put the most important things first. Use sections to chunk long procedures into more manageable groups of steps. (Procedures with more than 12 steps are probably too long.) Use a screenshot when it adds clarity. Also, use sentence case for titles (headings) as they are easier to scan.

### Use minimalist design

Minimalism is a design philosophy that focuses on a user-centered approach. In this approach, we structure information based on users' essential tasks.

### Avoid gerunds in headings

Gerunds introduce a lot of visual repetition, which hinders skimming and causes noise.

### <Principle 2>

### <Principle 3>

## 💡 Tips and tricks

Use this section to suggest hints to help writers create more effective copy for this message type. For example, offer guidance on how to approach message types that appear in more than one context.

- Add your tip here