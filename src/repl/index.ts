import * as readline from 'readline';
import { Lexer } from '../lexer';
import { Parser } from '../parser';

export function startRepl() {
  const PROMPT = '>> ';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.prompt();
  rl.on('line', async (input) => {
    if (input.length) {
      try {
        for (let l of new Lexer(input)) {
          console.dir(l);
        }
        const lexer = new Lexer(input);
        const parser = new Parser(lexer);
        const program = parser.parseProgram();
        console.log(program.string());
      } catch (error) {
        console.error(error);
      }
    }
    rl.setPrompt(PROMPT);
    rl.prompt();
  }).on('close', () => {
    console.log('( ;ᴗ;)ﾉｼ');
    process.exit(0);
  });
}
