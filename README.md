# korynbid

A small open source website for sharing study notes and articles.

**Live site:** [koryn.bid](https://koryn.bid)

## Features

- **Categories:** the home page groups articles by category and shows the first few of each. A "more..." link opens a page listing every article in that category.
- **Table of contents:** a menu lists all articles grouped by series.
- **Live search:** search articles by title and category right on the home page.
- **Credit for every article:** each article shows its date, series tag, category and original author (where known).
- **Comments:** powered by [Giscus](https://giscus.app) and stored in this repository's GitHub Discussions. A GitHub account is needed to comment.
- **Visit counts:** page views are counted with [GoatCounter](https://www.goatcounter.com), a privacy-friendly analytics service that does not use cookies.
- **Themes and mobile layout:** several color themes, and the pages work on phones and desktops.
- **Submit your own notes:** send Markdown articles through the [submission form](https://github.com/korynbid/korynbid.github.io/issues/new?template=submit-article.yml). One submission can contain an entire series.
- **Static and fast:** plain HTML, CSS and a little JavaScript, hosted on GitHub Pages.

## Project structure

```
index.html        home page: articles grouped by category
about.html        about page
submit.html       how to submit articles
license.html      copyright, license and privacy notice
posts/            article pages
categories/       one page per category
css/              styles
js/               search, theme, menu and view counter scripts
fav/              favicons and web manifest
.github/          issue form for article submissions
CNAME             custom domain (koryn.bid)
LICENSE           MIT License for the website code
```

## Submitting articles

Articles are plain Markdown files, sent through the [submission form](https://github.com/korynbid/korynbid.github.io/issues/new?template=submit-article.yml) on GitHub (a free GitHub account is needed). The form is public: the text and your GitHub username are visible to everyone.

- One submission can contain a single article or an entire series.
- **Every new article starts with a single `#` heading** that carries its number in the series, for example `# 3. SQL, DDL and DML`.
- Inside an article, `##` marks sections and `###` subsections. A `## Description` section comes first and a `## Conclusion` section closes the article.
- Code goes into fenced code blocks with the language name.
- The series tag, the reference link and the credit choice (username or anonymous) go into the form, not into the file.

The full structure and a short Markdown guide are on the [Submit page](https://koryn.bid/submit.html).

## Licensing

- **Website code** (HTML templates, styles, scripts and build tools) is released under the [MIT License](LICENSE).
- **Articles are not covered by the MIT License.** Unless an article states a different license or permission, all rights remain with its original author and with the rights holders of the works it is based on. Publishing an article here does not give anyone a license to copy, republish or reuse it. See the [copyright, license and privacy page](https://koryn.bid/license.html) for details.

## Mistakes and copyright issues

If you notice a mistake, or you are an author or rights holder and want an article corrected, credited differently or removed, write to [lebroskiofficial@proton.me](mailto:lebroskiofficial@proton.me) and include the link to the article.

## Bugs and suggestions

Found a bug or have an idea? [Open an issue](../../issues) or start a thread in [Discussions](../../discussions).
