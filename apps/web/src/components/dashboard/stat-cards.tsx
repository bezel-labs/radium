import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Crown,
  Music2,
  Users,
} from "lucide-react"
import { Area, AreaChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@radium/ui/components/chart"
import { cn } from "@radium/ui/lib/utils"

import {
  formatDuration,
  formatStreams,
  generateSeries,
  useTickingValue,
} from "@/lib/mock-data"

const sparkConfig: ChartConfig = {
  v: { label: "Value", color: "var(--color-chart-1)" },
}
const sparkConfigNegative: ChartConfig = {
  v: { label: "Value", color: "var(--color-danger)" },
}

function Spark({
  data,
  negative = false,
}: {
  data: { t: number; v: number }[]
  negative?: boolean
}) {
  const config = negative ? sparkConfigNegative : sparkConfig
  const color = negative ? "var(--color-danger)" : "var(--color-chart-1)"
  const gradId = negative ? "spark-stat-n" : "spark-stat-p"
  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-12 w-full [&_.recharts-surface]:overflow-visible"
    >
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.75}
          fill={`url(#${gradId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

function Delta({ value }: { value: number }) {
  const positive = value >= 0
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
        positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
      )}
    >
      <Icon className="size-3" />
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  )
}

export function StatCards() {
  const listeners = useTickingValue(184_200_000, 0.0004)
  const streams = useTickingValue(421_800_000, 0.0012)
  const subscribers = useTickingValue(92_700_000, 0.0003)
  const listenSeconds = useTickingValue(47 * 60 + 21, 0.0008)

  const listenersSeries = generateSeries(40, 12, 178_000_000, 0.008)
  const streamsSeries = generateSeries(40, 31, 380_000_000, 0.02)
  const subscribersSeries = generateSeries(40, 47, 90_000_000, 0.005)
  const listenSeriesData = generateSeries(40, 9, 2_700, 0.015)

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
            <Users className="size-3.5" />
            Monthly Active Listeners
          </CardDescription>
          <Delta value={3.4} />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="font-mono text-2xl tabular-nums">
            {formatStreams(listeners)}
          </CardTitle>
          <Spark data={listenersSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
            <Music2 className="size-3.5" />
            Streams Today
          </CardDescription>
          <Delta value={5.2} />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="font-mono text-2xl tabular-nums text-success">
            {formatStreams(streams)}
          </CardTitle>
          <Spark data={streamsSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
            <Crown className="size-3.5" />
            Premium Subscribers
          </CardDescription>
          <Delta value={1.1} />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="font-mono text-2xl tabular-nums">
            {formatStreams(subscribers)}
          </CardTitle>
          <Spark data={subscribersSeries} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
            <Clock className="size-3.5" />
            Avg. Listen Time
          </CardDescription>
          <Delta value={0.4} />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="font-mono text-2xl tabular-nums">
            {formatDuration(listenSeconds)}
          </CardTitle>
          <Spark data={listenSeriesData} />
        </CardContent>
      </Card>
    </div>
  )
}
