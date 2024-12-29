# Web GiveYou - 网站收藏夹

一个现代化的网站收藏夹应用，帮助用户收藏、整理和分享喜欢的网站。使用 Next.js 14 和 TypeScript 构建，具有美观的 UI 和流畅的用户体验。

## 🌟 特性

- 📚 书签管理
  - 添加、删除和查看书签
  - 支持标题、描述、URL和标签
  - 书签数据本地持久化存储

- 🏷️ 分类系统
  - 预设多个常用分类
  - 支持动态添加新分类
  - 分类筛选功能

- 👥 用户权限
  - 管理员/普通用户角色区分
  - 基于角色的操作权限控制
  - 用户认证状态持久化

- 🎨 现代化界面
  - 响应式设计，支持移动端
  - 暗色模式支持
  - 平滑动画效果

## 🛠️ 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **状态管理**: React Context
- **存储**: localStorage

## 🚀 快速开始

1. 克隆项目
```bash
git clone https://github.com/suiyunzou/web-giveyou.git
cd web-giveyou
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 `http://localhost:3000`

## 👥 用户账号

### 管理员账号
- 用户名: admin
- 密码: admin123
- 权限: 可以添加、删除书签和管理分类

### 普通用户账号
- 用户名: user
- 密码: user123
- 权限: 只能查看书签

## 📁 项目结构

```
web-giveyou/
├── src/
│   ├── app/                 # Next.js 应用页面
│   ├── components/          # React 组件
│   │   ├── AddBookmarkButton.tsx
│   │   ├── AddBookmarkDialog.tsx
│   │   ├── BookmarkCard.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── LoginDialog.tsx
│   │   └── Navbar.tsx
│   ├── contexts/           # React Context
│   │   ├── AuthContext.tsx
│   │   └── BookmarkContext.tsx
│   └── styles/            # 全局样式
├── public/               # 静态资源
├── package.json
└── README.md
```

## 🎯 主要功能

### 书签管理
- 添加新书签：标题、描述、URL、分类和标签
- 删除书签：管理员可以删除任何书签
- 查看书签：所有用户都可以查看书签列表

### 分类系统
- 预设分类：开发、设计、效率、教育等
- 动态分类：添加书签时可以创建新分类
- 分类筛选：点击顶部导航栏的分类进行筛选

### 用户系统
- 用户认证：支持登录/退出功能
- 权限控制：基于用户角色的操作权限
- 状态持久化：登录状态在页面刷新后保持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License - 详见 [LICENSE](LICENSE) 文件
