import { it, expect, suite } from 'vitest'
import { readFile } from '../src/utils/fs'
import path from 'path'

const rawTsSampleFilePath = path.resolve(__dirname, './sample/raw-ts.ts')

suite('utils', () => {
  it('fs-readFile correctly', async () => {
    const content = await readFile(rawTsSampleFilePath)
    expect(content).toMatchSnapshot()
  })
})
