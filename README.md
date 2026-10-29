# dsh-img-block

DSH web 插件：把聊天里的图片渲染成块级元素，让图片独占一行、把正文顶开，不再和文字挤在同一行里互相遮挡。

## 安装

从 GitHub 仓库直接安装，不打包、不发 npm、不用下载 tgz。

| 方式 | 做法 |
| --- | --- |
| 让 Agent 装（推荐） | 对 agent 说：安装插件 `github:Akashyc/dsh-img-block` |
| 插件管理页 | 插件 → 添加插件 → 地址填 `github:Akashyc/dsh-img-block` → 安装 |
| 手动写 profile | 见下一节 |

`github:` 前缀由 pnpm 解析，公开仓库不用登录；装的是仓库默认分支的当前提交。
装完刷新页面，提示需要重启时再重启 DSH。

### 手动写 profile

编辑 `~/.dsh/profiles/<profile>/package.json`（默认 profile 是 `desktop`），加两处：

```json
{
  "dependencies": {
    "dsh-img-block": "github:Akashyc/dsh-img-block"
  },
  "dsh": {
    "profile": {
      "bundles": ["dsh-img-block"]
    }
  }
}
```

`bundles` 里已有内容就追加，不要整段替换。然后在 profile 目录执行：

```bash
pnpm install
```

重启 DSH，启动日志里不应再出现这个包的安装失败或 patch 找不到的报错。

> 更新：先卸载再按同一地址安装。`plugin_manager` 的 `install_bundle` 对已安装的包会直接拒绝，不会覆盖升级。

## 效果

| 目标 | 规则 |
| --- | --- |
| 图片按钮 | `button[class*="imageButton"]` 与「查看大图」按钮改成 `display: block`、限宽、贴左，去掉按钮底色与内边距 |
| 按钮里的图 | `display: block`、`position: static`、取消 `transform`，回到正常文档流 |
| 按钮外的附件图 | `img[data-dsh-claude-part="attachment-image"]` 同样按块级处理 |
| 大肥鱼表情 | 上述表情图额外限高 `260px`，防止撑爆消息列 |
| 头像与图标 | `avatar` / `icon` 里的图保持 `inline-block`，不跟着块级化 |

病根是包着图片的那个 inline-block 按钮，不是 `<img>` 本身——只改图片样式看不出变化。插件只往页面注入一段 `<style>`，不动 DSH 代码；选择器按用途的属性和类名片段写，不依赖一改就变的 CSS Module hash。

## 卸载

| 方式 | 做法 |
| --- | --- |
| 让 Agent 卸 | 对 agent 说：卸载插件 `dsh-img-block` |
| 插件管理页 | 插件 → 已安装 → 该插件 → 卸载 |
| 手动 | 删掉 `dependencies` 和 `dsh.profile.bundles` 里的那两行，`pnpm install`，重启 DSH |

移除后图片回到 DSH 自带排版。

## 配置

没有配置项，规则就是 `client.js` 里的 `CSS` 数组，五段各管一件事：

| 段 | 管什么 |
| --- | --- |
| 1 | 图片按钮块级化 |
| 2 | 按钮里的图回到正常流 |
| 3 | 按钮外附件图的兜底 |
| 4 | 表情图限高 |
| 5 | 头像与图标保持行内 |

- 图片太大：改第 1 段的 `max-width`，或调第 4 段的 `max-height`
- 有 UI 元素被误伤：把它加进第 5 段的选择器列表

改完重启 DSH 生效。

## 文件

```text
index.js             Host 半边，空实现
client.js            浏览器半边，注入样式
cordis.patch.yml     插入插件行
install.sh           脚本版手动安装，效果同「手动写 profile」
```

## 验证

刷新页面后，在 DevTools 的 Elements 里搜 `style[data-dsh-img-block]`，能看到注入的样式；再发一张图，看它是否独占一行、把下面的文字顶开。

## 许可

MIT，全文见 [LICENSE](LICENSE)。Copyright (c) 2026 Akashyc。