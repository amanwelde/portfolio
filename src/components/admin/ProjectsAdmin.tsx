"use client"

import { useState } from 'react'

interface ProjectItem {
  id: string
  title: string
  slug?: string
  description?: string
  category?: string
  tags?: string[]
  thumbnailUrl?: string
  videoUrl?: string | null
  duration?: number | null
  featured?: boolean
  order?: number
}

export function Projects({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || [])
  const [creating, setCreating] = useState(false)

  async function create(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const fd = new FormData(form)
    const payload = {
      title: fd.get('title')?.toString() ?? '',
      slug: fd.get('slug')?.toString() ?? '',
      description: fd.get('description')?.toString() ?? '',
      category: fd.get('category')?.toString() ?? '',
      thumbnailUrl: fd.get('thumbnailUrl')?.toString() ?? '',
      videoUrl: fd.get('videoUrl')?.toString() ?? null,
      tags: fd.get('tags')?.toString().split(',').map((t) => t.trim()).filter(Boolean),
      duration: fd.get('duration') ? Number(fd.get('duration')) : undefined,
      featured: fd.get('featured') === 'on',
      order: fd.get('order') ? Number(fd.get('order')) : 0,
    }

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const created = await res.json()
      setProjects((p) => [created, ...p])
      form.reset()
      setCreating(false)
    } else {
      const body = await res.json().catch(() => ({}))
      alert(body.error || 'Unable to create project')
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) setProjects((p) => p.filter((x) => x.id !== id))
    else alert('Delete failed')
  }

  async function update(id: string, updates: Partial<ProjectItem>) {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (res.ok) {
      const upd = await res.json()
      setProjects((p) => p.map((x) => (x.id === id ? upd : x)))
    } else {
      alert('Update failed')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <button
          className="rounded bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-fixed"
          onClick={() => setCreating((c) => !c)}
        >
          {creating ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {creating && (
        <form onSubmit={create} className="mb-8 space-y-3 rounded border p-4">
          <div className="grid grid-cols-2 gap-3">
            <input name="title" placeholder="Title" required className="p-2" />
            <input name="slug" placeholder="slug-url" required className="p-2" />
            <input name="category" placeholder="Category" className="p-2" />
            <input name="thumbnailUrl" placeholder="Thumbnail URL" className="p-2" />
            <input name="videoUrl" placeholder="Video URL" className="p-2" />
            <input name="duration" placeholder="Duration (seconds)" type="number" className="p-2" />
            <input name="tags" placeholder="tags,comma,separated" className="p-2 col-span-2" />
            <input name="order" placeholder="order" type="number" className="p-2" />
            <label className="flex items-center gap-2"><input name="featured" type="checkbox" /> Featured</label>
          </div>
          <textarea name="description" placeholder="Description" className="w-full p-2" />
          <div>
            <button type="submit" className="rounded bg-primary px-3 py-2 text-white">Create</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {projects.map((proj) => (
          <div key={proj.id} className="flex items-center justify-between rounded border p-3">
            <div>
              <div className="font-bold">{proj.title}</div>
              <div className="text-sm text-on-surface-variant">{proj.category} • {proj.slug}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newTitle = prompt('Title', proj.title) || proj.title
                  update(proj.id, { title: newTitle })
                }}
                className="px-3 py-1 text-sm"
              >
                Edit
              </button>
              <button onClick={() => remove(proj.id)} className="px-3 py-1 text-sm text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
