import { mysqlTable, varchar, timestamp, text } from 'drizzle-orm/mysql-core'

export const novels = mysqlTable('novels', {
  id: varchar('id', { length: 36 }).primaryKey(),
  projectId: varchar('project_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  status: varchar('status', { length: 20 }).default('draft'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})
