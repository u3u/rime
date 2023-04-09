import fs from 'fs/promises'
import chalk from 'chalk'
import { globby } from 'globby'

const name = 'rime-ice'
const excludes = ['.gitignore', 'README.md', 'LICENSE', 'custom_phrase.txt']

const paths = await globby([`${name}/*`, ...excludes.map((item) => `!${name}/${item}`)], {
  onlyFiles: false,
})

await Promise.allSettled(
  paths.map(async (path) => {
    await fs.symlink(path, path.replace(`${name}/`, ''))
    console.log(`${chalk.green('✔')} ${path}`)
  })
)

console.log(`${chalk.green('✔')} Create symlinks done.`)
