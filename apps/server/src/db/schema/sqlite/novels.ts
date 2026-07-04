import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const novels = sqliteTable('novels', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull(),
  title: text('title').notNull(),
  content: text('content').default(''),
  status: text('status', { enum: ['draft', 'processing', 'completed'] }).default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
