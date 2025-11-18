import fs from "fs";
import path from "path";
import { parseMarkdown } from "./index";

const input = process.argv[2] || path.join(process.cwd(), "example.md");
if (!fs.existsSync(input)) {
  console.error("No input file found:", input);
  process.exit(1);
}
const content = fs.readFileSync(input, "utf8");
const result = parseMarkdown(content, "www.personalwebsite.com/test/");
console.log("HTML output:\n", result.html);
console.log("\nLinks found:", result.links_set);

console.log("json parsed", JSON.stringify(result.html))
