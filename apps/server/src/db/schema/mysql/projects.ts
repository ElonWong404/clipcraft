import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const projects = mysqlTable('projects', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).default(''),
  status: varchar('status', { length: 20 }).default('draft'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})
