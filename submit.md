# Submit an article

Want to share your own study notes or an article? Write it in Markdown and send it through the submission form on GitHub. One submission can contain a single article or a whole series.

## How to submit

1. Open the [submission form](https://github.com/korynbid/korynbid.github.io/issues/new?template=submit-article.yml). You need a free GitHub account.
2. Enter the series tag (for example `ADS-FINAL-PREP`) and, if the article is based on someone else's work, a reference link to the original source.
3. Choose how you want to be credited: by your GitHub username, or anonymously.
4. Paste your Markdown into the box. For a very long file, drag and drop the `.md` file into the box instead.
5. Tick the rights box and send the form. Your submission is reviewed and then published with the credit you chose.

The form creates a public GitHub issue, so your text and your GitHub username are visible to everyone. Choosing "anonymously" only means your name is not shown on the published article. If you do not want to use GitHub, you can email the files to [lebroskiofficial@proton.me](mailto:lebroskiofficial@proton.me) instead.

## Article structure

Every article follows the same simple structure, so a series reads the same from start to end. 
One file can contain an entire series. Every new article inside the file starts with its own single `#` heading:

```
# 1. First Article

## Description
One short paragraph: what the topic is and why it matters.

## Main section
Explain the idea. Use lists, tables and code examples.

### Subsection
Details, syntax, examples.

## Conclusion
Two or three sentences that sum everything up.

# 2. Second Article

## Description
The next article of the series starts with a new # heading.

## Conclusion
Short summary.
```

- **One file, one article or a whole series.** Save it as UTF-8 with the `.md` extension. A clear name works best, such as `3_sql-ddl-dml.md` for one article or `db-final-prep.md` for a series.
- **Every new article starts with a `#`.** Use a single `#` heading for the title of each article. Start it with the article number in the series (`# 3. SQL ...`), because the number sets its place in the series menu.
- **Description first.** Open each article with a `## Description` section.
- **Headings in order.** Inside an article use `##` for sections and `###` for subsections, and do not skip levels. Never use a single `#` for anything except a new article.
- **Long articles.** Split them into parts with a line of three dashes (`---`) and headings like `## Part II: Another big block`.
- **Code in code blocks.** Always add the language name so it is highlighted correctly.
- **End each article with a conclusion.** A `## Conclusion` section closes it.
- **Leave the extras to the form.** Do not write the author, date, series tag or references inside the file. The form collects them once for everything you send.

## Basic Markdown syntax

| You want | You write |
|----------|-----------|
| Heading | `# Title`, `## Section`, `### Subsection` |
| Bold | `**bold text**` |
| Italic | `*italic text*` |
| Inline code | `` `SELECT * FROM t;` `` |
| Link | `[link text](https://example.com)` |
| Bulleted list | `* item` or `- item` on each line |
| Numbered list | `1. item`, `2. item` |
| Quote | `> quoted text` |
| Divider | `---` on its own line |

A code block starts and ends with three backticks. Put the language name right after the opening ones, for example `sql`, `python` or `cpp`.

A table uses pipes, and the second line of dashes separates the header from the rows:

```
| Type | Purpose |
|------|---------|
| DDL  | Create and change structures |
| DML  | Change data |
```

Leave an empty line before and after headings, lists, tables and code blocks.

## Rights and credit

- Send only your own work, or work you have permission to share.
- If the article is based on someone else's work, add its link in the reference field of the form.
- The author is credited at the top of the article, unless you chose to stay anonymous. Rights stay with the original author, as described on the [copyright, license and privacy page](license.html).
- Want an article corrected or removed? Write to [lebroskiofficial@proton.me](mailto:lebroskiofficial@proton.me) with the link to the article.
