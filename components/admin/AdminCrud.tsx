'use client'

import { FormEvent, useMemo, useState } from 'react'

export type AdminField = {
  name: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'url' | 'email' | 'checkbox' | 'tags' | 'select'
  options?: string[]
  required?: boolean
}

type RecordItem = {
  id: string
  [key: string]: unknown
}

type AdminCrudProps = {
  title: string
  endpoint: string
  fields: AdminField[]
  initialItems: RecordItem[]
  columns: string[]
}

const emptyRecord: Record<string, unknown> = {}

export function AdminCrud({ title, endpoint, fields, initialItems, columns }: AdminCrudProps) {
  const [items, setItems] = useState(initialItems)
  const [editing, setEditing] = useState<RecordItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const current = editing ?? emptyRecord
  const formKey = editing?.id ?? 'new'

  const sortedItems = useMemo(() => items, [items])

  async function refresh() {
    const response = await fetch(endpoint)
    if (response.ok) {
      setItems(await response.json())
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    const payload: Record<string, unknown> = {}

    for (const field of fields) {
      if (field.type === 'checkbox') {
        payload[field.name] = formData.get(field.name) === 'on'
      } else if (field.type === 'number') {
        payload[field.name] = Number(formData.get(field.name) || 0)
      } else if (field.type === 'tags') {
        payload[field.name] = String(formData.get(field.name) ?? '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      } else {
        const value = String(formData.get(field.name) ?? '').trim()
        payload[field.name] = value || null
      }
    }

    const response = await fetch(editing ? `${endpoint}/${editing.id}` : endpoint, {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      setError(body.error ?? 'Unable to save record')
      return
    }

    event.currentTarget.reset()
    setEditing(null)
    await refresh()
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this record?')) return
    const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
    if (response.ok) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
      <form key={formKey} onSubmit={submit} className="glass-panel h-fit space-y-5 rounded-xl p-6">
        <h2 className="font-display text-2xl font-semibold text-white">
          {editing ? `Edit ${title}` : `New ${title}`}
        </h2>
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
              {field.label}
            </span>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required={field.required}
                defaultValue={String(current[field.name] ?? '')}
                rows={4}
                className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
              />
            ) : field.type === 'checkbox' ? (
              <input
                name={field.name}
                type="checkbox"
                defaultChecked={Boolean(current[field.name])}
                className="h-5 w-5 accent-primary-container"
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                defaultValue={String(current[field.name] ?? field.options?.[0] ?? '')}
                className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                required={field.required}
                type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
                defaultValue={
                  Array.isArray(current[field.name])
                    ? (current[field.name] as string[]).join(', ')
                    : String(current[field.name] ?? '')
                }
                className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
              />
            )}
          </label>
        ))}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <div className="flex gap-3">
          <button className="rounded bg-primary-container px-5 py-3 font-bold text-on-primary-fixed hover:brightness-110">
            {saving ? 'Saving...' : 'Save'}
          </button>
          {editing ? (
            <button type="button" onClick={() => setEditing(null)} className="rounded border border-white/15 px-5 py-3 font-bold text-white hover:bg-white/5">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="glass-panel overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-on-surface-variant">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="p-4">
                    {column}
                  </th>
                ))}
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  {columns.map((column) => (
                    <td key={column} className="max-w-xs truncate p-4 text-on-surface-variant">
                      {Array.isArray(item[column]) ? (item[column] as string[]).join(', ') : String(item[column] ?? '')}
                    </td>
                  ))}
                  <td className="flex gap-2 p-4">
                    <button onClick={() => setEditing(item)} className="rounded border border-white/15 px-3 py-2 text-white hover:bg-white/5">
                      Edit
                    </button>
                    <button onClick={() => remove(item.id)} className="rounded border border-red-400/30 px-3 py-2 text-red-300 hover:bg-red-400/10">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
