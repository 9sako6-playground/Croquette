import * as readline from "readline";
import { Lexer } from "../lexer";

export function startRepl() {
  const PROMPT = ">> ";
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  let buf = "";

  rl.prompt();
  rl.on("line", async (input) => {
    buf += input;
    if (input.length) {
      try {
        "";
      } catch (err) {
        buf += "\n";
        rl.setPrompt("...");
        rl.prompt();
        return;
      }
      const lexer = new Lexer(buf);
      for (let l of lexer) {
        console.dir(l);
      }
    } else {
      buf = "";
    }
    rl.setPrompt(PROMPT);
    rl.prompt();
  }).on("close", () => {
    console.log("( ;ᴗ;)ﾉｼ");
    process.exit(0);
  });
}
