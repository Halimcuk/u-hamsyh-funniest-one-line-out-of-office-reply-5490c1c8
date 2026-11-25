// Funniest One-Line Out-of-Office Reply
// Writes a single one-line out-of-office auto-reply to <output>/entry.txt
// and checks the competition gate itself: 1-160 characters, not only
// whitespace. The output folder comes from the environment, falling back
// The joke: a flat auto-reply that confesses the absence itself is the
// recovery — candid about what is really happening, in away-message voice.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of the office until Monday, recovering from a severe case of being at the office.";

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.OUTPUT_DIR ??
  "/output";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 160) {
  throw new Error(`Entry is ${chars} characters, outside the 1-160 gate.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line.");
}

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Verify the written file round-trips exactly and still passes the gate.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("Written entry.txt does not match the entry text.");
}
console.log(`Wrote ${chars} characters to ${outPath}`);
console.log(ENTRY);
