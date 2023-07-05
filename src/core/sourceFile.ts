import { Doc, SerialziedDoc } from "./doc";

export type FilePath = string;

interface SourceFilePayload {
  filePath: FilePath;
  docs?: Doc[];
}

export interface SerialzieSourceFile {
  filePath: FilePath;
  docs: SerialziedDoc[];
}

export class SourceFile {
  private filePath: FilePath;

  private docs?: Doc[];

  constructor(payload: SourceFilePayload) {
    const { filePath, docs = [] } = payload;
    this.filePath = filePath;
    this.docs = docs;
  }

  public setFilePath(filePath: FilePath): this {
    this.filePath = filePath;
    return this;
  }

  public getFilePath(): FilePath {
    return this.filePath;
  }

  public addDoc(doc: Doc) {
    this.docs!.push(doc);
    return this;
  }

  public static serialize(curr: SourceFile) {
    return {
      filePath: curr.filePath,
      docs: curr.docs?.map(Doc.serialize),
    };
  }
}
