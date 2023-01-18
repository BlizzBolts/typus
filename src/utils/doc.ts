import ts from "typescript";
import { Doc } from "../core/doc";

// export const getInterfaceDocuments = (
//   node: ts.Node,
//   checker: ts.TypeChecker,
// ) => {
//   const symbol = checker.getSymbolAtLocation(node.name)
//   if (!symbol) {
//     return
//   }

//   const main = generateDoc(symbol, checker, node)

//   main.fields = node.members
//     .map((m) => {
//       if (!m.name) return
//       const symbol = checker.getSymbolAtLocation(m.name)
//       if (!symbol) return
//       return generateDoc(symbol, checker, m)
//     })
//     .filter(Boolean) as DocEntry[]

//   return main
// }

export const generateDoc = (
  node: ts.Node,
  type: ts.Type,
  checker: ts.TypeChecker
): Doc => {
  const symbol = checker.getSymbolAtLocation(node) || type.getSymbol();
  return new Doc({
    name: symbol?.getName(),
    documentation: ts.displayPartsToString(
      symbol?.getDocumentationComment(checker)
    ),
    type: checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol!, symbol?.valueDeclaration!)
    ),
    tags: symbol?.getJsDocTags(checker).map((o) => {
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
