import type { DrizzleDB } from '../interface'

export function createPostgresDB(url: string): DrizzleDB {
  throw new Error('PostgreSQL driver not implemented. Install postgres package.')
}
