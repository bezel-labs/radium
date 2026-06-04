import { useState } from "react"
import { Area, AreaChart } from "recharts"
import { toast } from "sonner"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  DatabaseZap,
  FileText,
  Globe2,
  Image,
  LayoutTemplate,
  Lightbulb,
  Menu,
  Music2,
  Paintbrush,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radium/ui/components/accordion"
import { Alert, AlertDescription } from "@radium/ui/components/alert"
import { AspectRatio } from "@radium/ui/components/aspect-ratio"
import { Avatar, AvatarFallback } from "@radium/ui/components/avatar"
import { Badge } from "@radium/ui/components/badge"
import { Button } from "@radium/ui/components/button"
import { ButtonGroup } from "@radium/ui/components/button-group"
import {
  ChartContainer,
  type ChartConfig,
} from "@radium/ui/components/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import { Checkbox } from "@radium/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@radium/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radium/ui/components/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@radium/ui/components/field"
import { Input } from "@radium/ui/components/input"
import { Label } from "@radium/ui/components/label"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radium/ui/components/navigation-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radium/ui/components/select"
import { Separator } from "@radium/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@radium/ui/components/sheet"
import { Toaster } from "@radium/ui/components/sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@radium/ui/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radium/ui/components/tabs"
import { Textarea } from "@radium/ui/components/textarea"
import { ThemeSwitcher } from "@radium/ui/components/theme-switcher"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radium/ui/components/tooltip"

import { cn } from "@radium/ui/lib/utils"

import { DashboardPage } from "../dashboard/DashboardPage"

const trustedCompanies = [
  "Northwind",
  "Lumen Health",
  "Cadence Audio",
  "Helios Bank",
  "Atlas Foods",
  "Orbital",
]

const stats = [
  {
    value: "1,284",
    label: "Dashboards shipped",
    tooltip: "Production dashboards live across all Atlas customers.",
  },
  {
    value: "92%",
    label: "On brand, first review",
    tooltip: "Passes brand checks before any human design pass.",
  },
  {
    value: "18 min",
    label: "Avg. time to first app",
    tooltip: "From prompt to first reviewable draft.",
  },
  {
    value: "SOC 2",
    label: "Type II certified",
    tooltip: "Independently audited annually.",
  },
]

const featuresByRole: Record<
  string,
  Array<{
    icon: typeof Bot
    title: string
    description: string
  }>
> = {
  operators: [
    {
      icon: Bot,
      title: "Describe it. Atlas drafts it.",
      description: "Plain-language prompts produce a working dashboard.",
    },
    {
      icon: Paintbrush,
      title: "Stays on your brand.",
      description: "Tokens and components carry across every draft.",
    },
    {
      icon: ShieldCheck,
      title: "Ship with confidence.",
      description: "SSO, approvals, and audit trails built in.",
    },
  ],
  analysts: [
    {
      icon: Bot,
      title: "Refine, don't rebuild.",
      description: "Tune metric definitions and queries inline.",
    },
    {
      icon: LayoutTemplate,
      title: "Reusable building blocks.",
      description: "Components and metrics fan out across apps.",
    },
    {
      icon: ShieldCheck,
      title: "Lineage you can read.",
      description: "Every chart traces back to a definition.",
    },
  ],
  admins: [
    {
      icon: Bot,
      title: "Govern the AI.",
      description: "Every suggestion is a diff with rationale.",
    },
    {
      icon: Paintbrush,
      title: "One design system.",
      description: "Lock tokens, fonts, and chart palettes.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance on rails.",
      description: "SAML, SCIM, row-level multi-tenancy.",
    },
  ],
}

function makeSpark(seed: number, points = 24) {
  let v = 100
  return Array.from({ length: points }, (_, i) => {
    const r = Math.sin(seed * 9.13 + i * 1.7) * 0.5 + 0.5
    v = v * (1 + (r - 0.42) * 0.04)
    return { i, v: Math.round(v * 100) / 100 }
  })
}

