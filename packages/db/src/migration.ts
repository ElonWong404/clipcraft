import type { DrizzleDB } from './interface'

export interface Migration {
  name: string
  up: (db: DrizzleDB) => Promise<void>
  down?: (db: DrizzleDB) => Promise<void>
}

export class MigrationRunner {
  constructor(private db: DrizzleDB) {}

  async initialize(): Promise<void> {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        executed_at TEXT DEFAULT (datetime('now'))
      )
    ` as any)
  }

  async getExecuted(): Promise<string[]> {
    const result = await this.db.select().from('migrations' as any)
    return (result as any[]).map((row: any) => row.name)
  }

  async getPending(migrations: Migration[]): Promise<Migration[]> {
    const executed = await this.getExecuted()
    return migrations.filter(m => !executed.includes(m.name))
  }

  async up(migrations: Migration[]): Promise<void> {
    await this.initialize()
    const pending = await this.getPending(migrations)

    for (const migration of pending) {
      await this.db.transaction(async (tx) => {
        await migration.up(tx)
      })
    }
  }
}

export function createMigrationRunner(db: DrizzleDB): MigrationRunner {
  return new MigrationRunner(db)
}
