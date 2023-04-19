# 我的 Rime 配置

> 只需简单几步即可将你的输入法切换到 Rime

## 功能

- 一键部署配置，无心智负担使用
- 内置实用[命令](#命令说明)，方便你管理配置
- 仅包含基于 [rime-ice](https://github.com/iDvel/rime-ice) 修改过的自定义配置补丁，不用担心更新配置被覆盖

<img width="408" alt="image" src="https://user-images.githubusercontent.com/20062482/233144309-8ef002fa-102f-4ff4-9491-779a3736836a.png">

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

- [使用步骤](#使用步骤)
- [修改配置](#修改配置)
- [同步本地配置和词库到 iCloud Drive](#同步)
- [更换皮肤 & 皮肤预览](#皮肤)
- [更新 rime-ice 配置](#更新-rime-ice-配置)
- [将此仓库作为你自己的 Rime 配置模板](#将此仓库作为你自己的-rime-配置模板)
- [命令说明](#命令说明)

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

执行 `pnpm reload` 命令重新部署，你也可以点击菜单栏【ㄓ】-【重新部署】，然后就可以愉快的使用啦！🥳

## 修改配置

原则上你应该只能修改 `*.custom.yaml` 补丁文件，参考 [`rime_ice.custom.yaml`](rime_ice.custom.yaml) 文件，可以查看[详细文档](https://dvel.me/posts/rime-ice/#%e4%bb%a5-patch-%e7%9a%84%e6%96%b9%e5%bc%8f%e6%89%93%e8%a1%a5%e4%b8%81)

推荐使用 [VSCode](https://code.visualstudio.com/) 修改配置，我在 [`.vscode/settings.json`](.vscode/settings.json) 中排除了不常修改的文件，方便你专注于自己的配置

```sh
# 使用 VSCode 打开 Rime 配置目录
code ~/Library/Rime
```

<img width="1363" alt="image" src="https://user-images.githubusercontent.com/20062482/233145736-546bc01a-ca88-4aad-a53b-fddc93b63d92.png">

> 注：每次修改配置后都需要重新部署 Rime 输入法才能生效，修改配置后执行 `pnpm reload` 命令即可重新部署

## 同步

首次部署后修改 `installation.yaml`，新增 `sync_dir` 字段

```yaml
# 目录名称，可自定义
installation_id: 'macos-rime-ice'
# iCloud 同步路径，将 `:name` 替换成你的用户名即可
sync_dir: '/Users/:name/Library/Mobile Documents/com~apple~CloudDocs/RimeSync'
```

然后执行 `pnpm sync` 命令将本地配置和词库同步到 `iCloud` 中的 `RimeSync` 目录  
你也可以点击菜单栏【ㄓ】-【同步用户数据】

## 皮肤

如果要更换皮肤可以修改 [`squirrel.custom.yaml`](./squirrel.custom.yaml) 文件，里面有注释说明

感谢 [@ssnhd](https://github.com/ssnhd) 提供简洁的仿 macOS 原生皮肤

<img src="https://dvel.me/img/2022-04-24-000576.webp" width="512" />

## 更新 [rime-ice](https://github.com/iDvel/rime-ice) 配置

你可以使用 `pnpm run update` 命令更新 [rime-ice](https://github.com/iDvel/rime-ice) 远程最新配置，然后使用 `pnpm reload` 命令重新部署 Rime 输入法

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
