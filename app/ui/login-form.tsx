"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/ui/components/card";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { Button } from "@/app/ui/components/button";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="max-w-md w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Please log in to continue
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="pl-10"
              />
              <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="pl-10"
              />
              <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
          </Button>

          {errorMessage && (
            <div className="flex items-center text-sm text-red-500 gap-2">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
