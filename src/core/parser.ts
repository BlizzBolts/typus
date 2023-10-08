import ts from "typescript";
import { generateModule } from "../core/module/utils";
import { ModuleGraph, Module } from "./module";

export const defaultCompilerOptions = {
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.Latest,
};

export class Parser {
  private compilerOptions: ts.CompilerOptions = defaultCompilerOptions;
  private filePaths: string[] = [];
  private program!: ts.Program;
  private typeChecker!: ts.TypeChecker;
  private moduleGraph: ModuleGraph = new ModuleGraph();

  constructor(
    filePaths?: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    if (filePaths) {
      this.setup(filePaths, compilerOptions);
    }
  }

  static of(
    filePaths?: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ) {
    return new Parser(filePaths, compilerOptions);
  }

  getTypeChecker() {
    return this.typeChecker;
  }

  getProgram() {
    return this.program;
  }

  getModuleGraph() {
    return this.moduleGraph;
  }

  setup(
    filePaths: string | string[],
    compilerOptions: Partial<ts.CompilerOptions> = defaultCompilerOptions
  ): this {
    this.compilerOptions = Object.assign(
      defaultCompilerOptions,
      compilerOptions
    );
    this.filePaths = Array.isArray(filePaths) ? filePaths : [filePaths];
    this.program = ts.createProgram(this.filePaths, this.compilerOptions);
    this.typeChecker = this.program.getTypeChecker();

    return this;
  }

  parse(): this {
    const validSourceFiles = this.program.getSourceFiles().filter((o) => {
      return !o.isDeclarationFile;
    });

    const moduleGraphs = validSourceFiles
      .map((o: ts.SourceFile) => {
        const result: Module[] = [];
        o.forEachChild((n: ts.Node): void => {
          const module = this.traverse(n);
          if (module) {
            result.push(module);
          }
        });
        return result;
      })
      .filter(Boolean) as ModuleGraph[][];

    this.moduleGraph.children = moduleGraphs;
    return this;
  }

  parseInterfaceDeclaration(node: ts.InterfaceDeclaration): Module {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const cacheModule = this.moduleGraph.getCacheBy(type);
    if (cacheModule) {
      return cacheModule;
    }
    const module = generateModule(node, type, this.typeChecker);
    this.moduleGraph.setCacheModule(type, module);
    if (Array.isArray(node.members)) {
      module.members = node.members
        .map((memberNode) => {
          return this.traverse(memberNode);
        })
        .filter(Boolean) as ModuleGraph[];
    }
    return module;
  }

  parseTypeAliasDeclaration(node: ts.TypeAliasDeclaration): Module {
    const type = this.typeChecker.getTypeAtLocation(node.name);
    const cacheModule = this.moduleGraph.getCacheBy(type);
    if (cacheModule) {
      return cacheModule;
    }
    if (ts.isTypeAliasDeclaration(node)) {
      console.log(1);
    }
    const module = generateModule(node, type, this.typeChecker);
    this.moduleGraph.setCacheModule(type, module);
    return module;
  }

  parseMethodSignature(node: ts.MethodSignature): Module {
    const type = this.typeChecker.getTypeAtLocation(node);
    const cacheModule = this.moduleGraph.getCacheBy(type);
    if (cacheModule) {
      return cacheModule;
    }
    const module = generateModule(node, type, this.typeChecker);

    if (Array.isArray(node.parameters)) {
      module.parameters = node.parameters
        .map((parameter) => this.traverse(parameter))
        .filter(Boolean) as ModuleGraph[];
    }
    return module;
  }

  parseParameter = (node: ts.ParameterDeclaration): Module => {
    const type = this.typeChecker.getTypeAtLocation(node);
    const cacheModule = this.moduleGraph.getCacheBy(type);
    if (cacheModule) {
      return cacheModule;
    }
    const module = generateModule(node.name, type, this.typeChecker);
    return module;
  };

  parsePropertySignature = (node: ts.PropertySignature) => {
    const type = this.typeChecker.getTypeAtLocation(node.name!);
    const cacheModule = this.moduleGraph.getCacheBy(type);
    if (cacheModule) {
      return cacheModule;
    }
    const module = generateModule(node.name, type, this.typeChecker);
    if (node.type && ts.isFunctionTypeNode(node.type)) {
      module.parameters = node.type.parameters
        .map((parameter) => this.traverse(parameter))
        .filter(Boolean) as ModuleGraph[];
    }
    return module;

    // if (node.type && ts.isTypeReferenceNode(node.type)) {
    //   node.type.parameters.forEach((parameter) =>
    //     this.traverse(parameter, doc)
    //   );
    // }
  };

  // parseFunction(node: ts.FunctionDeclaration, parent: Doc) {
  //   const fnType = this.typeChecker.getTypeAtLocation(node);
  //   const Doc = generateModule(node, fnType.getSymbol()!, this.typeChecker);
  //   parent.children?.push(Doc);
  //   this.cache.set(fnType, Doc);

  //   if (Array.isArray(node.parameters)) {
  //     node.parameters.forEach((parameter) => this.traverse(parameter, Doc));
  //   }
  // }

  // parseInterfaceMember = (node: ts.TypeElement, parent: Doc) => {
  //   const memberType = this.typeChecker.getTypeAtLocation(node!.name!);

  //   if (this.cache.has(memberType)) {
  //     parent.members?.push(this.cache.get(memberType)!);
  //   } else {
  //     const symbol = this.typeChecker.getSymbolAtLocation(node.name!);
  //     parent.members?.push(generateModule(node, symbol!, this.typeChecker));
  //   }
  // };

  traverse(node: ts.Node): Module | null {
    // if (this.cache.has(this.typeChecker.getTypeAtLocation(node))) {
    // }

    if (ts.isInterfaceDeclaration(node)) {
      console.log("isInterfaceDeclaration!");
      return this.parseInterfaceDeclaration(node);
    }

    if (ts.isMethodSignature(node)) {
      console.log("isMethodSignature!");
      return this.parseMethodSignature(node);
    }

    if (ts.isPropertySignature(node)) {
      console.log("isPropertySignature!");
      return this.parsePropertySignature(node);
    }

    if (ts.isParameter(node)) {
      console.log("isParameter!");
      return this.parseParameter(node);
    }

    // if (ts.isVariableDeclaration(node)) {
    //   console.log("isVariableDeclaration!");
    //   this.parseIndexSignatureDeclaration(node, parent)
    //   return;
    // }

    // if (ts.isFunctionDeclaration(node)) {
    //   console.log("isFunctionDeclaration!");
    //   this.parseFunction(node, parent);
    //   return;
    // }

    // if (ts.isClassDeclaration(node)) {
    //   console.log("isClassDeclaration");
    //   return;
    // }

    if (ts.isTypeAliasDeclaration(node)) {
      console.log("isTypeAliasDeclaration");
      return this.parseTypeAliasDeclaration(node);
    }

    // if (ts.isEnumDeclaration(node)) {
    //   console.log("isEnumDeclaration");
    //   return;
    // }
    // if (ts.isModuleDeclaration(node)) {
    //   console.log("isModuleDeclaration");
    //   return;
    // }

    // if (ts.isTypeElement(node)) {
    //   console.log("isTypeElement!");
    //   this.parseInterfaceMember(node, parent);
    //   return;
    // }

    return null;
  }
}
