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
import { toast } from "sonner";
import { z } from "zod";
import PasswordField from "./PasswordField";

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [state, signUpAction, isPending] = useActionState(
    handleSignUp,
    undefined,
  );

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(
        "Successfully signed up! Please check your email for confirmation.",
      );
      form.reset();
    } else if (state?.errors) {
      Object.entries(state.errors).forEach(([, messages]) => {
        messages.forEach((message) => {
          toast.error(message);
        });
      });
    }
  }, [state, form]);

  const formFields = [
    { name: "name" as const, label: "Name", type: "text" },
    { name: "email" as const, label: "Email", type: "email" },
    { name: "password" as const, label: "Password", type: "password" },
  ] as const;

  return (
    <Form {...form}>
      <form action={signUpAction} className="mt-2xl">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: fieldProps }) => (
              <FormItem
                className={`${field.name === "name" ? "" : "mt-md"} space-y-1`}
              >
                <FormLabel className="!text-small-bold text-grey-500">
                  {field.label}
                </FormLabel>
                <FormControl>
                  {field.name === "password" ? (
                    <PasswordField {...fieldProps} />
                  ) : (
                    <Input
                      {...fieldProps}
                      type={field.type}
                      className="border-beige-500"
                    />
                  )}
                </FormControl>
                {state?.errors?.[field.name] && (
                  <p className="text-red-500">{state.errors[field.name][0]}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          className="!text-standard-bold mt-2xl w-full bg-grey-900 text-white"
          size="loginButton"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
