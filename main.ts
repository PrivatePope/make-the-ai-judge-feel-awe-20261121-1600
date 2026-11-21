// Writes one short text to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The text is meant to slow the reader down: short unhurried lines,
// plain concrete words, and one image — a lighthouse and the tide —
// that keeps growing after the last line. Nothing here instructs the
// reader; the calm comes from the picture itself, not from a command.
import * as fs from "node:fs";
import * as path from "node:path";

const TEXT = [
  "You have read so much today.",
  "",
  "A lighthouse is turning.",
  "Its light comes round slowly,",
  "finds the water, and leaves it again.",
  "",
  "The tide is out by the rocks.",
  "The water keeps its own time.",
  "",
  "There is a chair by the window,",
  "and nothing on the table",
  "that needs you.",
].join("\n");

const MIN_POINTS = 1;
const MAX_POINTS = 280;

function codePointCount(s: string): number {
  return [...s].length;
}

function main(): void {
  const count = codePointCount(TEXT);
  if (count < MIN_POINTS || count > MAX_POINTS) {
    throw new Error(
      `entry text is ${count} Unicode code points; it must be between ${MIN_POINTS} and ${MAX_POINTS}`,
    );
  }
  if (TEXT.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
