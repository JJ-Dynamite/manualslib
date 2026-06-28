'use client'
import { useState } from 'react'
export default function Home() {
  const [query, setQuery] = useState('')
  const [manuals, setManuals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const search = async () => {
    setLoading(true)
    const res = await fetch(`/api/manuals?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setManuals(data.manuals || [])
    setLoading(false)
  }
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">ManualsLib</h1>
        <p className="text-gray-400 mb-8">Find any product manual</p>
        <div className="flex gap-3 mb-8">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="Search by brand and model (e.g. HP LaserJet Pro)..."
            className="flex-1 bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500" />
          <button onClick={search} disabled={!query || loading}
            className="bg-gradient-to-r from-gray-600 to-gray-800 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {manuals.length > 0 && (
          <div className="space-y-4">
            {manuals.map(m => (
              <div key={m.id} className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 hover:bg-white/20 transition">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">📄</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-gray-400 text-sm">{m.brand} {m.model} - {m.pages} pages</p>
                </div>
                <button className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition">View PDF</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
