#!/usr/bin/env node
// @ts-check
import fs from 'node:fs/promises'
import path from 'node:path'
import { cac } from 'cac'
import chalk from 'chalk'
import { globby } from 'globby'

const cli = cac('symlinks')

cli.version('0.0.0')

cli
  .command('')
  .option('--cwd', 'Specify the current working directory', { default: 'rime-ice' })
  .option('-i, --ignore', 'Ignore files and folders', {
    default: ['.gitignore', 'README.md', 'LICENSE', 'custom_phrase.txt'],
  })
  .option('-f, --force', 'Force symlink creation')
  .option('--clean', 'Clean symlinks')
  .action(async (options) => {
    const { clean, cwd, force, ignore } = options

    const paths = await globby('*', {
      cwd,
      ignore,
      onlyFiles: false,
    })

    await Promise.allSettled(
      paths.map(async (item) => {
        const file = path.join(cwd, item)
        const link = `${item} -> ${file}`

        try {
          if (force || clean) await fs.unlink(item)
          if (!clean) await fs.symlink(file, item)
          console.log(chalk.green('✔'), clean ? item : link)
        } catch {
          console.log(chalk.gray(`skip ${link}`))
        }
      })
    )

    console.log(chalk.green('✔'), `${clean ? 'Clean' : 'Create'} symlinks done.`)
  })

cli.help()

cli.parse()
