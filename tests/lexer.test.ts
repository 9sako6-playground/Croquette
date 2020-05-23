import { Lexer } from "../src/lexer";
import { TokenTypes, TokenType } from "../src/token";

test("test nextToken with signs", () => {
  const source = "=+(){},;";
  const lexer = new Lexer(source);
  const answers: Array<{ type: TokenType; literal: string }> = [
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

let _result = add(five, ten);

!1 < 4*y;
x/ 1 > y-1;

if (5 < 10){
  return true;
} else {
  return false;
}
10 == 10;
11 != 10;
`;
  const lexer = new Lexer(source);
  const answers: Array<{ type: TokenType; literal: string }> = [
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
    { type: TokenTypes.IDENT, literal: "_result" },
    { type: TokenTypes.ASSIGN, literal: "=" },
    { type: TokenTypes.IDENT, literal: "add" },
    { type: TokenTypes.LPAREN, literal: "(" },
    { type: TokenTypes.IDENT, literal: "five" },
    { type: TokenTypes.COMMA, literal: "," },
    { type: TokenTypes.IDENT, literal: "ten" },
    { type: TokenTypes.RPAREN, literal: ")" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.BANG, literal: "!" },
    { type: TokenTypes.INT, literal: "1" },
    { type: TokenTypes.LT, literal: "<" },
    { type: TokenTypes.INT, literal: "4" },
    { type: TokenTypes.ASTERISK, literal: "*" },
    { type: TokenTypes.IDENT, literal: "y" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.IDENT, literal: "x" },
    { type: TokenTypes.SLASH, literal: "/" },
    { type: TokenTypes.INT, literal: "1" },
    { type: TokenTypes.GT, literal: ">" },
    { type: TokenTypes.IDENT, literal: "y" },
    { type: TokenTypes.MINUS, literal: "-" },
    { type: TokenTypes.INT, literal: "1" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.IF, literal: "if" },
    { type: TokenTypes.LPAREN, literal: "(" },
    { type: TokenTypes.INT, literal: "5" },
    { type: TokenTypes.LT, literal: "<" },
    { type: TokenTypes.INT, literal: "10" },
    { type: TokenTypes.RPAREN, literal: ")" },
    { type: TokenTypes.LBRACE, literal: "{" },
    { type: TokenTypes.RETURN, literal: "return" },
    { type: TokenTypes.TRUE, literal: "true" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.RBRACE, literal: "}" },
    { type: TokenTypes.ELSE, literal: "else" },
    { type: TokenTypes.LBRACE, literal: "{" },
    { type: TokenTypes.RETURN, literal: "return" },
    { type: TokenTypes.FALSE, literal: "false" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.RBRACE, literal: "}" },
    { type: TokenTypes.INT, literal: "10" },
    { type: TokenTypes.EQ, literal: "==" },
    { type: TokenTypes.INT, literal: "10" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.INT, literal: "11" },
    { type: TokenTypes.NOT_EQ, literal: "!=" },
    { type: TokenTypes.INT, literal: "10" },
    { type: TokenTypes.SEMICOLON, literal: ";" },
    { type: TokenTypes.EOF, literal: "" },
  ];
  for (let answer of answers) {
    const result = lexer.nextToken();
    expect(result).toEqual(answer);
  }
});
