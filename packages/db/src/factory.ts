import type { DatabaseConfig, DrizzleDB } from './interface'
import { createSQLiteDB } from './drizzle/sqlite'
import { createPostgresDB } from './drizzle/postgres'
import { createMySQLDB } from './drizzle/mysql'

export function createDB(config: DatabaseConfig): DrizzleDB {
  switch (config.driver) {
    case 'sqlite':
      return createSQLiteDB(config.database ?? ':memory:')
    case 'postgres':
      return createPostgresDB(config.url ?? 'postgresql://localhost:5432')
    case 'mysql':
      return createMySQLDB(config.url ?? 'mysql://localhost:3306')
    default:
      throw new Error(`Unsupported driver: ${config.driver}`)
  }
}
