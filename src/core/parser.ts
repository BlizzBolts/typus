import ts from "typescript";
import { serializeSymbol } from "../utils/doc";
import { Doc } from "./doc";

export const defaultCompilerOptions = {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

export class Parser {
  private compilerOptions: ts.CompilerOptions = defaultCompilerOptions;
  private filePaths: string[] = [];
  private program!: ts.Program;
  private typeChecker!: ts.TypeChecker;
  private cache: Map<ts.Type, Doc> = new Map<ts.Type, Doc>();

  constructor(
    filePaths?: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    if (filePaths) {
      this.setup(filePaths, compilerOptions);
    }
  }

  setup(
    filePaths: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    this.compilerOptions = Object.assign(
      defaultCompilerOptions,
      compilerOptions
    );
    this.filePaths = Array.isArray(filePaths) ? filePaths : [filePaths];
    this.program = ts.createProgram(this.filePaths, this.compilerOptions);
    this.typeChecker = this.program.getTypeChecker();

    this.cache.clear();
  }

  parse() {
    const validSourceFiles = this.program.getSourceFiles().filter((o) => {
      return !o.isDeclarationFile;
    });

    const rootDoc = new Doc();

    validSourceFiles.forEach((o: ts.SourceFile) => {
      o.forEachChild((p: ts.Node) => {
        this.traverse(p, rootDoc);
      });
    });

    return rootDoc;
  }

  parseInterface(node: ts.InterfaceDeclaration, parent: Doc) {
    const interfaceType = this.typeChecker.getTypeAtLocation(node.name);
    const Doc = serializeSymbol(interfaceType.getSymbol()!, this.typeChecker);
    parent.children?.push(Doc);
    this.cache.set(interfaceType, Doc);

    if (Array.isArray(node.members)) {
      node.members.forEach((memberNode) => {
        this.traverse(memberNode, Doc);
      });
    }
  }

  parseFunction(node: ts.FunctionDeclaration, parent: Doc) {
    const fnType = this.typeChecker.getTypeAtLocation(node);
    const Doc = serializeSymbol(fnType.getSymbol()!, this.typeChecker);
    parent.children?.push(Doc);
    this.cache.set(fnType, Doc);

    if (Array.isArray(node.parameters)) {
      node.parameters.forEach((parameter) => this.traverse(parameter, Doc));
    }
  }

  parseFunctionParameter = (node: ts.ParameterDeclaration, parent: Doc) => {
    const parameterType = this.typeChecker.getTypeAtLocation(node.name);
    if (this.cache.has(parameterType)) {
      parent.parameters?.push(this.cache.get(parameterType)!);
    } else {
      const symbol = this.typeChecker.getSymbolAtLocation(node.name!);
      parent.parameters?.push(serializeSymbol(symbol!, this.typeChecker));
    }
  };

  parseInterfaceMember = (node: ts.TypeElement, parent: Doc) => {
    const memberType = this.typeChecker.getTypeAtLocation(node!.name!);

    if (this.cache.has(memberType)) {
      parent.members?.push(this.cache.get(memberType)!);
    } else {
      const symbol = this.typeChecker.getSymbolAtLocation(node.name!);
      parent.members?.push(serializeSymbol(symbol!, this.typeChecker));
    }
  };

  traverse(node: ts.Node, parent: Doc) {
    if (ts.isTypeElement(node)) {
      this.parseInterfaceMember(node, parent);
    }
    if (ts.isVariableDeclaration(node)) {
      console.log("isVariableDeclaration!");
    }
    if (ts.isVariableDeclaration(node)) {
      console.log("isVariableDeclaration");
    }
    if (ts.isVariableDeclarationList(node)) {
      console.log("isVariableDeclarationList");
    }
    if (ts.isFunctionDeclaration(node)) {
      this.parseFunction(node, parent);
    }
    if (ts.isParameter(node)) {
      this.parseFunctionParameter(node, parent);
    }
    if (ts.isClassDeclaration(node)) {
      console.log("isClassDeclaration");
    }
    if (ts.isInterfaceDeclaration(node)) {
      this.parseInterface(node, parent);
    }
    if (ts.isTypeAliasDeclaration(node)) {
      console.log("isTypeAliasDeclaration");
    }
    if (ts.isEnumDeclaration(node)) {
      console.log("isEnumDeclaration");
    }
    if (ts.isModuleDeclaration(node)) {
      console.log("isModuleDeclaration");
    }
  }
}
