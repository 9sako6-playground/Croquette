export type Precedence =
  | "LOWEST"
  | "EQUALS" // ==
  | "LESSGREATER" // > or <
  | "SUM" // +
  | "PRODUCT" // *
  | "PREFIX" // -x or !x
  | "CALL"; // func()

export type PrecedenceValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Precedences = { [P in Precedence]: PrecedenceValue };

export const Precedences: Precedences = {
  LOWEST: 1,
  EQUALS: 2,
  LESSGREATER: 3,
  SUM: 4,
  PRODUCT: 5,
  PREFIX: 6,
  CALL: 7,
};
