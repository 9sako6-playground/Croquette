import { Token } from "../token";

interface Node {
  tokenLiteral: () => string;
}

export class Statement implements Node {
  public type = "Statement" as const;
  tokenLiteral() {
    return "";
  }
}

export class Expression implements Node {
  public type = "Expression" as const;
  tokenLiteral() {
    return "";
  }
}

export class Program {
  public statements: Array<Statement> = [];
  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }
}

export class LetStatement extends Statement {
  constructor(
    private _token: Token,
    private _name: Identifier,
    private _value: Expression,
  ) {
    super();
  }
  get token() {
    return this._token;
  }
  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
}

export class Identifier {
  constructor(
    private _token: Token,
    private _value: string,
  ) {}
  get token() {
    return this._token;
  }
  get value() {
    return this._value;
  }
  expressionNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
}
