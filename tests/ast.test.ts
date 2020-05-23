import { Token, TokenTypes } from "../src/token";
import {
  Identifier,
  Program,
  LetStatement
} from "../src/ast";

test("string() method should generate correct string", () => {
  // let newVar = anotherVar;
  const program = new Program([
    new LetStatement(
      new Token(TokenTypes.LET, "let"),
      new Identifier(new Token(TokenTypes.IDENT, "newVar"), "newVar"),
      new Identifier(new Token(TokenTypes.IDENT, "anotherVar"), "anotherVar"),
    ),
  ]);

  expect(program.string()).toEqual("let newVar = anotherVar;");
});
