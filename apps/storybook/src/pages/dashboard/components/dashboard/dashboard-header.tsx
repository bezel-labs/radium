import { Bell, Search } from "lucide-react"

import { Badge } from "@radium/ui/components/badge"
import { Button } from "@radium/ui/components/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@radium/ui/components/breadcrumb"
import { Input } from "@radium/ui/components/input"
import { Kbd } from "@radium/ui/components/kbd"
import { Separator } from "@radium/ui/components/separator"
import { SidebarTrigger } from "@radium/ui/components/sidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 h-5" />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative ml-auto hidden w-72 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tracks, artists, shows…"
          className="h-9 pl-8 pr-12"
        />
        <Kbd className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px]">
          /
        </Kbd>
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <Badge
            variant="destructive"
            className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full px-1 text-[10px] tabular-nums"
          >
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
