import ts from "typescript";

export interface BaseModule<T> {
  name?: string;
  documentation?: string;
  type?: string;
  _type?: ts.Type;
  tags?: { name: string; text: string }[];
  required?: boolean;
  members?: T[];
  parameters?: T[];
  children?: T[];
  symbol?: ts.Symbol;

  toString: () => T;
}
