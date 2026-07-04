import type { DrizzleDB } from '../interface'

export function createMySQLDB(url: string): DrizzleDB {
  throw new Error('MySQL driver not implemented. Install mysql2 package.')
}
