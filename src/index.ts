import ts from "typescript";
import { defaultCompilerOptions, Parser } from "./core/parser";
import { ParseResult } from "./type";

export const parse = (
  filePaths: string | string[],
  compilerOptions: ts.CompilerOptions = defaultCompilerOptions
): ParseResult => {
  const parser = new Parser(filePaths, compilerOptions).parse();
  return {
    moduleGraph: parser.getModuleGraph(),
    doc: {},
  };
};
