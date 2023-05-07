// @ts-check
import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import { globby } from 'globby'

const cwd = 'rime-ice'
const ignore = ['.gitignore', 'README.md', 'LICENSE', 'custom_phrase.txt']

const paths = await globby('*', {
  cwd,
  ignore,
  onlyFiles: false,
})

await Promise.allSettled(
  paths.map(async (item) => {
    const file = path.join(cwd, item)
    const link = `${chalk.magenta(item)} -> ${file}`

    try {
      await fs.rm(item)
      await fs.symlink(file, item)
      console.log(chalk.green('✔'), link)
    } catch {
      console.log(chalk.gray(`skip ${link}`))
    }
  })
)

console.log(chalk.green('✔'), 'Create symlinks done.')
