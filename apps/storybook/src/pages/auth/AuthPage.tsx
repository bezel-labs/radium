import * as React from "react"
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react"

import { Button } from "@radium/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@radium/ui/components/card"
import { Input } from "@radium/ui/components/input"
import { Label } from "@radium/ui/components/label"

const authCopy = {
  signup: {
    title: "Create your account",
    description: "Start tracking your workspace with Radium.",
    action: "Create account",
    switchPrompt: "Already a member?",
    switchAction: "Sign in",
  },
  login: {
    title: "Welcome back",
    description: "Sign in to continue to your workspace.",
    action: "Sign in",
    switchPrompt: "Don't have an account yet?",
    switchAction: "Create one",
  },
} as const

type AuthMode = keyof typeof authCopy

export function AuthPage() {
  const [mode, setMode] = React.useState<AuthMode>("signup")
  const copy = authCopy[mode]
  const isSignup = mode === "signup"

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
  }

  return (
    <main className="relative grid min-h-svh bg-background text-foreground lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      <section className="hidden border-r bg-muted/30 px-10 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            R
          </div>
          Radium
        </div>
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-medium text-muted-foreground">
            Identity controls
          </p>
          <h1 className="font-heading text-4xl leading-tight font-medium tracking-normal">
            Keep access clean from the first invite.
          </h1>
          <p className="max-w-md text-base text-muted-foreground">
            A focused auth flow for teams who need a calm, direct path into the
            dashboard.
          </p>
        </div>
      </section>

      <section className="flex min-h-svh items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
              R
            </div>
            <span className="text-sm font-medium">Radium</span>
          </div>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>{copy.title}</CardTitle>
              <CardDescription>{copy.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {isSignup ? (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        className="pl-8"
                        placeholder="Alex Morgan"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="pl-8"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={
                        isSignup ? "new-password" : "current-password"
                      }
                      className="pl-8"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {copy.action}
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            {copy.switchPrompt}{" "}
            <button
              type="button"
              className="font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              onClick={() => switchMode(isSignup ? "login" : "signup")}
            >
              {copy.switchAction}
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}
