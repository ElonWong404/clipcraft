import { eq } from 'drizzle-orm'
import type { DrizzleDB } from '@clipcraft/db'
import type { Project, CreateProjectInput, UpdateProjectInput } from '@clipcraft/shared'
import { projects } from '../schema/sqlite/projects'

export class ProjectRepository {
  constructor(private db: DrizzleDB) {}

  async findAll(): Promise<Project[]> {
    const rows = await this.db.select().from(projects)
    return rows.map(this.mapToProject)
  }

  async findById(id: string): Promise<Project | null> {
    const rows = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1)
    return rows[0] ? this.mapToProject(rows[0]) : null
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const id = crypto.randomUUID()
    const now = new Date()

    await this.db.insert(projects).values({
      id,
      name: input.name,
      description: input.description ?? '',
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    })

    return {
      id,
      name: input.name,
      description: input.description ?? '',
      status: 'draft',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    const existing = await this.findById(id)
    if (!existing) {
      throw new Error(`Project not found: ${id}`)
    }

    const now = new Date()
    await this.db
      .update(projects)
      .set({
        name: input.name ?? existing.name,
        description: input.description ?? existing.description,
        status: input.status ?? existing.status,
        updatedAt: now,
      })
      .where(eq(projects.id, id))

    return {
      ...existing,
      name: input.name ?? existing.name,
      description: input.description ?? existing.description,
      status: input.status ?? existing.status,
      updatedAt: now.toISOString(),
    }
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projects).where(eq(projects.id, id))
  }

  private mapToProject(row: typeof projects.$inferSelect): Project {
    return {
      id: row.id,
      name: row.name,
      description: row.description ?? '',
      status: row.status as Project['status'],
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }
  }
}
