import ts from "typescript"
import { defaultCompilerOptions, TypusCompiler } from "./compiler"
import { DocCache } from "./DocCache"

export const parse = (
  filePaths: string | string[],
  compilerOptions: ts.CompilerOptions = defaultCompilerOptions,
): DocCache => {
  const compiler = new TypusCompiler(filePaths, compilerOptions)
  return compiler.parse()
}
