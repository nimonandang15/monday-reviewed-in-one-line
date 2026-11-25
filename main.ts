// Monday, Reviewed in One Line — make.fun entry.
// Writes a single one-line review of Monday to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, single line, exactly one sentence.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "One star: Monday showed up late, froze during standup, and then asked me to rate the experience.";

// Gate checks (fail loudly instead of writing an invalid entry).
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0) throw new Error("entry must not be only whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (Buffer.byteLength(ENTRY, "utf8") !== chars.length) {
  throw new Error("entry must be ASCII-only so bytes equal characters");
}
const sentenceEnds = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceEnds !== 1 || !/[.!?]$/.test(ENTRY)) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8"); // no trailing newline
console.log(`wrote ${chars.length} chars to /output/entry.txt`);
