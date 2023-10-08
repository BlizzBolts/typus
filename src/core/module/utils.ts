import ts, { SymbolDisplayPart } from "typescript";
import { Module } from "./module";

const MODULE_MAPPER = new Map<number, Module>();

export const getModuleByHash = (hashId: number): Module | undefined => {
  return MODULE_MAPPER.get(hashId);
};

export const setModule = (hash: number, m: Module): void => {
  MODULE_MAPPER.set(hash, m);
};

export const generateModule = (
  node: ts.Node,
  type: ts.Type,
  checker: ts.TypeChecker
): Module => {
  // @ts-ignore
  const symbol = checker.getSymbolAtLocation(node) || node.symbol;
  return new Module({
    name: symbol?.getName(),
    documentation: ts.displayPartsToString(
      symbol?.getDocumentationComment(checker)
    ),
    type: checker.typeToString(type),
    _type: type,
    tags: symbol
      ?.getJsDocTags(checker)
      .map((o: { name: string; text: SymbolDisplayPart[] }) => {
        return {
          name: o.name,
          text: ts.displayPartsToString(o.text),
        };
      }),
    children: [],
    members: [],
    parameters: [],
    symbol: checker.getTypeAtLocation(node) as unknown as ts.Symbol,
    // required: symbol?.["questionToken"],
  });
};

export const generateModuleForTypeAliasFunction = () => {};
