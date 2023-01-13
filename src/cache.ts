import ts from "typescript";
import { Doc } from "./core/doc";
import { Cache } from "./type";

let cache: Cache = new Map<ts.Type, Doc>();

export const addCache = (key: ts.Type, value: Doc) => {
  return cache.set(key, value);
};

export const getCache = (key: ts.Type): Doc => {
  return cache.get(key)!;
};

export const hasCache = (key: ts.Type): boolean => {
  return cache.has(key);
};
