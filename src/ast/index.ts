import { Token } from "../token";

interface Node {
  tokenLiteral: () => string;
  string: () => string;
}

export class Statement implements Node {
  public type = "Statement" as const;
  tokenLiteral(): string {
    return this.type;
  }
  string(): string {
    return this.tokenLiteral();
  }
}

export class Expression implements Node {
  public type = "Expression" as const;
  tokenLiteral(): string {
    return this.type;
  }
  string(): string {
    return this.tokenLiteral();
  }
}

export class Program implements Node {
  constructor(readonly statements: Array<Statement>) {}
  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return "";
    }
  }
  string(): string {
    let buffer = "";
    this.statements.forEach((statement) => {
      buffer += statement.string();
    });
    return buffer;
  }
}

export class LetStatement extends Statement {
  constructor(
    readonly token: Token,
    readonly name: Identifier,
    readonly value: Expression,
  ) {
    super();
  }
  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  string(): string {
    let buffer = "";
    buffer += `${this.tokenLiteral()} ${this.name.string()} = `;
    if (this.value !== null) {
      buffer += this.value.string();
    }
    buffer += ";";
    return buffer;
  }
}

export class ReturnStatement extends Statement {
  constructor(
    readonly token: Token,
    readonly returnValue: Expression,
  ) {
    super();
  }
  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  string(): string {
    let buffer = "";
    buffer += `${this.tokenLiteral()} `;
    if (this.returnValue !== null) {
      buffer += this.returnValue.string();
    }
    buffer += ";";
    return buffer;
  }
}

export class ExpressionStatement extends Statement {
  constructor(
    readonly token: Token,
    readonly expression: Expression,
  ) {
    super();
  }
  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  string(): string {
    if (this.expression !== null) {
      return this.expression.string();
    }
    return "";
  }
}

export class Identifier extends Expression {
  constructor(
    readonly token: Token,
    readonly value: string,
  ) {
    super();
  }
  expressionNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  string(): string {
    return this.value;
  }
}

export class IntegerLiteral extends Expression {
  constructor(
    readonly token: Token,
    readonly value: number,
  ) {
    super();
  }
  expressionNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  string(): string {
    return this.token.literal;
  }
}
