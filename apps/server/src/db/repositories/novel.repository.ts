import { eq } from 'drizzle-orm'
import type { DrizzleDB } from '@clipcraft/db'
import type { Novel, CreateNovelInput, UpdateNovelInput } from '@clipcraft/shared'
import { novels } from '../schema/sqlite/novels'

export class NovelRepository {
  constructor(private db: DrizzleDB) {}

  async findAll(): Promise<Novel[]> {
    const rows = await this.db.select().from(novels)
    return rows.map(this.mapToNovel)
  }

  async findById(id: string): Promise<Novel | null> {
    const rows = await this.db
      .select()
      .from(novels)
      .where(eq(novels.id, id))
      .limit(1)
    return rows[0] ? this.mapToNovel(rows[0]) : null
  }

  async findByProjectId(projectId: string): Promise<Novel[]> {
    const rows = await this.db
      .select()
      .from(novels)
      .where(eq(novels.projectId, projectId))
    return rows.map(this.mapToNovel)
  }

  async create(input: CreateNovelInput): Promise<Novel> {
    const id = crypto.randomUUID()
    const now = new Date()

    await this.db.insert(novels).values({
      id,
      projectId: input.projectId,
      title: input.title,
      content: input.content ?? '',
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    })

    return {
      id,
      projectId: input.projectId,
      title: input.title,
      content: input.content ?? '',
      status: 'draft',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }
  }

  async update(id: string, input: UpdateNovelInput): Promise<Novel> {
    const existing = await this.findById(id)
    if (!existing) {
      throw new Error(`Novel not found: ${id}`)
    }

    const now = new Date()
    await this.db
      .update(novels)
      .set({
        title: input.title ?? existing.title,
        content: input.content ?? existing.content,
        status: input.status ?? existing.status,
        updatedAt: now,
      })
      .where(eq(novels.id, id))

    return {
      ...existing,
      title: input.title ?? existing.title,
      content: input.content ?? existing.content,
      status: input.status ?? existing.status,
      updatedAt: now.toISOString(),
    }
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(novels).where(eq(novels.id, id))
  }

  private mapToNovel(row: typeof novels.$inferSelect): Novel {
    return {
      id: row.id,
      projectId: row.projectId,
      title: row.title,
      content: row.content ?? '',
      status: row.status as Novel['status'],
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }
  }
}
