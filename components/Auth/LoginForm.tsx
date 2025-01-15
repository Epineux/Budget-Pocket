"use client";

import { handleLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordField from "./PasswordField";

export function LoginForm() {
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
              <FormDescription className="hidden">
                Enter your email address
              </FormDescription>
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
              <FormDescription className="hidden">
                Enter your password
              </FormDescription>
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
    </Form>
  );
}
