import { describe, it, expect } from "vitest";
import { parseMarkdown } from "../src/index";

let pageTest: Set<string> = new Set<string>();
let linkTest: Set<string> = new Set<string>();
describe("parseMarkdown", () => {
  it("converts [[wikilink]] to an anchor and collects link", () => {
    const input = "This references [[My Page]] and also inline **bold** text.";
    const { html, links_set } = parseMarkdown(input, "test/");
    pageTest.add("My Page")

    expect(links_set).toEqual(pageTest);
    expect(html).toContain('<p>This references <a href="/mypage" target="_blank" rel="noopener noreferrer">My Page</a> and also inline <strong>bold</strong> text.</p>');
    expect(html).toContain("<strong>bold</strong>");
  });

  it("handles multiple wikilinks", () => {
    const input = "[[One]] and [[Two]] and again [[One]]";
    const { links_set } = parseMarkdown(input, "test/");
    linkTest.add("One")
    linkTest.add("Two")
    expect(links_set).toEqual(linkTest);
  });
});
// more robust tests are needed