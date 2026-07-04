import { describe, it, expect } from 'bun:test'
import { createDB } from '../factory'

describe('createDB', () => {
  it('should create SQLite database', () => {
    const db = createDB({ driver: 'sqlite' })
    expect(db).toBeDefined()
    expect(db.select).toBeDefined()
    expect(db.insert).toBeDefined()
    expect(db.update).toBeDefined()
    expect(db.delete).toBeDefined()
    expect(db.transaction).toBeDefined()
  })

  it('should throw for PostgreSQL driver', () => {
    expect(() => createDB({ driver: 'postgres' })).toThrow('PostgreSQL driver not implemented')
  })

  it('should throw for MySQL driver', () => {
    expect(() => createDB({ driver: 'mysql' })).toThrow('MySQL driver not implemented')
  })

  it('should throw for unknown driver', () => {
    expect(() => createDB({ driver: 'unknown' as any })).toThrow('Unsupported driver')
  })
})
