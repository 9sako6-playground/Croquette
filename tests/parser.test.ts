import { Parser } from "../src/parser";
import { Lexer } from "../src/lexer";
import { LetStatement } from "../src/ast";

test("LetStatement", () => {
  const source = `
let x = 5;
let y = 10;
let foobar = 1000000007;
`;
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();
  expect(program).toBeTruthy;
  expect(program.statements.length).toEqual(3);

  const identifiers = ["x", "y", "foobar"];
  for (let i = 0; i < 3; ++i) {
    const statement = program.statements[i];
    expect(statement.tokenLiteral()).toEqual("let");
    expect(statement instanceof LetStatement).toBeTruthy;
    if (statement instanceof LetStatement) {
      const letStatement: LetStatement = statement;
      expect(letStatement.name.value).toEqual(identifiers[i]);
      expect(letStatement.name.token.literal).toEqual(identifiers[i]);
    }
  }
});
