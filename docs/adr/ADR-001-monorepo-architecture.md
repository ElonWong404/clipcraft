# ADR-001: Monorepo 架构

## 状态

已接受

## 背景

ClipCraft 是 Toonflow-app 的重制版本，需要选择合适的项目组织方式。原 Toonflow 采用单体架构，代码耦合严重，难以维护和扩展。

## 决策

采用 **Turborepo + Bun** 的 Monorepo 架构。

## 理由

1. **代码复用**：前后端共享类型定义、工具函数
2. **独立部署**：Web 前端、API 服务可独立构建和部署
3. **依赖管理**：统一管理依赖版本，避免冲突
4. **开发体验**：Turborepo 提供增量构建、缓存，加速 CI/CD
5. **Bun 性能**：比 Node.js 快 3-5 倍，原生 TypeScript 支持

## 结构

```
clipcraft/
├── apps/
│   ├── web/          # React + Vite 前端
│   └── server/       # Elysia 后端
├── packages/
│   ├── shared/       # 共享类型、工具
│   ├── ai/           # AI SDK 封装
│   └── db/           # 数据库层
├── turbo.json
└── bun.lockb
```

## 后果

### 正面

- 清晰的代码组织
- 更好的可维护性
- 独立部署能力
- 优秀的开发体验

### 负面

- 初始搭建成本略高
- 需要学习 Turborepo 配置
- 包管理复杂度增加

## 相关决策

- ADR-002: 前后端分离
- ADR-003: 桌面客户端方案

