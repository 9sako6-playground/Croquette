export class Token {
  constructor(
    public type: TokenType,
    public literal: string,
  ) {}
}

export type TokenType =
  | 'ILLEGAL'
  | 'EOF'
  | 'IDENT'
  | 'INT'
  | DelimiterType
  | OperatorType
  | KeywordType;

export type KeywordType =
  | 'FUNCTION'
  | 'LET'
  | 'TRUE'
  | 'FALSE'
  | 'IF'
  | 'ELSE'
  | 'RETURN';

export type OperatorType =
  | 'ASSIGN'
  | 'BANG'
  | 'EQ'
  | 'NOT_EQ'
  | 'PLUS'
  | 'MINUS'
  | 'ASTERISK'
  | 'SLASH'
  | 'GT'
  | 'LT';

export type DelimiterType =
  | 'COMMA'
  | 'SEMICOLON'
  | 'LPAREN'
  | 'RPAREN'
  | 'LBRACE'
  | 'RBRACE';

export type TokenTypes = { [T in TokenType]: TokenType };

export const TokenTypes: TokenTypes = {
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
  IDENT: 'IDENT',
  INT: 'INT',
  ASSIGN: 'ASSIGN',
  BANG: 'BANG',
  EQ: 'EQ',
  NOT_EQ: 'NOT_EQ',
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  ASTERISK: 'ASTERISK',
  SLASH: 'SLASH',
  GT: 'GT',
  LT: 'LT',
  COMMA: 'COMMA',
  SEMICOLON: 'SEMICOLON',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  LBRACE: 'LBRACE',
  RBRACE: 'RBRACE',
  FUNCTION: 'FUNCTION',
  LET: 'LET',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN',
};

export type Keyword =
  | 'fn'
  | 'let'
  | 'true'
  | 'false'
  | 'if'
  | 'else'
  | 'return';

export type KeywordTypes = { [K in Keyword]: KeywordType };

export const KeywordTypes: KeywordTypes = {
  fn: 'FUNCTION',
  let: 'LET',
  true: 'TRUE',
  false: 'FALSE',
  if: 'IF',
  else: 'ELSE',
  return: 'RETURN',
};
