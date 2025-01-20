"use client";

import { handleLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AUTH_MESSAGES } from "@/constants/messages";
import { loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import PasswordField from "./PasswordField";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, loginAction, isPending] = useActionState(
    handleLogin,
    undefined,
  );
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      const message =
        AUTH_MESSAGES[code.toUpperCase() as keyof typeof AUTH_MESSAGES];
      if (message) {
        if (code.toUpperCase() === "EMAIL_VERIFIED") {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    }
  }, [searchParams]);

  return (
    <Form {...form}>
      <form action={loginAction} className="mt-2xl">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="!text-small-bold text-grey-500">
                Email
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className="border-beige-500" />
              </FormControl>
              {state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-md space-y-1">
              <FormLabel className="!text-small-bold text-grey-500">
                Password
              </FormLabel>
              <FormControl>
                <PasswordField {...field} />
              </FormControl>
              {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="!text-standard-bold mt-2xl w-full bg-grey-900 text-white"
          size="loginButton"
          disabled={isPending}
          type="submit"
        >
          Login
        </Button>
      </form>
      <Toaster richColors position="top-right" />
    </Form>
  );
}
