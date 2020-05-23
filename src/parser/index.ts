import { Lexer } from "../lexer";
import { Token, TokenType, TokenTypes } from "../token";
import {
  Program,
  Expression,
  Statement,
  LetStatement,
  Identifier,
  ReturnStatement
} from "../ast";

export class Parser {
  private curToken: Token;
  private peekToken: Token;
  private _errors: Array<string> = [];
  constructor(private lexer: Lexer) {
    const firstToken = { ...this.lexer.nextToken() };
    this.curToken = firstToken;
    this.peekToken = { ...this.lexer.nextToken() };
  }

  get errors() {
    return this._errors;
  }

  private nextToken() {
    this.curToken = { ...this.peekToken };
    this.peekToken = { ...this.lexer.nextToken() };
  }

  parseStatement(): Statement | null {
    switch (this.curToken.type) {
      case TokenTypes.LET:
        return this.parseLetStatement();
      case TokenTypes.RETURN:
        return this.parseReturnStatement();
      default:
        return null;
    }
  }

  parseLetStatement(): Statement | null {
    const token = { ...this.curToken };

    if (!this.expectPeek(TokenTypes.IDENT)) {
      return null;
    }
    const statement = new LetStatement(
      token,
      (new Identifier(this.curToken, this.curToken.literal)),
      (new Expression()),
    );

    if (!this.expectPeek(TokenTypes.ASSIGN)) {
      return null;
    }

    // TODO: skip
    while (!this.curTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  parseReturnStatement(): Statement | null {
    const token = { ...this.curToken };
    const statement = new ReturnStatement(token, (new Expression()));
    this.nextToken();

    // TODO: skip
    while (!this.curTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  private curTokenIs(type: TokenType): boolean {
    return this.curToken.type === type;
  }

  private peekTokenIs(type: TokenType): boolean {
    return this.peekToken.type === type;
  }

  private peekError(type: TokenType) {
    const message =
      `Error: expected next token to be ${type}, got ${this.peekToken.type} instead`;
    this.errors.push(message);
  }

  private expectPeek(type: TokenType): boolean {
    if (this.peekTokenIs(type)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(type);
      return false;
    }
  }

  parseProgram(): Program {
    const program = new Program();
    while (this.curToken.type !== TokenTypes.EOF) {
      const statement = this.parseStatement();
      if (statement !== null) {
        program.statements.push(statement);
      }
      this.nextToken();
    }
    if (this.errors.length > 0) {
      this.errors.forEach((error) => console.log(error));
      throw new Error();
    }
    return program;
  }
}
