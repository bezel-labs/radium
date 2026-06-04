import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@radium/ui/components/chart"

import { DEVICES, formatStreams } from "../../lib/mock-data"

const chartConfig = DEVICES.reduce<ChartConfig>((acc, item, i) => {
  acc[item.name] = {
    label: item.name,
    color: `var(--chart-${i + 1})`,
  }
  return acc
}, {})

export function DeviceChart() {
  const total = React.useMemo(
    () => DEVICES.reduce((sum, d) => sum + d.value, 0),
    []
  )

  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-xs font-medium">
          Listening by Device
        </CardDescription>
        <CardTitle className="font-mono text-xl tabular-nums">
          {formatStreams(total)}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            sessions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-44 w-44 shrink-0"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {chartConfig[name as string]?.label ?? String(name)}
                        </span>
                        <span className="font-mono font-medium tabular-nums">
                          {formatStreams(value as number)}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={DEVICES}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={78}
                strokeWidth={2}
                isAnimationActive={false}
              >
                {DEVICES.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <ul className="flex-1 space-y-2 text-sm">
            {DEVICES.map((d) => {
              const pct = (d.value / total) * 100
              return (
                <li key={d.name} className="flex items-center gap-3">
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{ background: d.fill }}
                  />
                  <span className="font-medium">{d.name}</span>
                  <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
                    {pct.toFixed(1)}%
                  </span>
                  <span className="w-16 text-right font-mono text-xs tabular-nums">
                    {formatStreams(d.value)}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
