"use client";
import { handleSignUp } from "@/actions/auth";
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
import { signUpSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import PasswordField from "./PasswordField";

export function SignUpForm() {
  const [state, signUpAction, isPending] = useActionState(
    handleSignUp,
    undefined,
  );

  // No changes to useForm
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      console.log("Sign up successful:", state);
      toast.success(
        "Successfully signed up! Please check your email for confirmation.",
      );
      form.reset();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={signUpAction} className="mt-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="!text-small-bold text-grey-500">
                Name
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" className="border-beige-500" />
              </FormControl>
              {state?.errors?.name && (
                <p className="text-red-500">{state.errors.name}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-md space-y-1">
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
          Sign Up
        </Button>
      </form>
      <Toaster richColors position="top-right" />
    </Form>
  );
}
