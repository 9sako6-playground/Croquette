import { Lexer } from "../lexer";
import { Token, TokenType, TokenTypes } from "../token";
import { Precedences, PrecedenceValue } from "./precedence";
import {
  Program,
  Expression,
  Statement,
  Identifier,
  LetStatement,
  ReturnStatement,
  ExpressionStatement,
  IntegerLiteral,
  PrefixExpression
} from "../ast";

type prefixParseFunc = () => Expression;
type infixParseFunc = (leftExpression: Expression) => Expression;

export class Parser {
  private curToken: Token;
  private peekToken: Token;
  private prefixParseFuncs = new Map<TokenType, prefixParseFunc>();
  private infixParseFuncs = new Map<TokenType, infixParseFunc>();

  constructor(private lexer: Lexer) {
    const firstToken = { ...this.lexer.nextToken() };
    this.curToken = firstToken;
    this.peekToken = { ...this.lexer.nextToken() };

    this.registerPrefix(TokenTypes.IDENT, this.parseIdentifier.bind(this));
    this.registerPrefix(TokenTypes.INT, this.parseIntegerLiteral.bind(this));
    this.registerPrefix(TokenTypes.BANG, this.parsePrefixExpression.bind(this));
    this.registerPrefix(
      TokenTypes.MINUS,
      this.parsePrefixExpression.bind(this),
    );
  }

  private nextToken() {
    this.curToken = { ...this.peekToken };
    this.peekToken = { ...this.lexer.nextToken() };
  }

  private parseStatement(): Statement {
    switch (this.curToken.type) {
      case TokenTypes.LET:
        return this.parseLetStatement();
      case TokenTypes.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseLetStatement(): Statement {
    const token = { ...this.curToken };

    if (!this.expectPeek(TokenTypes.IDENT)) {
      throw new Error(
        `expected next token to be ${TokenTypes.IDENT}, got ${this.curToken.type} instead`,
      );
    }
    const statement = new LetStatement(
      token,
      (new Identifier(this.curToken, this.curToken.literal)),
      (new Expression()),
    );

    if (!this.expectPeek(TokenTypes.ASSIGN)) {
      throw new Error(
        `expected next token to be ${TokenTypes.ASSIGN}, got ${this.curToken.type} instead`,
      );
    }

    // TODO: skip
    while (!this.curTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  private parseReturnStatement(): Statement {
    const token = { ...this.curToken };
    const statement = new ReturnStatement(token, (new Expression()));
    this.nextToken();

    // TODO: skip
    while (!this.curTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  private parseExpressionStatement(): Statement {
    const expression = this.parseExpression(Precedences.LOWEST);
    const statement = new ExpressionStatement(
      this.curToken,
      expression,
    );
    if (this.peekTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  private parseExpression(precedence: PrecedenceValue): Expression {
    const prefix = this.prefixParseFuncs.get(this.curToken.type);
    if (!prefix) {
      throw new Error(
        `no prefix parse function for ${this.curToken.type} found`,
      );
    }
    const leftExp = prefix();
    return leftExp;
  }

  private parseIdentifier(): Expression {
    return new Identifier(this.curToken, this.curToken.literal);
  }

  private parseIntegerLiteral(): Expression {
    if (isNaN(Number(this.curToken.literal))) {
      throw new Error();
    }
    return new IntegerLiteral(this.curToken, Number(this.curToken.literal));
  }

  private parsePrefixExpression(): Expression {
    const token = { ...this.curToken };
    this.nextToken();
    const right = this.parseExpression(Precedences.PREFIX);
    return new PrefixExpression(token, token.literal, right);
  }

  private curTokenIs(type: TokenType): boolean {
    return this.curToken.type === type;
  }

  private peekTokenIs(type: TokenType): boolean {
    return this.peekToken.type === type;
  }

  private expectPeek(type: TokenType): boolean {
    if (this.peekTokenIs(type)) {
      this.nextToken();
      return true;
    } else {
      throw new Error(
        `expected next token to be ${type}, got ${this.peekToken.type} instead`,
      );
    }
  }

  private registerPrefix(tokenType: TokenType, func: prefixParseFunc) {
    this.prefixParseFuncs.set(tokenType, func);
  }

  private registerInfix(tokenType: TokenType, func: infixParseFunc) {
    this.infixParseFuncs.set(tokenType, func);
  }

  parseProgram(): Program {
    const program = new Program([]);
    while (this.curToken.type !== TokenTypes.EOF) {
      const statement = this.parseStatement();
      program.statements.push(statement);
      this.nextToken();
    }
    return program;
  }
}
