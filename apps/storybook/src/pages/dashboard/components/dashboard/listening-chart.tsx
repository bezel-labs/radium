import * as React from "react"
import { TrendingUp } from "lucide-react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@radium/ui/components/chart"
import { Tabs, TabsList, TabsTrigger } from "@radium/ui/components/tabs"

import { formatStreams, generateListeningSeries } from "../../lib/mock-data"

const RANGES = [
  { value: "1D", points: 24, seed: 11 },
  { value: "1W", points: 7 * 8, seed: 23 },
  { value: "1M", points: 30, seed: 31 },
  { value: "3M", points: 90, seed: 47 },
  { value: "1Y", points: 365, seed: 89 },
] as const

const chartConfig: ChartConfig = {
  music: { label: "Music streams", color: "var(--chart-1)" },
  podcast: { label: "Podcast streams", color: "var(--chart-2)" },
}

export function ListeningChart() {
  const [range, setRange] = React.useState<(typeof RANGES)[number]["value"]>("1M")
  const config = React.useMemo(() => RANGES.find((r) => r.value === range)!, [range])
  const data = React.useMemo(
    () => generateListeningSeries(config.points, config.seed),
    [config]
  )

  const last = data[data.length - 1]
  const first = data[0]
  const pct = ((last.music - first.music) / first.music) * 100

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardDescription className="text-xs font-medium">
            Listening Activity
          </CardDescription>
          <CardTitle className="flex items-baseline gap-3 font-mono text-2xl tabular-nums">
            {formatStreams(last.music)}
            <span
              className={
                pct >= 0
                  ? "inline-flex items-center gap-1 text-sm font-medium text-success"
                  : "inline-flex items-center gap-1 text-sm font-medium text-danger"
              }
            >
              <TrendingUp className="size-3.5" />
              {pct >= 0 ? "+" : ""}
              {pct.toFixed(2)}%
              <span className="text-xs text-muted-foreground">vs {range} start</span>
            </span>
          </CardTitle>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
          <TabsList>
            {RANGES.map((r) => (
              <TabsTrigger key={r.value} value={r.value}>
                {r.value}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <ComposedChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="fillMusic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-music)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-music)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: number) => {
                const d = new Date(value)
                return d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={64}
              tickFormatter={(value: number) => formatStreams(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value: unknown) => {
                    const d = new Date(value as number)
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label ??
                          String(name)}
                      </span>
                      <span className="font-mono font-medium tabular-nums">
                        {formatStreams(value as number)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="music"
              stroke="var(--color-music)"
              strokeWidth={2}
              fill="url(#fillMusic)"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="podcast"
              stroke="var(--color-podcast)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
