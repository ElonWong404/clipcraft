import type { SQL } from 'drizzle-orm'

export type DatabaseDriver = 'sqlite' | 'postgres' | 'mysql'

export interface DatabaseConfig {
  driver: DatabaseDriver
  url?: string
  database?: string
}

export interface QueryResult<T = unknown> {
  rows: T[]
  changes: number
}

export interface DrizzleDB {
  select(): any
  insert(table: any): any
  update(table: any): any
  delete(table: any): any
  transaction<T>(fn: (tx: DrizzleDB) => Promise<T>): Promise<T>
  execute(sql: SQL): Promise<any>
}
