import { Lexer } from '../lexer';
import { Token, TokenType, TokenTypes } from '../token';
import {
  Precedences,
  PrecedenceValue,
  TokenTypePrecedences,
  Precedence,
} from './precedence';
import {
  Program,
  Expression,
  Statement,
  Identifier,
  LetStatement,
  ReturnStatement,
  ExpressionStatement,
  IntegerLiteral,
  PrefixExpression,
  InfixExpression,
} from '../ast';
import { ParserError, TokenTypeParserError, OperatorParserError } from '../error';

type prefixParseFunc = () => Expression | ParserError;
type infixParseFunc = (leftExpression: Expression) => Expression | ParserError;

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
    this.registerPrefix(TokenTypes.MINUS, this.parsePrefixExpression.bind(this));

    this.registerInfix(TokenTypes.PLUS, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.MINUS, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.SLASH, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.ASTERISK, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.EQ, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.NOT_EQ, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.LT, this.parseInfixExpression.bind(this));
    this.registerInfix(TokenTypes.GT, this.parseInfixExpression.bind(this));
  }

  private nextToken() {
    this.curToken = { ...this.peekToken };
    this.peekToken = { ...this.lexer.nextToken() };
  }

  private parseStatement(): Statement | ParserError {
    switch (this.curToken.type) {
      case TokenTypes.LET:
        return this.parseLetStatement();
      case TokenTypes.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseLetStatement(): Statement | TokenTypeParserError {
    const token = { ...this.curToken };

    let expected = this.expectPeek(TokenTypes.IDENT);
    if (expected instanceof Error) {
      return expected;
    }
    const statement = new LetStatement(
      token,
      (new Identifier(this.curToken, this.curToken.literal)),
      (new Expression()),
    );

    expected = this.expectPeek(TokenTypes.ASSIGN);
    if (expected instanceof Error) {
      return expected;
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

  private parseExpressionStatement(): Statement | OperatorParserError {
    const expression = this.parseExpression(Precedences.LOWEST);
    if (expression instanceof Error) {
      return expression;
    }
    const statement = new ExpressionStatement(
      this.curToken,
      expression,
    );
    if (this.peekTokenIs(TokenTypes.SEMICOLON)) {
      this.nextToken();
    }
    return statement;
  }

  private parseExpression(precedence: PrecedenceValue): Expression | OperatorParserError {
    const prefix = this.prefixParseFuncs.get(this.curToken.type);
    if (!prefix) {
      return new OperatorParserError(`no prefix parse function for ${this.curToken.type} found`);
    }
    let leftExp = prefix();
    while (!this.peekTokenIs(TokenTypes.SEMICOLON) && precedence < Precedences[this.peekPrecedence()]) {
      const infix = this.infixParseFuncs.get(this.peekToken.type);
      if (!infix) {
        return new OperatorParserError(`no infix parse function for ${this.peekToken.type} found`);
      }
      if (leftExp instanceof Error) {
        return leftExp;
      }
      this.nextToken();
      leftExp = infix(leftExp);
    }
    return leftExp;
  }

  private parseIdentifier(): Expression {
    return new Identifier(this.curToken, this.curToken.literal);
  }

  private parseIntegerLiteral(): Expression {
    return new IntegerLiteral(this.curToken, Number(this.curToken.literal));
  }

  private parsePrefixExpression(): Expression | OperatorParserError {
    const token = { ...this.curToken };
    this.nextToken();
    const right = this.parseExpression(Precedences.PREFIX);
    if (right instanceof Error) {
      return right;
    }
    return new PrefixExpression(token, token.literal, right);
  }

  private parseInfixExpression(left: Expression): Expression | OperatorParserError {
    const token = this.curToken;
    const precedence = this.curPrecedence();
    this.nextToken();
    const right = this.parseExpression(Precedences[precedence]);
    if (right instanceof Error) {
      return right;
    }
    return new InfixExpression(token, token.literal, left, right);
  }

  private curTokenIs(type: TokenType): boolean {
    return this.curToken.type === type;
  }

  private peekTokenIs(type: TokenType): boolean {
    return this.peekToken.type === type;
  }

  private expectPeek(type: TokenType): true | TokenTypeParserError {
    if (this.peekTokenIs(type)) {
      this.nextToken();
      return true;
    } else {
      return new TokenTypeParserError(
        `expected next token to be ${type}, got ${this.peekToken.type} instead`,
      );
    }
  }

  private curPrecedence(): Precedence {
    return TokenTypePrecedences.get(this.curToken.type) ?? 'LOWEST';
  }

  private peekPrecedence(): Precedence {
    return TokenTypePrecedences.get(this.peekToken.type) ?? 'LOWEST';
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
      if (statement instanceof Error) {
        throw statement;
      }
      program.statements.push(statement);
      this.nextToken();
    }
    return program;
  }
}
