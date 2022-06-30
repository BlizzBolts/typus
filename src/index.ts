import ts from "typescript"
import { isEmpty, merge } from "lodash-es"
import { serializeSymbol } from "./utils/doc"
import { DocCache } from "./DocCache"
import { DocEntry } from "./types"

export const defaultCompilerOptions = {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
}

class TypusCompiler {
  private compilerOptions: ts.CompilerOptions
  private filePaths: string | string[]
  private program: ts.Program
  private typeChecker: ts.TypeChecker
  // private targetMember?: string
  private docCache: DocCache

  constructor(
    filePaths: string | string[],
    compilerOptions: Partial<ts.CompilerOptions>,
    // targetMember?: string,
  ) {
    this.compilerOptions = merge(compilerOptions, defaultCompilerOptions)
    this.filePaths = Array.isArray(filePaths) ? filePaths : [filePaths]
    this.program = ts.createProgram(this.filePaths, this.compilerOptions)
    this.typeChecker = this.program.getTypeChecker()
    // this.targetMember = targetMember
    this.docCache = new DocCache()
  }

  parse(): DocCache {
    const validSourceFiles = this.program.getSourceFiles().filter((o) => {
      // return this.filePaths.includes(o.fileName)
      return !o.isDeclarationFile
    })

    const root: DocEntry = {
      name: "root",
      children: [],
    }

    validSourceFiles.forEach((o) => {
      o.forEachChild((p) => {
        this.traverse(p, root)
      })
    })

    return this.docCache
  }

  parseInterface(node: ts.InterfaceDeclaration, parent: DocEntry) {
    const interfaceType = this.typeChecker.getTypeAtLocation(node.name)
    const docEntry = serializeSymbol(
      interfaceType.getSymbol()!,
      this.typeChecker,
    )
    parent.children?.push(docEntry)
    this.docCache.set(interfaceType, docEntry)

    if (!isEmpty(node.members)) {
      node.members.forEach((memberNode) => {
        this.traverse(memberNode, docEntry)
      })
    }
  }

  parseFunction(node: ts.FunctionDeclaration, parent: DocEntry) {
    const fnType = this.typeChecker.getTypeAtLocation(node)
    const docEntry = serializeSymbol(fnType.getSymbol()!, this.typeChecker)
    parent.children?.push(docEntry)
    this.docCache.set(fnType, docEntry)

    if (!isEmpty(node.parameters)) {
      node.parameters.forEach((parameter) => this.traverse(parameter, docEntry))
    }
  }

  parseFunctionParameter = (
    node: ts.ParameterDeclaration,
    parent: DocEntry,
  ) => {
    const parameterType = this.typeChecker.getTypeAtLocation(node.name)
    if (this.docCache.has(parameterType)) {
      parent.parameters?.push(this.docCache.get(parameterType)!)
    } else {
      const symbol = this.typeChecker.getSymbolAtLocation(node.name!)
      parent.parameters?.push(serializeSymbol(symbol!, this.typeChecker))
    }
  }

  parseInterfaceMember = (node: ts.TypeElement, parent: DocEntry) => {
    const memberType = this.typeChecker.getTypeAtLocation(node!.name!)

    if (this.docCache.has(memberType)) {
      parent.members?.push(this.docCache.get(memberType)!)
    } else {
      const symbol = this.typeChecker.getSymbolAtLocation(node.name!)
      parent.members?.push(serializeSymbol(symbol!, this.typeChecker))
    }
  }

  traverse(node: ts.Node, parent: DocEntry) {
    if (ts.isInterfaceDeclaration(node)) {
      this.parseInterface(node, parent)
    }

    if (ts.isFunctionDeclaration(node)) {
      this.parseFunction(node, parent)
    }

    if (ts.isParameter(node)) {
      this.parseFunctionParameter(node, parent)
    }

    if (ts.isTypeElement(node)) {
      this.parseInterfaceMember(node, parent)
    }

    if (ts.isVariableDeclaration(node)) {
      console.log("variable!")
    }
  }

  getProgram() {
    return this.program
  }

  getTypeChecker() {
    return this.typeChecker
  }
}

export const parse = (
  filePaths: string | string[],
  compilerOptions: ts.CompilerOptions = defaultCompilerOptions,
): DocCache => {
  const compiler = new TypusCompiler(filePaths, compilerOptions)
  return compiler.parse()
}
