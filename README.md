# dsh-img-block

DSH web 插件：把聊天里的图片统一渲染成块级元素（`display:block`），
让图片独占一行、把正文顶开，而不是和文字挤在同一行里互相遮挡。

## 它改了什么

只在页面里注入一段样式，不动任何 DSH 代码：

- `img:not([src*=".svg"])` → `display:block`、`max-width:100%`、`height:auto`
- 头像、按钮里的图标（`avatar` / `icon` / `button img`）→ 保持 `inline-block`
- 大肥鱼表情图 → 额外限高 260px，防止撑爆消息列

## 安装

### 方式一：插件管理器导入（推荐）

设置 → 插件 → 安装 → 选择本目录打出的 `dsh-img-block-0.1.0.tgz`，
确认后重启 DSH。

### 方式二：手动装进 profile

```bash
tar -xzf dsh-img-block-0.1.0.tgz
mv package ~/.dsh/profiles/desktop/node_modules/dsh-img-block
```

然后编辑 `~/.dsh/profiles/desktop/package.json`：

1. `dependencies` 加 `"dsh-img-block": "file:./node_modules/dsh-img-block"`
2. `dsh.profile.bundles` 数组里加 `"dsh-img-block"`

重启 DSH。启动日志里不应再出现 `patch: entry "img-block" not found`。

## 卸载

删掉上面的两处注册和目录，重启即可。或者在插件管理器里禁用。

## 调节

想改规则就编辑 `client.js` 里的 `CSS` 数组，重启生效：

- 觉得图片太大：改第 1 段的 `max-width`，或给贴纸段加 `max-height`
- 发现某个 UI 元素被误伤：把它加进第 2 段的排除列表
