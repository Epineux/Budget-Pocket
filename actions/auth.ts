"use server";

import { loginSchema, signUpSchema } from "@/schemas/authSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AuthResult = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function handleLogin(
  prevState: any,
  formData: FormData,
): Promise<AuthResult> {
  const supabase = await createClient();

  // Validation du schéma
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Login avec Supabase
  const { email, password } = result.data;
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return {
      errors: {
        email: [error.message],
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleSignUp(
  prevState: any,
  formData: FormData,
): Promise<AuthResult> {
  const supabase = await createClient();

  // Validation du schéma
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Sign up avec Supabase
  const { name, email, password } = result.data;
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?next=/login`,
      data: {
        name: name.trim(),
      },
    },
  });

  if (signUpError) {
    return {
      errors: {
        email: [signUpError.message],
      },
    };
  }

  if (signUpData?.user) {
    return { success: true };
  }

  return { errors: { email: ["Something went wrong during sign up"] } };
}

export async function logout(): Promise<AuthResult> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return {
        errors: {
          general: [error.message],
        },
      };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      errors: {
        general: ["Failed to logout"],
      },
    };
  }
}
