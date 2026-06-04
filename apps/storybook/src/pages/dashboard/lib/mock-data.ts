import * as React from "react"

export type Track = {
  rank: number
  title: string
  artist: string
  streams24h: number
  change24h: number
  totalListens: number
}

export type SeriesPoint = { t: number; v: number }

export const TOP_TRACKS: Track[] = [
  { rank: 1, title: "Neon Tides", artist: "Mira Solene", streams24h: 4_812_340, change24h: 8.4, totalListens: 218_400_000 },
  { rank: 2, title: "Paper Lanterns", artist: "Hollow Coast", streams24h: 3_927_110, change24h: 4.1, totalListens: 184_900_000 },
  { rank: 3, title: "Slow Hour", artist: "Junie & The Verge", streams24h: 3_614_872, change24h: -1.7, totalListens: 142_300_000 },
  { rank: 4, title: "Glasshouse", artist: "Aerogram", streams24h: 3_201_488, change24h: 12.3, totalListens: 98_600_000 },
  { rank: 5, title: "Mercury Drive", artist: "Karim Vale", streams24h: 2_894_205, change24h: 2.9, totalListens: 76_700_000 },
  { rank: 6, title: "Halfway Light", artist: "The Apricots", streams24h: 2_417_980, change24h: -3.2, totalListens: 64_200_000 },
  { rank: 7, title: "Cassette Heart", artist: "Sora Linde", streams24h: 2_104_550, change24h: 1.1, totalListens: 51_800_000 },
  { rank: 8, title: "Bright Static", artist: "Cinder Park", streams24h: 1_882_400, change24h: 6.5, totalListens: 44_700_000 },
]

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function generateSeries(
  points: number,
  seed: number,
  start: number,
  volatility = 0.02
): SeriesPoint[] {
  const rand = mulberry32(seed)
  const out: SeriesPoint[] = []
  let v = start
  const now = Date.now()
  const spacingMs = (24 * 60 * 60 * 1000) / Math.max(points / 30, 1)
  for (let i = 0; i < points; i++) {
    const drift = (rand() - 0.48) * volatility
    v = Math.max(v * (1 + drift), 0.0001)
    out.push({ t: now - (points - i) * spacingMs, v: Math.round(v) })
  }
  return out
}

export function generateListeningSeries(
  points: number,
  seed: number
): Array<{ t: number; music: number; podcast: number }> {
  const rand = mulberry32(seed)
  const out: Array<{ t: number; music: number; podcast: number }> = []
  let music = 380_000_000
  let podcast = 92_000_000
  const now = Date.now()
  const spacingMs = 24 * 60 * 60 * 1000
  for (let i = 0; i < points; i++) {
    music = Math.max(music * (1 + (rand() - 0.46) * 0.02), 1)
    podcast = Math.max(podcast * (1 + (rand() - 0.45) * 0.025), 1)
    out.push({
      t: now - (points - i) * spacingMs,
      music: Math.round(music),
      podcast: Math.round(podcast),
    })
  }
  return out
}

export const DEVICES = [
  { name: "Mobile", value: 218_400_000, fill: "var(--chart-1)" },
  { name: "Smart Speaker", value: 84_200_000, fill: "var(--chart-2)" },
  { name: "Desktop", value: 62_800_000, fill: "var(--chart-3)" },
  { name: "Web Player", value: 38_900_000, fill: "var(--chart-4)" },
  { name: "Car / Auto", value: 17_300_000, fill: "var(--chart-5)" },
]

export type Podcast = {
  rank: number
  show: string
  host: string
  episodes: number
  listens: number
  status: "Live" | "New episode" | "Trending"
}

