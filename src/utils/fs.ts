import fsx from 'fs-extra'

export const readFile = async (absFilePath: string): Promise<string> => {
  const content = await fsx.readFile(absFilePath, {
    encoding: 'utf-8',
  })
  return content
}
