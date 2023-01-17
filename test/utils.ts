import path from "node:path";
import url from "node:url";

const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

export const getManifestPath = (manifestName: string) => {
  return path.resolve(__dirname, `./manifest/${manifestName}.ts`);
};
