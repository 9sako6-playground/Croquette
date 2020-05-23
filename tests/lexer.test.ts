import { Lexer } from "../lexer/lexer";
import { TokenTypes, TokenType } from "../token/token";

test("test nextToken with signs", () => {
  const source = "=+(){},;";
  const lexer = new Lexer(source);
  const answers: Array<{ type: TokenType; literal: string | number }> = [
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.PLUS, literal: "+" },
    { type: TokenTypes.LPAREN, literal: "(" },
    { type: TokenTypes.RPAREN, literal: ")" },
    { type: TokenTypes.LBRACE, literal: "{" },
    { type: TokenTypes.RBRACE, literal: "}" },
    { type: TokenTypes.COMMA, literal: "," },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.EOF, literal: "" },
  ];
  for (let answer of answers) {
    const result = lexer.nextToken();
    expect(result).toEqual(answer);
  }
});

test("test nextToken with a code", () => {
  const source = `let five = 5;
let ten = 10;

let add = fn(x, y){
  x + y;
};

let result = add(five, ten);
`;
  const lexer = new Lexer(source);
  const answers: Array<{ type: TokenType; literal: string | number }> = [
    { type: TokenTypes.LET, literal: "let" },
    { type: TokenTypes.IDENT, literal: "five" },
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.INT, literal: "5" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.LET, literal: "let" },
    { type: TokenTypes.IDENT, literal: "ten" },
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.INT, literal: "10" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.LET, literal: "let" },
    { type: TokenTypes.IDENT, literal: "add" },
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.FUNCTION, literal: "fn" },
    { type: TokenTypes.LPAREN, literal: "(" },
    { type: TokenTypes.IDENT, literal: "x" },
    { type: TokenTypes.COMMA, literal: "," },
    { type: TokenTypes.IDENT, literal: "y" },
    { type: TokenTypes.RPAREN, literal: ")" },
    { type: TokenTypes.LBRACE, literal: "{" },
    { type: TokenTypes.IDENT, literal: "x" },
    { type: TokenTypes.PLUS, literal: "+" },
    { type: TokenTypes.IDENT, literal: "y" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.RBRACE, literal: "}" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.LET, literal: "let" },
    { type: TokenTypes.IDENT, literal: "result" },
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.IDENT, literal: "add" },
    { type: TokenTypes.LPAREN, literal: "(" },
    { type: TokenTypes.IDENT, literal: "five" },
    { type: TokenTypes.COMMA, literal: "," },
    { type: TokenTypes.IDENT, literal: "ten" },
    { type: TokenTypes.RPAREN, literal: ")" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.EOF, literal: "" },
  ];
  for (let answer of answers) {
    const result = lexer.nextToken();
    expect(result).toEqual(answer);
  }
});
