import ts from "typescript";
import { Doc } from "./core/doc";

export type Cache = Map<ts.Type, Doc>;
