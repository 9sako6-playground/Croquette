import { Parser } from "../src/parser";
import { Lexer } from "../src/lexer";
import {
  LetStatement,
  ExpressionStatement,
  Identifier,
  IntegerLiteral
} from "../src/ast";

test("should parse let statements", () => {
  const source = `
let x = 5;
let y=10;
let mod = 1000000007;
`;
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();
  expect(program).toBeTruthy;
  expect(program.statements.length).toEqual(3);

  const identifiers = ["x", "y", "mod"];
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

test("should parse return statements", () => {
  const source = `
return 5;
return 10;
return  1000000007;
`;
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();
  expect(program).toBeTruthy;
  expect(program.statements.length).toEqual(3);

  program.statements.forEach((statement) => {
    expect(statement.tokenLiteral()).toEqual("return");
  });
});

test("should throw Error", () => {
  const source = `
let x = 5;
let 10;
let = 1000000007;
`;
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  expect(parser.parseProgram).toThrow(Error);
});

test("should parse identifier expression", () => {
  const source = "foobar;";
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();

  expect(program.statements.length).toEqual(1);
  const statement = program.statements[0];
  expect(statement instanceof ExpressionStatement).toBeTruthy;
  if (statement instanceof ExpressionStatement) {
    const expressionStatement: ExpressionStatement = statement;
    const ident = expressionStatement.expression;
    expect(ident instanceof Identifier).toBeTruthy;
    if (ident instanceof Identifier) {
      expect(ident.value).toEqual("foobar");
      expect(ident.tokenLiteral()).toEqual("foobar");
    }
  }
});

test("should parse integer literal expression", () => {
  const source = "57;";
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);
  const program = parser.parseProgram();

  expect(program.statements.length).toEqual(1);
  const statement = program.statements[0];
  expect(statement instanceof ExpressionStatement).toBeTruthy;
  if (statement instanceof ExpressionStatement) {
    const expressionStatement: ExpressionStatement = statement;
    const ident = expressionStatement.expression;
    expect(ident instanceof IntegerLiteral).toBeTruthy;
    if (ident instanceof IntegerLiteral) {
      expect(ident.value).toEqual(57);
      expect(ident.tokenLiteral()).toEqual("57");
    }
  }
});