const cadenceStats = [
  {
    label: "Monthly Active Listeners",
    icon: Users,
    value: "184.2M",
    delta: 3.4,
    spark: makeSpark(7),
  },
  {
    label: "Streams Today",
    icon: Music2,
    value: "421.8M",
    delta: 5.2,
    spark: makeSpark(13),
  },
]

const cadenceTopTracks = [
  { rank: 1, title: "Neon Tides", artist: "Mira Solene", streams: "4.81M", delta: 8.4 },
  { rank: 2, title: "Paper Lanterns", artist: "Hollow Coast", streams: "3.92M", delta: 4.1 },
  { rank: 3, title: "Slow Hour", artist: "Junie & The Verge", streams: "3.61M", delta: -1.7 },
  { rank: 4, title: "Glasshouse", artist: "Aerogram", streams: "3.20M", delta: 12.3 },
]

const pricing = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/month",
    pitch: "For solo builders and weekend pilots.",
    cta: "Start free",
    variant: "outline" as const,
    bullets: [
      "Up to 3 dashboards",
      "1 connected source",
      "Community support",
      "MIT-licensed components",
    ],
  },
  {
    name: "Team",
    price: "$49",
    cadence: "/user / month",
    pitch: "For analytics teams shipping internal apps.",
    cta: "Start trial",
    variant: "default" as const,
    featured: true,
    bullets: [
      "Unlimited dashboards",
      "All warehouse and SaaS sources",
      "SSO, audit logs, lineage",
      "Brand token enforcement",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    pitch: "For embedded analytics and regulated industries.",
    cta: "Talk to sales",
    variant: "outline" as const,
    bullets: [
      "Customer-facing embeds",
      "Row-level multi-tenancy",
      "SOC 2 + HIPAA + ISO 27001",
      "Dedicated success engineer",
      "On-prem deploy option",
    ],
  },
]

const certifications = ["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001"]

const securityItems = [
  "Reusable metric definitions",
  "Component and token enforcement",
  "Role-based publishing",
  "Audit trails for AI suggestions",
  "Row-level multi-tenancy",
  "SAML/OIDC SSO and SCIM",
]

const faqs = [
  {
    q: "What data sources can Atlas connect to?",
    a: "Warehouses, Postgres, MySQL, SaaS systems, and REST or GraphQL APIs.",
  },
  {
    q: "Can I embed Atlas dashboards in my product?",
    a: "Yes — with row-level multi-tenancy, white-label theming, and signed JWT auth.",
  },
  {
    q: "How does Atlas stay on brand?",
    a: "Import your design tokens once. Atlas reuses them and flags drift in review.",
  },
  {
    q: "Access control and SSO?",
    a: "SAML, OIDC, SCIM, and role-based publishing built in.",
  },
  {
    q: "How are AI suggestions reviewed?",
    a: "Every edit is a diff with rationale. Approve or roll back.",
  },
]

const navProduct = [
  { icon: LayoutTemplate, label: "Platform", description: "AI-built dashboards", href: "#platform" },
  { icon: Globe2, label: "Embed SDK", description: "Customer-facing analytics", href: "#platform" },
  { icon: ShieldCheck, label: "Security", description: "SSO, SOC 2, audit trails", href: "#security" },
]

const navResources = [
  { icon: BookOpen, label: "Docs", description: "Guides and references", href: "#" },
  { icon: FileText, label: "Case studies", description: "How customers ship faster", href: "#case-study" },
  { icon: Lightbulb, label: "Changelog", description: "Latest releases", href: "#" },
]

const footerLinks = {
  Product: [
    { label: "Platform", href: "#platform" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#security" },
    { label: "Case study", href: "#case-study" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Customers", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "SOC 2", href: "#" },
    { label: "DPA", href: "#" },
  ],
}

function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground/50",
        className
      )}
      aria-hidden
    >
      <Image className="size-8" />
    </div>
  )
}

const sparkConfig: ChartConfig = {
  v: { label: "Value", color: "var(--color-chart-1)" },
}

function Spark({ data, id }: { data: { i: number; v: number }[]; id: string }) {
  return (
    <ChartContainer
      config={sparkConfig}
      className="aspect-auto h-12 w-full [&_.recharts-surface]:overflow-visible"
    >
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="var(--color-chart-1)"
          strokeWidth={1.75}
          fill={`url(#${id})`}
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
      {value.toFixed(1)}%
    </span>
  )
}

