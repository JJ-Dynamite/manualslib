import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || 'printer'
  const res = await fetch(`http://localhost:3001/manuals?q=${q}`)
  const data = await res.json()
  return NextResponse.json(data)
}
