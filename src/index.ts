import ts from "typescript";
import { defaultCompilerOptions, Parser } from "./core/parser";
import { Doc } from "./core/doc";

export const parse = (
  filePaths: string | string[],
  compilerOptions: ts.CompilerOptions = defaultCompilerOptions
): Doc => {
  const parser = new Parser(filePaths, compilerOptions);
  return parser.parse();
};
