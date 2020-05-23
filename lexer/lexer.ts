import {
  Token,
  TokenType,
  TokenTypes,
  Keyword,
  KeywordTypes
} from "../token/token";

type Char = string | 0;
export class Lexer {
  private position = -1;
  private readPosition = 0;
  private ch: Char = "";

  constructor(private source: string) {
    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.source.length) {
      this.ch = 0;
    } else {
      this.ch = this.source[this.readPosition];
    }
    [this.position, this.readPosition] = [
      this.readPosition,
      this.readPosition + 1,
    ];
  }

  private readIdentifier(): string {
    const position = this.position;
    while (this.ch != 0 && this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.source.slice(position, this.position);
  }

  private isLetter(ch: string): ch is string {
    return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || ch === "_" ||
      ch === "!";
  }

  private readNumber(): string {
    const position = this.position;
    while (this.ch !== 0 && this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.source.slice(position, this.position);
  }

  private isDigit(ch: string): boolean {
    return "0" <= ch && ch <= "9";
  }

  private isKeyword(literal: string): literal is Keyword {
    return literal in KeywordTypes;
  }

  private lookupIdent(identLiteral: string): TokenType {
    return this.isKeyword(identLiteral)
      ? KeywordTypes[identLiteral]
      : TokenTypes.IDENT;
  }

  private skipWhitespace() {
    while (
      this.ch === " " || this.ch === "\t" || this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }

  nextToken(): Token {
    let token: Token;
    this.skipWhitespace();
    switch (this.ch) {
      case "=":
        token = new Token(TokenTypes.ASSIGN, this.ch);
        break;
      case ";":
        token = new Token(TokenTypes.SEMICOLON, this.ch);
        break;
      case "(":
        token = new Token(TokenTypes.LPAREN, this.ch);
        break;
      case ")":
        token = new Token(TokenTypes.RPAREN, this.ch);
        break;
      case ",":
        token = new Token(TokenTypes.COMMA, this.ch);
        break;
      case "+":
        token = new Token(TokenTypes.PLUS, this.ch);
        break;
      case "{":
        token = new Token(TokenTypes.LBRACE, this.ch);
        break;
      case "}":
        token = new Token(TokenTypes.RBRACE, this.ch);
        break;
      case 0:
        token = new Token(TokenTypes.EOF, "");
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          token = new Token(this.lookupIdent(literal), literal);
          return token;
        } else if (this.isDigit(this.ch)) {
          token = new Token(TokenTypes.INT, this.readNumber());
          return token;
        } else {
          token = new Token(TokenTypes.ILLEGAL, String(this.ch));
        }
    }
    this.readChar();
    return token;
  }
}
