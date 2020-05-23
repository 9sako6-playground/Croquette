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
    public token: Token,
    public name: Identifier,
    public value: Expression,
  ) {
    super();
  }
  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
}

export class Identifier {
  constructor(
    public token: Token,
    public value: string,
  ) {}
  expressionNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
}
