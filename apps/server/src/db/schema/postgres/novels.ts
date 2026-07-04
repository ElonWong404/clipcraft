import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const novels = pgTable('novels', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull(),
  title: text('title').notNull(),
  content: text('content').default(''),
  status: text('status', { enum: ['draft', 'processing', 'completed'] }).default('draft'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})