export const TOP_PODCASTS: Podcast[] = [
  { rank: 1, show: "The Long Tomorrow", host: "Renee Okafor", episodes: 142, listens: 4_120_000, status: "New episode" },
  { rank: 2, show: "Field Notes", host: "Dax Mendez", episodes: 87, listens: 3_244_000, status: "Trending" },
  { rank: 3, show: "Half Past Wonder", host: "Iris & Theo", episodes: 218, listens: 2_911_000, status: "Live" },
  { rank: 4, show: "Open Loops", host: "Hana Vega", episodes: 64, listens: 2_087_400, status: "New episode" },
  { rank: 5, show: "Signal Drift", host: "Otis Park", episodes: 31, listens: 1_482_900, status: "Trending" },
]

export type Play = {
  id: string
  time: string
  title: string
  artist: string
  country: string
  type: "Music" | "Podcast"
  duration: number
}

export const RECENT_PLAYS: Play[] = [
  { id: "p1", time: "14:42:18", title: "Neon Tides", artist: "Mira Solene", country: "US", type: "Music", duration: 214 },
  { id: "p2", time: "14:42:09", title: "Field Notes — Ep. 87", artist: "Dax Mendez", country: "DE", type: "Podcast", duration: 2_847 },
  { id: "p3", time: "14:42:01", title: "Paper Lanterns", artist: "Hollow Coast", country: "BR", type: "Music", duration: 198 },
  { id: "p4", time: "14:41:55", title: "Slow Hour", artist: "Junie & The Verge", country: "GB", type: "Music", duration: 247 },
  { id: "p5", time: "14:41:48", title: "The Long Tomorrow — Ep. 142", artist: "Renee Okafor", country: "JP", type: "Podcast", duration: 3_124 },
  { id: "p6", time: "14:41:41", title: "Glasshouse", artist: "Aerogram", country: "MX", type: "Music", duration: 223 },
  { id: "p7", time: "14:41:33", title: "Mercury Drive", artist: "Karim Vale", country: "FR", type: "Music", duration: 261 },
  { id: "p8", time: "14:41:27", title: "Signal Drift — Ep. 31", artist: "Otis Park", country: "CA", type: "Podcast", duration: 1_984 },
  { id: "p9", time: "14:41:20", title: "Halfway Light", artist: "The Apricots", country: "AU", type: "Music", duration: 205 },
  { id: "p10", time: "14:41:12", title: "Cassette Heart", artist: "Sora Linde", country: "ES", type: "Music", duration: 187 },
  { id: "p11", time: "14:41:04", title: "Open Loops — Ep. 64", artist: "Hana Vega", country: "NL", type: "Podcast", duration: 2_412 },
  { id: "p12", time: "14:40:58", title: "Bright Static", artist: "Cinder Park", country: "SE", type: "Music", duration: 232 },
]

export function useTickingTracks(initial: Track[], intervalMs = 1500): Track[] {
  const [tracks, setTracks] = React.useState(initial)

  React.useEffect(() => {
    const rand = mulberry32(0xa11ce)
    const id = window.setInterval(() => {
      setTracks((prev) =>
        prev.map((t) => {
          const delta = (rand() - 0.45) * 0.004
          const nextStreams = Math.max(Math.round(t.streams24h * (1 + delta)), 1)
          const nextChange = Math.max(
            Math.min(t.change24h + (rand() - 0.5) * 0.18, 60),
            -30
          )
          return {
            ...t,
            streams24h: nextStreams,
            change24h: Number(nextChange.toFixed(2)),
          }
        })
      )
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return tracks
}

export function useTickingValue(
  initial: number,
  jitter = 0.0008,
  intervalMs = 1500
): number {
  const [value, setValue] = React.useState(initial)
  React.useEffect(() => {
    const rand = mulberry32(Math.max(Math.round(initial) >>> 0, 1))
    const id = window.setInterval(() => {
      setValue((prev) => prev * (1 + (rand() - 0.48) * jitter))
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [initial, jitter, intervalMs])
  return value
}

export function formatStreams(n: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatInt(n: number): string {
  return Math.round(n).toLocaleString("en-US")
}

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h ${m}m ${sec}s`
  return `${m}m ${sec}s`
}
