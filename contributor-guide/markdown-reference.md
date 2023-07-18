# Markdown reference guide
[1]: https://<domain>.com
[2]: https://<domain>.com "Beyond Identity Secure Workforce community"


## Basic formatting

| Format | Syntax |
| --- | --- |
| **Bold**  | `**Bold**`   |
| _Italic_ | `_Italic_` |
| ~~Strikethrough~~ | `~~Strikethrough~~` |
| Horizontal rules | `---` (three hyphens)<br />`***` (three asterisks)<br />`___` (three underscores)<br /><br />Whichever style you use, pick one and stick with it. |
| ***Bold and italic*** | `***Bold and italic***` |
| <u>Underline</u> | `<u>Underline</u>` |

## Headings

All heading levels (e.g., H1, H2, etc.), are marked by the hashtag (#) at the beginning of a line.  

```markdown
# This is a first level heading (H1)

## This is a second level heading (H2)

...

###### This is a sixth level heading (H6)
```

### Heading best practices
Always put a space between the hash tag and the heading name.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| `# Here's a Heading `  | `#Here's a Heading`  |

Also, put blank lines before and after a heading.

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| <pre>Put a extra space (blank line) before...<br /><br /># Heading<br /><br />...and after a heading.</pre>  | <pre>Put a extra space (blank line) before...<br /># Heading<br />...and after a heading.</pre>  |

## Links

| Link type | Description and syntax |
| --- | --- |
| **Basic link**     | `[inline](https://somecompany.com)`   |
| **Link with tooltip**  | You can add a tool tip to the link to help users learn more about where the link will take them (to avoid click bait).<br /><br />`[have a title](https://somecompany.com "Awesome tooltip")`  |
| **Relative link**  | `[like this](../blob/master/LICENSE.txt)`  |
| **Reference links**  | These are best for links that are used multiple times in an article, for example, the support link.<br /><br /><pre>`[1]: https://<domain>.com`<br /><br />`[Join our Slack community][1]`</pre>**Output**<br />[Join our Slack community][1]<br /><hr>You can add a tool tip to the link to help users learn more about where the link will take them (to avoid click bait).<br /><br /><pre>`[2]: https://<domain>.com "Beyond Identity Secure Workforce community"`<br /><br />`[Join the conversation][2]`</pre> |


## Images

Images can also be inline or use a reference style, like links, but with an exclamation point (!) at the front of the path. 

### Inline style

This is the most common method for using images in an article once.  If you’re using an image multiple times in the article, use the reference-style mentioned below.

```md
![alt text](path to image) //inline-style
```

**Example**   

```md
![alt text](https://<domain>.com/images/icon48.png "Logo Title Text 1")
```


### Reference style

Use this method for articles that have the same image in multiple places. For example, an integration guide might mention a couple of different methods of doing something, and those methods have the same image. Therefore, you’d want to use the reference style to reuse images.

```md
[logo]: https://<domain>.com/images/icon48.png "Logo Title Text 2"

<!-- Usage -->
![alt text][logo]
```

### Images with links

```md
[![alt text](imageurl)](linkurl)
```

### Other methods

```javascript
<img
  id="diagrams"
  src={require('../images/passkey-workflow-diagram.png').default}
  alt="Example banner"
/>
```

```javascript
import AuthenticationRequestDiagram from '../images/passkey-workflow-diagram.png';

<img src={AuthenticationRequestDiagram} id="diagrams" alt="Example banner" />;
```

## Lists

Lists are made by using indentation and a beginning-of-line marker to indicate a list item. 

### Unordered lists

Unordered lists can use an asterisk (`*`), plus (`+`), or minus (`-`) to indicate each list item. 

```md
* One item
* Second item
* Third item
* Fourth item
* Fifth item
```

**Output**
* One item
* Second item
* Third item
* Fourth item
* Fifth item

Don’t mix and match delimiters in the same list — pick one and stick with it. 

| :white_check_mark: **DO** | :no_entry_sign: **DON'T** |
| --- | --- |
| <pre>* One item<br />* Second item<br />* Third item<br />* Fourth item<br />* Fifth item</pre>  | <pre>* One item<br />+ Second item<br />- Third item<br />* Fourth item<br />+ Fifth item</pre>  |


### Ordered lists

Ordered lists use a number at the beginning of the line. The numbers do not need to be incremented - this will happen for you automatically by the HTML. That makes it easier to re-order your ordered lists (in markdown) as needed.

```md
3. Step
2. Step
4. Step
1. Step
```

OR

```md
1. Step
1. Step
1. Step
1. Step
```

**Output**   

1. Step
1. Step
1. Step
1. Step

### Nested unordered lists

Remember to pick a delimiter and stick with it. 

```md
* One item
* Another item
  * A sub-item
    * A deeper item
  * Back in sub-item land
* And back at the main level
```

**Output**   

* One item
* Another item
  * A sub-item
    * A deeper item
  * Back in sub-item land
* And back at the main level

### Nested ordered lists

```md
1. Step one
1. Step two
   1. Sub-step a
   1. Sub-step b
1. Step three
1. Step four
   1. Sub-step a
   1. Sub-step b
1. Step five
```

**Output**   

1. Step one
1. Step two
   1. Sub-step a
   1. Sub-step b
1. Step three
1. Step four
   1. Sub-step a
   1. Sub-step b
1. Step five

### Nested ordered and unordered lists

You can use both types of lists to nest items. In the example below, the unordered list under the second ordered list item refers to items that aren’t sequential (no need to perform a task in a specified order).

```md
* One item
* Another item
  1. A nested ordered list
  1. This is the second item
     * And now an unordered list as its child
     * Another item in this list
  1. One more in the ordered list
* And back at the main level
```

**Output**

* One item
* Another item
  1. A nested ordered list
  1. This is the second item
     * And now an unordered list as its child
     * Another item in this list
  1. One more in the ordered list
* And back at the main level


## Line breaks

For compatibility, use trailing white space **(spacebar)** or pressing **Enter** or **Shift+Enter** to add the line breaks manually. You can also use the `<br>` HTML tag at the end of the line. 

## Code and syntax highlighting

### Inline code

Individual elements (words) within a line.

Here's an example of `code` style.

Use code format when referring to named parameters and variables in a nearby code block in your text. Code format may also be used for properties, methods, classes, and language keywords. 

Use one backtick (\`) around the code.  This is the markdown version of the `<code>` tag in HTML.

### Code blocks

Use inline code blocks when it's impractical to display code by reference to a code file. 


Use three backticks (\```\) with the language. This is the markdown version of the `<pre>` tag in HTML.

  ```markdown
    ```javascript
    module.exports = {
      sidebar: [
        {
          type: 'category',
          label: 'Overview',
          items: ['release-notes', 'intro', 'how-it-works'],
        };
      ],
    ```
  ```

The example renders as:

```javascript
module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: ['release-notes', 'intro', 'how-it-works'],
    };
  ],
