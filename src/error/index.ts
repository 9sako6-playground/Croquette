export class BaseError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = new.target.name;
  }
}

export class ParserError extends BaseError {}

export class TokenTypeParserError extends ParserError {}

export class OperatorParserError extends ParserError {}
