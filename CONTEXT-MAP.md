# Context Map

This file routes skills to area-specific domain contexts.

## 项目结构

```mermaid
graph TB
    subgraph Apps
        Web[Web 前端<br/>React + Vite]
        Server[API 服务<br/>Elysia]
    end

    subgraph Packages
        Shared[shared<br/>共享类型/工具]
        AI[ai<br/>AI SDK 封装]
        DB[db<br/>数据库层]
    end

    subgraph Features
        Novel[novel<br/>小说功能]
        Script[script<br/>剧本功能]
        Production[production<br/>制作功能]
        Style[style<br/>风格功能]
        Project[project<br/>项目功能]
    end

    Web --> Novel
    Web --> Script
    Web --> Production
    Web --> Style
    Web --> Project

    Server --> AI
    Server --> DB

    Novel --> Shared
    Script --> Shared
    Production --> Shared
    Style --> Shared
    Project --> Shared
```

## Areas

- [Web Frontend](./apps/web/CONTEXT.md)
- [API Server](./apps/server/CONTEXT.md)

## Documentation

- [ADR](./docs/adr/) - Architecture Decision Records
- [Glossary](./docs/glossary/glossary.md) - 术语表
- [Roadmap](./docs/ROADMAP.md) - 开发路线图

## Features

- [Novel](./apps/web/src/features/novel/) - 小说功能
- [Script](./apps/web/src/features/script/) - 剧本功能
- [Production](./apps/web/src/features/production/) - 制作功能
- [Style](./apps/web/src/features/style/) - 风格功能
- [Project](./apps/web/src/features/project/) - 项目功能
