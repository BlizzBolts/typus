import ts from "typescript";
import type { Doc } from "./core/doc";
import { ModuleGraph } from "./core/module";

export type Cache = Map<ts.Type, Doc>;

export interface ParseResult {
  doc: Doc;
  moduleGraph: ModuleGraph;
}