```




## Tables

The simplest way to create a table in Markdown is to use pipes and lines. To create a standard table with a header, follow the first line with dashed line:

```markdown
|This is   |a simple   |table header|
|----------|-----------|------------|
|table     |data       |here        |
|it doesn't|actually   |have to line up nicely!|
```

This renders as follows:

|This is   |a simple   |table header|
|----------|-----------|------------|
|table     |data       |here        |
|it doesn't|actually   |have to line up nicely!|

You can align the columns by using colons:

```markdown
| Fun                  | With                 | Tables          |
| :------------------- | -------------------: |:---------------:|
| left-aligned column  | right-aligned column | centered column |
| $100                 | $100                 | $100            |
| $10                  | $10                  | $10             |
| $1                   | $1                   | $1              |
```

Renders as follows:

| Fun                  | With                 | Tables          |
| :------------------- | -------------------: |:---------------:|
| left-aligned column  | right-aligned column | centered column |
| $100                 | $100                 | $100            |
| $10                  | $10                  | $10             |
| $1                   | $1                   | $1              |

:::tip
You can also use an [online table generator](http://www.tablesgenerator.com/markdown_tables).
:::


### Inconsistent column widths between tables

You may notice that the column widths of the tables look odd or inconsistent. This behavior occurs because the length of text within the cells determines the layout of the table. Unfortunately, there's no way to control how the tables render. This is a limitation of Markdown. Even though it would look nicer to have the width of table columns be consistent, this would have some disadvantages too:

- Interlacing HTML code with Markdown makes topics more complicated and discourages community contributions.
- A table that you make look good for a specific screen size may end up looking unreadable at different screen sizes as it preempts responsive rendering.

### Data matrix tables

A data matrix table has both a header and a weighted first column, creating a matrix with an empty cell in the top left. Docs has custom Markdown for data matrix tables:

```md
|                  |Header 1 |Header 2|
|------------------|---------|--------|
|**First column A**|Cell 1A  |Cell 2A |
|**First column B**|Cell 1B  |Cell 2B |
```

The example renders as:

|                  |Header 1 |Header 2|
|------------------|---------|--------|
|**First column A**|Cell 1A  |Cell 2A |
|**First column B**|Cell 1B  |Cell 2B |

Every entry in the first column must be styled as bold (`**bold**`); otherwise the tables won't be accessible for screen readers or valid for Docs.



## Blockquotes

Blockquotes are created using the `>` character:

```markdown
> This is a blockquote. It is usually rendered indented and with a different background color.
```

The preceding example renders as follows:

> This is a blockquote. It is usually rendered indented and with a different background color.


## Indentation

In Markdown, spaces before the first character of a line determine the line's alignment relative to the preceding lines. Indentation especially influences numbered and bulleted lists to render multiple levels of nesting in a hierarchical or outline format.

To indent text to align with a preceding paragraph or an item in a numbered or bulleted list, use spaces.

```markdown
// Example 1
1. This is a numbered list example (one space after the period before the letter T).

   This sentence is indented three spaces.

   `This code block is indented three spaces.`