export function MarketingPage() {
  const [alertOpen, setAlertOpen] = useState(true)
  const [demoOpen, setDemoOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleDemoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDemoOpen(false)
    toast.success("Demo request received", {
      description: "We'll be in touch within one business day.",
    })
  }

  const handleNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    toast.success("You're subscribed", {
      description: "First digest lands Monday.",
    })
    form.reset()
  }

  return (
    <TooltipProvider delay={150}>
      <div className="min-h-screen bg-background text-foreground">
        {alertOpen && (
          <Alert className="rounded-none border-x-0 border-t-0 bg-muted/40 py-2">
            <AlertDescription className="flex items-center justify-center gap-2 px-8 text-sm">
              <Sparkles className="size-4" />
              <span>
                New: customer-facing dashboards are in beta.{" "}
                <a href="#case-study">See it →</a>
              </span>
            </AlertDescription>
            <button
              type="button"
              onClick={() => setAlertOpen(false)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </Alert>
        )}

        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
            <a
              href="#top"
              className="flex items-center gap-2 font-heading text-lg font-semibold"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <DatabaseZap className="size-4" />
              </span>
              Radium Atlas
            </a>

            <NavigationMenu className="ml-4 hidden md:flex">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2">
                      {navProduct.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink href={item.href}>
                            <item.icon className="text-primary" />
                            <div>
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2">
                      {navResources.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink href={item.href}>
                            <item.icon className="text-primary" />
                            <div>
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#case-study">Case study</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="ml-auto flex items-center gap-3">
              <ThemeSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                      Sign in
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem>Sign in</DropdownMenuItem>
                  <DropdownMenuItem>Create account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Docs</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setDemoOpen(true)}>
                Request demo
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon-sm" className="md:hidden">
                      <Menu />
                    </Button>
                  }
                />
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Radium Atlas</SheetTitle>
                    <SheetDescription>
                      Secure, on-brand dashboards built with AI.
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 px-4 pb-6 text-sm">
                    {[
                      { label: "Platform", href: "#platform" },
                      { label: "Workflow", href: "#workflow" },
                      { label: "Case study", href: "#case-study" },
                      { label: "Pricing", href: "#pricing" },
                      { label: "Security", href: "#security" },
                      { label: "FAQ", href: "#faq" },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-muted"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6 md:py-28">
              <Badge variant="secondary" className="mx-auto w-fit gap-1.5">
                <Sparkles className="size-3.5" />
                AI dashboards
              </Badge>
              <h1 className="mx-auto mt-6 max-w-4xl font-heading text-5xl leading-[1.05] font-semibold tracking-tight md:text-7xl">
                Internal and customer dashboards, on your brand.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Atlas turns governed data into polished analytics apps — built with AI.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonGroup>
                  <Button size="lg" onClick={() => setDemoOpen(true)}>
                    Start building
                    <ArrowRight data-icon="inline-end" className="size-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View live example
                  </Button>
                </ButtonGroup>
              </div>
              <div className="mx-auto mt-16 w-full max-w-5xl">
                <AspectRatio ratio={16 / 9}>
                  <div className="h-full w-full overflow-hidden rounded-lg border bg-muted/40">
                    <DashboardPage withSidebar={false} />
                  </div>
                </AspectRatio>
              </div>
            </div>
          </section>

          <section className="overflow-hidden border-b bg-muted/35">
            <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
              <p className="text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Trusted by teams shipping data products
              </p>
            </div>
            <div
              className="relative mt-6 w-full overflow-hidden pb-10"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
              <div
                className="flex w-max"
                style={{ animation: "marquee 40s linear infinite" }}
              >
                {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
                  <ImagePlaceholder
                    key={`${name}-${i}`}
                    className="mr-6 h-12 w-48 shrink-0"
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="border-b">
            <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 bg-background px-6 py-10 md:px-8 md:py-12"
                >
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button
                          type="button"
                          className="w-fit cursor-help font-heading text-4xl font-semibold tracking-tight md:text-5xl"
                        >
                          {stat.value}
                        </button>
                      }
                    />
                    <TooltipContent>{stat.tooltip}</TooltipContent>
                  </Tooltip>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="platform" className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-primary">Platform</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  Built like software.
                </h2>
              </div>

              <Tabs defaultValue="operators" className="mt-12 items-center">
                <TabsList>
                  <TabsTrigger value="operators">Operators</TabsTrigger>
                  <TabsTrigger value="analysts">Analysts</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                {Object.entries(featuresByRole).map(([role, items]) => (
                  <TabsContent key={role} value={role} className="mt-16 w-full">
                    <div className="grid gap-y-14 gap-x-12 md:grid-cols-3">
                      {items.map((feature) => (
                        <div
                          key={feature.title}
                          className="flex flex-col items-center px-2 text-center"
                        >
                          <feature.icon className="size-10" strokeWidth={1.5} />
                          <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight">
                            {feature.title}
                          </h3>
                          <p className="mt-3 text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          <section id="workflow" className="border-b bg-muted/35">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-primary">Workflow</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  From prompt to production.
                </h2>
              </div>
              <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Connect", description: "Bring your warehouse and SaaS data." },
                  { title: "Draft", description: "Describe the dashboard you need." },
                  { title: "Review", description: "Tune metrics and brand inline." },
                  { title: "Publish", description: "Ship behind SSO or embed it." },
                ].map((step, index) => (
                  <div key={step.title} className="border-t pt-6">
                    <div className="font-mono text-sm tracking-wider text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="case-study" className="border-b">
            <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <Badge variant="secondary" className="w-fit gap-1.5">
                  <Quote className="size-3.5" />
                  Case study · Cadence Audio
                </Badge>
                <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  One source of streaming truth.
                </h2>
                <p className="text-muted-foreground">
                  Cadence Audio consolidated five disconnected reports into one
                  internal app — drafted by Atlas, themed in Cadence's brand,
                  and shipped behind SSO in under three weeks.
                </p>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="flex gap-4 pt-1">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-primary/15 text-primary">
                        CM
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed">
                        “One app that everyone trusts. It looks like the rest
                        of Cadence — that's what got it adopted.”
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Casey Marko · VP Analytics, Cadence Audio
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" className="mt-auto w-fit">
                  Read the full story
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {cadenceStats.map((stat) => (
                    <Card key={stat.label}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
                          <stat.icon className="size-3.5" />
                          {stat.label}
                        </CardDescription>
                        <Delta value={stat.delta} />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <CardTitle className="font-mono text-2xl tabular-nums">
                          {stat.value}
                        </CardTitle>
                        <Spark
                          data={stat.spark}
                          id={`spark-${stat.label.replace(/\s+/g, "-")}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="flex flex-1 flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <CardDescription className="text-xs font-medium">
                        Charts
                      </CardDescription>
                      <CardTitle className="text-base">Top tracks</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Updated live
                    </span>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>Track</TableHead>
                        <TableHead className="text-right">Streams</TableHead>
                        <TableHead className="text-right">Δ 24h</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cadenceTopTracks.map((t) => (
                        <TableRow key={t.rank}>
                          <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                            {t.rank}
                          </TableCell>
                          <TableCell>
                            <div className="leading-tight">
                              <div className="font-medium">{t.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {t.artist}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono tabular-nums">
                            {t.streams}
                          </TableCell>
                          <TableCell className="text-right">
                            <Delta value={t.delta} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </section>

          <section id="pricing" className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-primary">Pricing</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  Simple, transparent pricing.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Start free. Upgrade when your team does.
                </p>
              </div>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {pricing.map((plan) => (
                  <Card
                    key={plan.name}
                    className={cn(
                      "flex flex-col",
                      plan.featured && "ring-1 ring-primary"
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        {plan.featured && <Badge>Most popular</Badge>}
                      </div>
                      <CardDescription>{plan.pitch}</CardDescription>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="font-heading text-4xl font-semibold tracking-tight">
                          {plan.price}
                        </span>
                        {plan.cadence && (
                          <span className="text-sm text-muted-foreground">
                            {plan.cadence}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-4">
                      <ul className="space-y-2 text-sm">
                        {plan.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={plan.variant}
                        className="mt-auto w-full"
                        onClick={() => setDemoOpen(true)}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="security" className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-primary">Security</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  Versioned. Reviewed. Permissioned.
                </h2>
              </div>
              <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
                {securityItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {certifications.map((c) => (
                  <Badge key={c} variant="outline" className="gap-1.5">
                    <ShieldCheck className="size-3.5" />
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="border-b bg-muted/35">
            <div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28">
              <div className="text-center">
                <p className="text-sm font-medium text-primary">FAQ</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                  Questions, answered.
                </h2>
              </div>
              <Card className="mt-12">
                <CardContent className="pt-1">
                  <Accordion>
                    {faqs.map((item) => (
                      <AccordionItem key={item.q} value={item.q}>
                        <AccordionTrigger className="text-base">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
              <Card className="overflow-hidden bg-linear-to-br from-primary/10 via-background to-background">
                <CardContent className="flex flex-col items-center gap-6 px-6 py-16 text-center md:px-12 md:py-20">
                  <h2 className="max-w-3xl font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                    Bring your data. Bring your brand.
                  </h2>
                  <form
                    onSubmit={handleNewsletter}
                    className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
                  >
                    <Input
                      type="email"
                      required
                      name="email"
                      placeholder="you@company.com"
                      className="flex-1"
                    />
                    <Button type="submit" size="lg">
                      Subscribe
                    </Button>
                  </form>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" onClick={() => setDemoOpen(true)}>
                      Start building
                      <ArrowRight data-icon="inline-end" className="size-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button size="lg" variant="outline">
                            Talk to sales
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="center" sideOffset={8}>
                        <DropdownMenuItem
                          onClick={() =>
                            toast("Opening email", { description: "sales@atlas.example" })
                          }
                        >
                          Email sales
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toast("Booking a call", { description: "Pick a time that works." })
                          }
                        >
                          <Calendar />
                          Book a call
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toast("Slack Connect", { description: "Invite link copied." })
                          }
                        >
                          Slack Connect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="border-t bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-heading text-lg font-semibold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <DatabaseZap className="size-4" />
                </span>
                Radium Atlas
              </div>
              <p className="max-w-xs text-sm text-muted-foreground">
                Secure, on-brand dashboards — built with AI.
              </p>
            </div>
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="space-y-3">
                <div className="text-sm font-semibold">{heading}</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a className="hover:text-foreground" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator />
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row md:px-6">
            <span>© 2026 Radium Atlas. All rights reserved.</span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              All systems operational
            </span>
          </div>
        </footer>

        <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request a demo</DialogTitle>
              <DialogDescription>
                A 20-minute walk-through with your data and brand.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDemoSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel>
                    <Label htmlFor="demo-name">Name</Label>
                  </FieldLabel>
                  <Input id="demo-name" name="name" required placeholder="Casey Marko" />
                </Field>
                <Field>
                  <FieldLabel>
                    <Label htmlFor="demo-email">Work email</Label>
                  </FieldLabel>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    required
                    placeholder="casey@company.com"
                  />
                </Field>
                <Field>
                  <FieldLabel>
                    <Label htmlFor="demo-team">Team size</Label>
                  </FieldLabel>
                  <Select defaultValue="11-50">
                    <SelectTrigger id="demo-team" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1–10</SelectItem>
                      <SelectItem value="11-50">11–50</SelectItem>
                      <SelectItem value="51-200">51–200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>
                    <Label htmlFor="demo-note">What do you want to build?</Label>
                  </FieldLabel>
                  <Textarea
                    id="demo-note"
                    name="note"
                    rows={3}
                    placeholder="An internal exec dashboard, a customer-facing report…"
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="demo-updates" defaultChecked />
                  <FieldLabel>
                    <Label htmlFor="demo-updates" className="text-sm font-normal">
                      Send me product updates
                    </Label>
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setDemoOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Request demo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </TooltipProvider>
  )
}
