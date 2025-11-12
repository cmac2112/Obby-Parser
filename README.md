# Obby-Parser

A simple TypeScript library for parsing Obsidian-style markdown. It converts `[[wikilinks]]` to HTML anchor tags and collects all unique links.

## Features

- Converts `[[Page Name]]` to `<a href="route/Page-Name">Page Name</a>`
- Collects all wikilinks in a Set
- Supports standard markdown formatting via [markdown-it](https://github.com/markdown-it/markdown-it)

## Installation

```bash
npm install obsi-parser
```

## Usage

```typescript
import { parseMarkdown } from 'obsi-parser';

const markdown = "This references [[My Page]] and also **bold** text.";
const result = parseMarkdown(markdown, "pages/");

console.log(result.html);      // HTML output with anchor tags
console.log(result.links_set); // Set { "My Page" }
```

## API

### `parseMarkdown(markdown: string, route: string): ParseResult`

- `markdown`: The markdown string to parse.
- `route`: The base path for generated links.
- Returns:  
  - `html`: The resulting HTML string.
  - `links_set`: A Set of all unique wikilinks found.

## License

MIT