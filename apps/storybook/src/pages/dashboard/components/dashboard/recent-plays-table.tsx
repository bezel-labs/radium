import { Mic, Music2 } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@radium/ui/components/table"
import { cn } from "@radium/ui/lib/utils"

import { formatDuration, RECENT_PLAYS } from "../../lib/mock-data"

export function RecentPlaysTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardDescription className="text-xs font-medium">
            Live Feed
          </CardDescription>
          <CardTitle className="text-base">Recent Plays</CardTitle>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Streaming worldwide
        </span>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Artist / Host</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RECENT_PLAYS.map((p) => {
            const music = p.type === "Music"
            const Icon = music ? Music2 : Mic
            return (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                  {p.time}
                </TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                  {p.artist}
                </TableCell>
                <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                  {p.country}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
                      music
                        ? "bg-primary/10 text-primary"
                        : "bg-info/10 text-info"
                    )}
                  >
                    <Icon className="size-3" />
                    {p.type}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-xs tabular-nums">
                  {formatDuration(p.duration)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
