# dsh-img-block

DSH web 插件：把聊天里的图片统一渲染成块级元素（`display:block`），
让图片独占一行、把正文顶开，而不是和文字挤在同一行里互相遮挡。

## 它改了什么

只在页面里注入一段样式，不动任何 DSH 代码：

- `img:not([src*=".svg"])` → `display:block`、`max-width:100%`、`height:auto`
- 头像、按钮里的图标（`avatar` / `icon` / `button img`）→ 保持 `inline-block`
- 大肥鱼表情图 → 额外限高 260px，防止撑爆消息列

## 安装

从 GitHub 仓库直接装，不用打包、也不用下载 tgz。

### 方式一：让 agent 装（推荐）

在 DSH 里对 agent 说：

> 安装插件 github:Akashyc/dsh-img-block

agent 会调用 `plugin_manager` 的 `install_bundle`，target 填 `github:Akashyc/dsh-img-block`。
装完刷新页面。

### 方式二：装进 profile

在 `~/.dsh/profiles/<profile>/package.json` 里：

1. `dependencies` 加 `"dsh-img-block": "github:Akashyc/dsh-img-block"`
2. `dsh.profile.bundles` 数组里加 `"dsh-img-block"`

然后在 profile 目录跑 `pnpm install`，重启 DSH。启动日志里不应再出现 `patch: entry "img-block" not found`。

## 卸载

让 agent 调 `plugin_manager` 的 `remove_bundle`；手动装的，把 `dependencies` 和 `dsh.profile.bundles` 里那两行删掉，再 `pnpm install` 后重启。

## 调节

想改规则就编辑 `client.js` 里的 `CSS` 数组，重启生效：

- 觉得图片太大：改第 1 段的 `max-width`，或给贴纸段加 `max-height`
- 发现某个 UI 元素被误伤：把它加进第 2 段的排除列表
