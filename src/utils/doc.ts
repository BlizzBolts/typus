import ts from "typescript"
import type { DocEntry } from "../types"

// export const getInterfaceDocuments = (
//   node: ts.Node,
//   checker: ts.TypeChecker,
// ) => {
//   const symbol = checker.getSymbolAtLocation(node.name)
//   if (!symbol) {
//     return
//   }

//   const main = serializeSymbol(symbol, checker, node)

//   main.fields = node.members
//     .map((m) => {
//       if (!m.name) return
//       const symbol = checker.getSymbolAtLocation(m.name)
//       if (!symbol) return
//       return serializeSymbol(symbol, checker, m)
//     })
//     .filter(Boolean) as DocEntry[]

//   return main
// }

export const serializeSymbol = (
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): DocEntry => {
  return {
    name: symbol?.getName(),
    documentation: ts.displayPartsToString(
      symbol?.getDocumentationComment(checker),
    ),
    symbolType: checker.getTypeOfSymbolAtLocation(
      symbol,
      symbol?.valueDeclaration!,
    ),
    type: checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol, symbol?.valueDeclaration!),
    ),
    tags: symbol?.getJsDocTags(checker).map((o) => {
      return {
        name: o.name,
        text: ts.displayPartsToString(o.text),
      }
    }),
    children: [],
    members: [],
    parameters: [],
    // @ts-ignore
    required: symbol?.["questionToken"],
  }
}
