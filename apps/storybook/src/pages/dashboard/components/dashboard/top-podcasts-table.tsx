import { Headphones } from "lucide-react"

import { Badge } from "@radium/ui/components/badge"
import { Button } from "@radium/ui/components/button"
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

import { formatStreams, TOP_PODCASTS } from "../../lib/mock-data"

const STATUS_STYLES: Record<(typeof TOP_PODCASTS)[number]["status"], string> = {
  Live: "bg-danger/15 text-danger",
  "New episode": "bg-info/15 text-info",
  Trending: "bg-warning/15 text-warning",
}

export function TopPodcastsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardDescription className="text-xs font-medium">
            Spoken Audio
          </CardDescription>
          <CardTitle className="text-base">Top Podcasts</CardTitle>
        </div>
        <Badge variant="outline" className="tabular-nums">
          {TOP_PODCASTS.length} shows
        </Badge>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Show</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Episodes
            </TableHead>
            <TableHead className="text-right">Listens (24h)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {TOP_PODCASTS.map((p) => (
            <TableRow key={p.rank}>
              <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                {p.rank}
              </TableCell>
              <TableCell>
                <div className="leading-tight">
                  <div className="font-medium">{p.show}</div>
                  <div className="text-xs text-muted-foreground">{p.host}</div>
                </div>
              </TableCell>
              <TableCell className="hidden text-right font-mono text-xs tabular-nums text-muted-foreground md:table-cell">
                {p.episodes}
              </TableCell>
              <TableCell className="text-right font-mono text-xs tabular-nums">
                {formatStreams(p.listens)}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                    STATUS_STYLES[p.status]
                  )}
                >
                  {p.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-foreground"
                >
                  <Headphones className="size-3.5" />
                  <span className="sr-only">Open show</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
