/**
 * parseMarkdown
 * - Accepts an Obsidian-style markdown string.
 * - Finds all [[wikilinks]] and collects them into links[].
 * - Replaces [[Name]] with an <a href="Name.html">Name</a> (simple default transform).
 * - Returns the HTML (via markdown-it) and the array of links found.
 * - This is a one way operation meant to just translate markdown files for the web
 */

import MarkdownIt from "markdown-it";

export type ParseResult = {
  html: string;
  links_set: Set<string>;
};

const md = new MarkdownIt();

/**
 * Normalize link text to a safe file name or slug.
 * For now, this is minimal: trim and replace spaces with dashes.
 */
function normalizeLinkText(text: string): string {
  return text.trim().replace(/\s+/g, "-");
  
}

/**
 * Replace [[link]] occurrences with a placeholder anchor and collect links.
 */
function transformWikilinks(input: string, route: string, links: Set<string>): string {
  // Use a replacer so we can capture multiple occurrences
  return input.replace(/\[\[([^\]]+)\]\]/g, (_, inner: string) => {
    const display = inner.trim();
    const href = ` ${route}${normalizeLinkText(display)}`;
    links.add(display);
    // Return markdown inline HTML anchor; markdown-it will preserve it
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${display}</a>`;
  });
}

/**
 * Main exported function.
 * route should be setup in a way for you to handle params easily
 */
export function parseMarkdown(markdown: string, route: string): ParseResult {
  const links_set: Set<string> = new Set();
  const withAnchors = transformWikilinks(markdown, route, links_set);
  const html = md.render(withAnchors);
  return { html, links_set };
}