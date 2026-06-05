import { SidebarInset, SidebarProvider } from "@radium/ui/components/sidebar"
import { TooltipProvider } from "@radium/ui/components/tooltip"

import { AppSidebar } from "./components/dashboard/app-sidebar.tsx"
import { DashboardHeader } from "./components/dashboard/dashboard-header.tsx"
import { DeviceChart } from "./components/dashboard/device-chart.tsx"
import { ListeningChart } from "./components/dashboard/listening-chart.tsx"
import { RecentPlaysTable } from "./components/dashboard/recent-plays-table.tsx"
import { StatCards } from "./components/dashboard/stat-cards.tsx"
import { TopPodcastsTable } from "./components/dashboard/top-podcasts-table.tsx"
import { TopTracksTable } from "./components/dashboard/top-tracks-table.tsx"

export function DashboardPage({ withSidebar = true }: { withSidebar?: boolean }) {
  return (
    <TooltipProvider delay={150}>
      <SidebarProvider>
        {withSidebar ? <AppSidebar /> : null}
        <SidebarInset>
          <DashboardHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <StatCards />
            <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
              <ListeningChart />
              <DeviceChart />
            </div>
            <div className="grid gap-4 md:gap-6 xl:grid-cols-2">
              <TopTracksTable />
              <TopPodcastsTable />
            </div>
            <RecentPlaysTable />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
