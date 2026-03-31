# 德裕新塑胶官网 / Deyuxin Plastics Website

## 文件结构

```
deyuxin-website/
├── index.html        首页
├── products.html     产品中心
├── about.html        关于我们 + 工厂展示
├── contact.html      联系我们
├── css/
│   └── style.css     全局样式（红蓝白主题）
├── js/
│   └── main.js       交互逻辑（语言切换、动画等）
└── images/           （待添加工厂和产品图片）
```

## 本地预览

直接双击 `index.html` 用浏览器打开即可预览。

## 添加图片

将图片放入 `images/` 目录，然后替换 HTML 中对应的 emoji 占位符：

```html
<!-- 将这种占位符 -->
<div class="placeholder-emoji">🏭</div>

<!-- 替换为 -->
<img src="images/factory-overview.jpg" alt="工厂全景">
```

## 部署到 GitHub Pages（免费全球访问）

1. 注册 GitHub 账号：https://github.com
2. 创建新仓库（Repository），命名如 `deyuxin-website`
3. 上传所有文件（拖拽到网页即可）
4. 进入仓库 Settings → Pages → Source 选择 `main` 分支
5. 保存后，网站即可通过 `https://你的用户名.github.io/deyuxin-website/` 访问

## 绑定自定义域名

购买域名后（推荐阿里云、腾讯云），在 DNS 设置中添加 CNAME 记录指向 GitHub Pages，
再在仓库根目录创建 `CNAME` 文件写入你的域名即可。

## 后续优化建议

- [ ] 添加真实工厂和产品照片（替换 emoji 占位符）
- [ ] 注册邮箱账号，将表单邮件发送功能对接 Formspree 或 EmailJS（免费服务）
- [ ] 添加 WhatsApp 悬浮按钮（海外客户常用）
- [ ] 申请百度统计 + Google Analytics（监控访客来源）
- [ ] 购买自定义域名（如 deyuxin.com 或 deyuxin-plastics.com）
