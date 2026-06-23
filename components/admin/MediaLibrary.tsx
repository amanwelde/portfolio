'use client'

import { FormEvent, useRef, useState } from 'react'

type MediaAsset = {
  id: string
  type: string
  url: string
  publicId: string
  thumbnailUrl?: string | null
  previewUrl?: string | null
  format?: string | null
  size: number
}

export function MediaLibrary({ initialAssets }: { initialAssets: MediaAsset[] }) {
  const [assets, setAssets] = useState(initialAssets)
  const [query, setQuery] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function search(nextQuery = query) {
    const response = await fetch(`/api/media?q=${encodeURIComponent(nextQuery)}`)
    if (response.ok) {
      setAssets(await response.json())
    }
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const file = fileRef.current?.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (uploadEvent) => {
        if (uploadEvent.lengthComputable) {
          setProgress(Math.round((uploadEvent.loaded / uploadEvent.total) * 100))
        }
      }
      xhr.onload = async () => {
        setProgress(0)
        if (xhr.status >= 200 && xhr.status < 300) {
          await search('')
          setQuery('')
          event.currentTarget.reset()
        } else {
          const body = JSON.parse(xhr.responseText || '{}')
          setError(body.error ?? 'Upload failed')
        }
        resolve()
      }
      xhr.onerror = () => {
        setProgress(0)
        setError('Upload failed')
        resolve()
      }
      xhr.open('POST', '/api/media')
      xhr.send(formData)
    })
  }

  async function remove(asset: MediaAsset) {
    if (!window.confirm('Delete this media asset?')) return
    const response = await fetch(`/api/media/${asset.id}`, { method: 'DELETE' })
    if (response.ok) {
      setAssets((current) => current.filter((item) => item.id !== asset.id))
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={upload} className="glass-panel grid gap-4 rounded-xl p-6 md:grid-cols-[1fr_auto] md:items-end">
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Upload Image or Video</span>
          <input ref={fileRef} type="file" accept="image/*,video/*" className="w-full rounded border border-white/10 bg-black/30 p-3 text-white" />
        </label>
        <button className="rounded bg-primary-container px-5 py-3 font-bold text-on-primary-fixed hover:brightness-110">
          Upload
        </button>
        {progress > 0 ? <div className="h-2 overflow-hidden rounded-full bg-white/10 md:col-span-2"><div className="h-full bg-primary-container" style={{ width: `${progress}%` }} /></div> : null}
        {error ? <p className="text-sm text-red-400 md:col-span-2">{error}</p> : null}
      </form>

      <div className="flex gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search media"
          className="w-full rounded border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-primary"
        />
        <button onClick={() => search()} className="rounded border border-white/15 px-5 py-3 font-bold text-white hover:bg-white/5">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <article key={asset.id} className="glass-panel overflow-hidden rounded-xl">
            <div className="aspect-video bg-black">
              {asset.type === 'video' ? (
                <video src={asset.previewUrl ?? asset.url} poster={asset.thumbnailUrl ?? undefined} controls className="h-full w-full object-cover" />
              ) : (
                <img src={asset.thumbnailUrl ?? asset.url} alt={asset.publicId} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="space-y-3 p-4">
              <div className="truncate font-mono text-xs text-on-surface-variant">{asset.publicId}</div>
              <div className="flex items-center justify-between text-sm text-on-surface-variant">
                <span>{asset.type}{asset.format ? `/${asset.format}` : ''}</span>
                <span>{Math.round(asset.size / 1024)} KB</span>
              </div>
              <div className="flex gap-2">
                <a href={asset.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-3 py-2 text-sm text-white hover:bg-white/5">
                  Preview
                </a>
                <button onClick={() => remove(asset)} className="rounded border border-red-400/30 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
