export { ProjectRepository } from './repositories/project.repository'
export { NovelRepository } from './repositories/novel.repository'

import * as sqliteProjects from './schema/sqlite/projects'
import * as sqliteNovels from './schema/sqlite/novels'
import * as postgresProjects from './schema/postgres/projects'
import * as postgresNovels from './schema/postgres/novels'
import * as mysqlProjects from './schema/mysql/projects'
import * as mysqlNovels from './schema/mysql/novels'

export const schema = {
  sqlite: {
    projects: sqliteProjects.projects,
    novels: sqliteNovels.novels,
  },
  postgres: {
    projects: postgresProjects.projects,
    novels: postgresNovels.novels,
  },
  mysql: {
    projects: mysqlProjects.projects,
    novels: mysqlNovels.novels,
  },
}