// Example 2  
- This is a bulleted list example (one space after the bullet before the letter T).
  This sentence is indented two spaces.

// Example 3
- This is a second-level bullet (indented two spaces, with one space after the bullet before the letter T).
    This sentence is indented four spaces.
    > This quote block is indented four spaces.
```

**Example 1**

1. This is a numbered list example (one space after the period before the letter T).

   This sentence is indented three spaces.

   `This code block is indented three spaces.`

**Example 2**

- This is a bulleted list example (one space after the bullet before the letter T).
  This sentence is indented two spaces.

**Example 3**
- This is a second-level bullet (indented two spaces, with one space after the bullet before the letter T).
    This sentence is indented four spaces.
    > This quote block is indented four spaces.

## Docusaurus specific markdown

### [Admonition](https://docusaurus.io/docs/markdown-features/admonitions)

In addition to the basic Markdown syntax, we have a special admonitions syntax by wrapping text with a set of 3 colons, followed by a label denoting its type.

Example:

```md
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

### Highlighting codeblocks with comments

https://docusaurus.io/docs/markdown-features/code-blocks#highlighting-with-comments

### Tabs

https://docusaurus.io/docs/markdown-features/tabs

### Details

Markdown can embed HTML elements, and [`details`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) HTML elements are beautifully styled:

```md
<details>
  <summary>Toggle me!</summary>
  <div>
    <div>This is the detailed content</div>
    <br/>
    <details>
      <summary>
        Nested toggle! Some surprise inside...
      </summary>
      <div>😲😲😲😲😲</div>
    </details>
  </div>
</details>
```



<h4>Example</h4>

<details>
  <summary>Toggle me!</summary>
  <div>
    <div>This is the detailed content</div>
    <br/>
    <details>
      <summary>
        Nested toggle! Some surprise inside...
      </summary>
      <div>😲😲😲😲😲</div>
    </details>
  </div>
</details>

