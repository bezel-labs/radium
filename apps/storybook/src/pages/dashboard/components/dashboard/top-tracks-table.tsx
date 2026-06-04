import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Area, AreaChart } from "recharts"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@radium/ui/components/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@radium/ui/components/table"
import { cn } from "@radium/ui/lib/utils"

import {
  formatStreams,
  generateSeries,
  TOP_TRACKS,
  useTickingTracks,
} from "../../lib/mock-data"

const sparkConfig: ChartConfig = {
  v: { label: "Streams", color: "var(--color-chart-1)" },
}
const sparkConfigDown: ChartConfig = {
  v: { label: "Streams", color: "var(--color-warning)" },
}

function MiniSpark({ seed, positive }: { seed: number; positive: boolean }) {
  const data = React.useMemo(
    () => generateSeries(24, seed, 100, 0.03),
    [seed]
  )
  const color = positive ? "var(--color-chart-1)" : "var(--color-warning)"
  return (
    <ChartContainer
      config={positive ? sparkConfig : sparkConfigDown}
      className="aspect-auto h-9 w-24"
    >
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={color}
          fillOpacity={0.15}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

const TILE_COLORS = [
  "bg-primary/15 text-primary",
  "bg-info/15 text-info",
  "bg-success/15 text-success",
  "bg-warning/15 text-warning",
  "bg-tertiary/15 text-tertiary",
  "bg-secondary text-secondary-foreground",
  "bg-primary/15 text-primary",
  "bg-info/15 text-info",
]

export function TopTracksTable() {
  const tracks = useTickingTracks(TOP_TRACKS)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardDescription className="text-xs font-medium">
            Charts
          </CardDescription>
          <CardTitle className="text-base">Top Tracks</CardTitle>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          Updated live
        </span>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Track</TableHead>
            <TableHead className="text-right">Streams (24h)</TableHead>
            <TableHead className="text-right">Δ 24h</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Total Listens
            </TableHead>
            <TableHead className="hidden text-right lg:table-cell">
              Trend
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((t, i) => {
            const positive = t.change24h >= 0
            const tileColor = TILE_COLORS[i % TILE_COLORS.length]
            return (
              <TableRow key={t.rank}>
                <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                  {t.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-md text-sm font-semibold",
                        tileColor
                      )}
                    >
                      {t.title.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.artist}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {formatStreams(t.streams24h)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-xs font-medium tabular-nums",
                      positive
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    )}
                  >
                    {positive ? (
                      <ArrowUpRight className="size-3" />
                    ) : (
                      <ArrowDownRight className="size-3" />
                    )}
                    {positive ? "+" : ""}
                    {t.change24h.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="hidden text-right font-mono text-xs tabular-nums text-muted-foreground md:table-cell">
                  {formatStreams(t.totalListens)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex justify-end">
                    <MiniSpark seed={t.rank * 17 + 3} positive={positive} />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
