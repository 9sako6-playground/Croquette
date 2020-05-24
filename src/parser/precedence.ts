import { OperatorType, TokenType, TokenTypes } from '../token';

export type Precedence =
  | 'LOWEST'
  | 'EQUALS' // ==
  | 'LESSGREATER' // > or <
  | 'SUM' // +
  | 'PRODUCT' // *
  | 'PREFIX' // -x or !x
  | 'CALL'; // func()

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

export type TokenTypePrecedences = Map<
  TokenType,
  Precedence
>;

export const TokenTypePrecedences = new Map<
  TokenType,
  Precedence
>([
  ['EQ', 'EQUALS'],
  ['NOT_EQ', 'EQUALS'],
  ['LT', 'LESSGREATER'],
  ['GT', 'LESSGREATER'],
  ['PLUS', 'SUM'],
  ['MINUS', 'SUM'],
  ['SLASH', 'PRODUCT'],
  ['ASTERISK', 'PRODUCT'],
]);
