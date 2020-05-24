import { Parser } from "./src/parser";
import { Lexer } from "./src/lexer";
import { LetStatement, ExpressionStatement, Identifier } from "./src/ast";


const source = "foobar;";
const lexer = new Lexer(source);
const parser = new Parser(lexer);
const program = parser.parseProgram();

console.log(program)
