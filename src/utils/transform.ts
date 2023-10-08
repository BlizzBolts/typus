import { flatten } from "lodash";
import { Doc } from "../core/doc";
import { Module, ModuleGraph } from "../core/module";

let cacheDocs = new Map<Module, Doc>();

export const transformModuleGraph2Doc = (graph: ModuleGraph): Doc => {
  const { children } = graph;
  const rootDoc = new Doc({
    name: "root",
  });
  const modules = flatten(children);

  rootDoc.children = modules.map((o) => traverseModule2Doc(o, graph));
  cacheDocs.clear();
  return rootDoc;
};

export const traverseModule2Doc = (module: Module, graph: ModuleGraph): Doc => {
  const doc = new Doc();
  doc.name = module.name;
  doc.documentation = module.documentation;
  doc.type = module.type;
  doc.tags = module.tags;
  doc.symbol = module.symbol;
  doc.required = module.required;

  // block cycle reference
  const cacheDoc = cacheDocs.get(module);
  if (cacheDoc) {
    return doc;
  } else {
    cacheDocs.set(module, doc);
  }

  doc.members = module?.members?.map((o) => traverseModule2Doc(o, graph)) || [];
  doc.parameters =
    module?.parameters?.map((o) => traverseModule2Doc(o, graph)) || [];
  doc.children =
    module?.children?.map((o) => traverseModule2Doc(o, graph)) || [];

  return doc;
};
