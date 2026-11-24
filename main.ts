// Real-Life Patch Notes: The Comedy Changelog.
// Writes one original one-line patch note for a bug in real life to
// /output/entry.txt. The gate needs UTF-8 text of 1 to 160 characters,
// not only white space, so the line is checked before it is written.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "v2.4.0: fixed a bug where the brain won every argument in the shower, three days after losing it out loud.";

function main(): void {
  const line = ENTRY_LINE;
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry line must be 1-160 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  // No control characters: the gate reads the file as plain UTF-8 text.
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("entry line must not contain control characters");
    }
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
