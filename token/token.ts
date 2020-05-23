export class Token {
  constructor(
    public type: TokenType,
    public literal: string,
  ) {}
}

export type TokenType =
  | "ILLEGAL"
  | "EOF"
  | "IDENT"
  | "INT"
  | DelimiterType
  | OperatorType
  | KeywordType;

export type KeywordType = "FUNCTION" | "LET";

export type OperatorType =
  | "ASSIGN"
  | "BANG"
  | "PLUS"
  | "MINUS"
  | "ASTERISK"
  | "SLASH"
  | "GT"
  | "LT";

export type DelimiterType =
  | "COMMA"
  | "SEMICOLON"
  | "LPAREN"
  | "RPAREN"
  | "LBRACE"
  | "RBRACE";

export type TokenTypes = { [T in TokenType]: TokenType };

export const TokenTypes: TokenTypes = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",
  IDENT: "IDENT",
  INT: "INT",
  ASSIGN: "ASSIGN",
  BANG: "BANG",
  PLUS: "PLUS",
  MINUS: "MINUS",
  ASTERISK: "ASTERISK",
  SLASH: "SLASH",
  GT: "GT",
  LT: "LT",
  COMMA: "COMMA",
  SEMICOLON: "SEMICOLON",
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  LBRACE: "LBRACE",
  RBRACE: "RBRACE",
  FUNCTION: "FUNCTION",
  LET: "LET",
};

export type Keyword = "fn" | "let";

export type KeywordTypes = { [K in Keyword]: KeywordType };

export const KeywordTypes: KeywordTypes = {
  fn: "FUNCTION",
  let: "LET",
};
