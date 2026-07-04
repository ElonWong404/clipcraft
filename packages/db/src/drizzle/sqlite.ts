import { Database } from 'bun:sqlite'
import { drizzle, type BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite'
import type { DrizzleDB } from '../interface'

export function createSQLiteDB(path: string = ':memory:'): DrizzleDB {
  const sqlite = new Database(path)
  sqlite.exec('PRAGMA journal_mode = WAL')
  sqlite.exec('PRAGMA foreign_keys = ON')
  
  const db = drizzle(sqlite)
  return wrapDrizzle(db)
}

function wrapDrizzle(db: BunSQLiteDatabase): DrizzleDB {
  return {
    select: () => db.select(),
    insert: (table: any) => db.insert(table),
    update: (table: any) => db.update(table),
    delete: (table: any) => db.delete(table),
    transaction: async <T>(fn: (tx: DrizzleDB) => Promise<T>) => {
      return db.transaction(async (tx) => {
        const wrappedTx = wrapDrizzle(tx as any)
        return fn(wrappedTx)
      })
    },
    execute: (sql: any) => db.execute(sql),
  }
}
