# 我的 Rime 配置

> 只需简单几步即可将你的输入法切换到 Rime

## 功能

- 一键部署配置，无心智负担使用
- 内置实用[命令](#命令说明)，方便你管理配置
- 更好的[中英文切换方案](#中英文切换方案)
- 仅包含基于 [rime-ice](https://github.com/iDvel/rime-ice) 修改过的自定义配置补丁，不用担心更新配置被覆盖

<img width="408" src="https://user-images.githubusercontent.com/20062482/233144309-8ef002fa-102f-4ff4-9491-779a3736836a.png">

<details>
<summary>如果你没有 Node.js 和 pnpm 请先点击此处查看安装说明</summary>
<br>

先安装 [fnm](https://github.com/Schniz/fnm) 方便你管理 [Node.js](https://nodejs.org/) 版本

```sh
brew install fnm
```

然后安装 [Node.js](https://nodejs.org/)

```sh
# 安装最新稳定版
fnm install lts/Hydrogen

# 以下命令可以省略
# 使用 v18.x 最新版本
fnm use 18
# 将 v18.x 最新版本设置为默认使用版本
fnm default 18
```

然后安装 [pnpm](https://pnpm.io/)

```sh
brew install pnpm
```

</details>

## 目录

- [安装输入法](#安装输入法)
- [使用步骤](#使用步骤)
- [修改配置](#修改配置)
- [同步本地配置和词库到 iCloud Drive](#同步)
- [中英文切换方案](#中英文切换方案)
- [更换皮肤 & 皮肤预览](#皮肤)
- [更新 rime-ice 配置](#更新-rime-ice-配置)
- [将此仓库作为你自己的 Rime 配置模板](#将此仓库作为你自己的-rime-配置模板)
- [命令说明](#命令说明)

## 安装输入法

```sh
brew install --cask squirrel
```

手动安装：https://rime.im

## 使用步骤

备份你的配置

```sh
mv ~/Library/Rime ~/Library/Rime.bak
```

将该仓库克隆到 `~/Library/Rime` 目录

```sh
git clone --recurse-submodules https://github.com/u3u/rime.git ~/Library/Rime
```

进入 `~/Library/Rime` 目录，然后执行 `pnpm i` 命令，这会将 [rime-ice](https://github.com/iDvel/rime-ice) 子模块中的文件创建符号链接到 `Rime` 目录

```sh
cd ~/Library/Rime && pnpm i
```

执行 [`pnpm reload`](#命令说明) 命令重新部署，你也可以点击菜单栏【ㄓ】-【重新部署】，然后就可以愉快的使用啦！🥳

## 修改配置

原则上你应该只能修改 `*.custom.yaml` 补丁文件，参考 [`rime_ice.custom.yaml`](rime_ice.custom.yaml) 文件，可以查看[详细文档](https://dvel.me/posts/rime-ice/#%e4%bb%a5-patch-%e7%9a%84%e6%96%b9%e5%bc%8f%e6%89%93%e8%a1%a5%e4%b8%81)

推荐使用 [VSCode](https://code.visualstudio.com/) 修改配置，我在 [`.vscode/settings.json`](.vscode/settings.json) 中排除了不常修改的文件，方便你专注于自己的配置

```sh
# 使用 VSCode 打开 Rime 配置目录
code ~/Library/Rime
```

<img width="1363" src="https://user-images.githubusercontent.com/20062482/233145736-546bc01a-ca88-4aad-a53b-fddc93b63d92.png">

> 💡 每次修改配置后都需要重新部署 Rime 输入法才能生效，修改配置后执行 [`pnpm reload`](#命令说明) 命令即可重新部署

## 同步

首次部署后修改 `installation.yaml`，新增 `sync_dir` 字段

```yaml
# 目录名称，可自定义
installation_id: 'macos-rime-ice'
# iCloud 同步路径，将 `:name` 替换成你的用户名即可
sync_dir: '/Users/:name/Library/Mobile Documents/com~apple~CloudDocs/RimeSync'
```

然后执行 [`pnpm sync`](#命令说明) 命令将本地配置和词库同步到 `iCloud` 中的 `RimeSync` 目录  
你也可以点击菜单栏【ㄓ】-【同步用户数据】

## 中英文切换方案

我使用 [Karabiner-Elements](https://karabiner-elements.pqrs.org/) 设置快捷键直接切换 ABC 输入法，禁用输入法自带的切换功能，该方案所有输入法通用。另一个原因我如果没记错的话是很久以前系统 Bug，使用系统设置的 <kbd>⇪ CapsLock</kbd> 切换 ABC 功能经常出现中英文状态随机错乱。如果系统 Bug 已经修复了，你嫌麻烦的话也可以直接使用系统功能

导入方案配置：

> 由于 GitHub Markdown 限制 URL Scheme 链接，我使用 [`spx`](https://github.com/inlife/spx) 服务代理  
> 如果点击以下链接无法拉起 App 自动导入，请手动复制链接打开

- [导入 <kbd>⇪ CapsLock</kbd> 切换中英文](https://spx.vercel.app/1/karabiner%3A%2F%2Fkarabiner%2Fassets%2Fcomplex_modifications%2Fimport%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fu3u%2Frime%2Fmain%2Fke-complex-modifications%2Fcaps-lock-switch-input-source.json) [[查看JSON]](./ke-complex-modifications/caps-lock-switch-input-source.json)  
  `karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/u3u/rime/main/ke-complex-modifications/caps-lock-switch-input-source.json`
- [导入左 <kbd>⌃ Control</kbd> 切换中英文](https://spx.vercel.app/1/karabiner%3A%2F%2Fkarabiner%2Fassets%2Fcomplex_modifications%2Fimport%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fu3u%2Frime%2Fmain%2Fke-complex-modifications%2Fleft-control-switch-input-source.json) [[查看JSON]](./ke-complex-modifications/left-control-switch-input-source.json)  
  `karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/u3u/rime/main/ke-complex-modifications/left-control-switch-input-source.json`
- [导入左 <kbd>⇧ Shift</kbd> 切换中英文](https://spx.vercel.app/1/karabiner%3A%2F%2Fkarabiner%2Fassets%2Fcomplex_modifications%2Fimport%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fu3u%2Frime%2Fmain%2Fke-complex-modifications%2Fleft-shift-switch-input-source.json) [[查看JSON]](./ke-complex-modifications/left-shift-switch-input-source.json)  
  `karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/u3u/rime/main/ke-complex-modifications/left-shift-switch-input-source.json`

> 注：仅单独按下键时触发，不影响原组合键功能，请放心使用

💡 推荐使用左 <kbd>⇪ CapsLock</kbd> / <kbd>⌃ Control</kbd> 键切换中英文输入法  
❌ 我不推荐左 <kbd>⇧ Shift</kbd> 键切换，因为 <kbd>⇧ Shift</kbd> 键是用来按住时输入大写字母的，容易连按造成中英文误切换

<img width="640" src="https://user-images.githubusercontent.com/20062482/235362555-849ae1fe-bd6f-43bb-8e8a-d86ac1b5b469.png">

导入方案后点击启用，这些方案只会将按键映射到一个不存在的 <kbd>F17</kbd>  
你还需要在系统设置 -> 键盘 -> 快捷键中设置切换输入法的快捷键

<img width="640" src="https://user-images.githubusercontent.com/20062482/235359511-857f3f07-192a-486f-b8a3-6fe6772ee09f.png">

由于我现在使用 [HHKB](https://www.hhkeyboard.com/uk/) 键盘，所以我使用左 <kbd>⌃ Control</kbd> 代替 <kbd>⇪ CapsLock</kbd> 切换中英文方案

- [导入外接 HHKB 键盘专属方案](https://spx.vercel.app/1/karabiner%3A%2F%2Fkarabiner%2Fassets%2Fcomplex_modifications%2Fimport%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fu3u%2Frime%2Fmain%2Fke-complex-modifications%2Fleft-control-switch-input-source-with-hhkb.json) [[查看JSON]](./ke-complex-modifications/left-control-switch-input-source-with-hhkb.json)  
  苹果内置键盘使用 <kbd>⇪ CapsLock</kbd> 切换中英文，HHKB 使用左 <kbd>⌃ Control</kbd> 切换中英文  
  `karabiner://karabiner/assets/complex_modifications/import?url=https://raw.githubusercontent.com/u3u/rime/main/ke-complex-modifications/left-control-switch-input-source-with-hhkb.json`

<img width="640" src="https://user-images.githubusercontent.com/20062482/235359544-cffb7e9d-a268-4bf3-84a8-d385b8a1c93e.png">

## 皮肤

如果要更换皮肤可以修改 [`squirrel.custom.yaml`](./squirrel.custom.yaml) 文件，里面有注释说明

感谢 [@ssnhd](https://github.com/ssnhd) 提供简洁的仿 macOS 原生皮肤

<img src="https://user-images.githubusercontent.com/20062482/235359437-5b47c18c-633c-4eb4-8a2d-563568bd8bf8.jpeg" width="640">

## 更新 [rime-ice](https://github.com/iDvel/rime-ice) 配置

你可以使用 [`pnpm run update`](#命令说明) 命令更新 [rime-ice](https://github.com/iDvel/rime-ice) 远程最新配置，然后使用 [`pnpm reload`](#命令说明) 命令重新部署 Rime 输入法

```sh
pnpm run update && pnpm reload
```

## 将此仓库作为你自己的 Rime 配置模板

将 Git 远程地址修改为你自己的仓库地址，然后将配置推送到你自己仓库

```sh
git remote set-url origin git@github.com:u3u/rime.git
git push -u origin main
```

## 命令说明

你可以在 `~/Library/Rime` 目录使用以下命令：

- [`pnpm reload`](package.json): 重新部署 Rime 输入法
- [`pnpm sync`](package.json): 将用户配置同步到 `sync_dir`
- [`pnpm run update`](package.json): 将 [rime-ice](https://github.com/iDvel/rime-ice) 的最新配置同步到本地
- [`pnpm run link`](package.json): 将 [rime-ice](https://github.com/iDvel/rime-ice) 子模块中的文件创建符号链接到 `Rime` 目录（执行 `pnpm i` 和 `pnpm run update` 后会自动运行）

## 参考

- https://dvel.me/posts/rime-ice/
- https://ssnhd.com/2022/01/06/rime/
- https://github.com/iDvel/rime-ice
- https://github.com/ssnhd/rime
