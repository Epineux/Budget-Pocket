"use server";

import { loginSchema, signUpSchema } from "@/schemas/authSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleLogin(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
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

export async function handleSignUp(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = result.data;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
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
  return { errors: { email: ["Something went wrong"] } };
}
export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return { error: error.message };
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error in logout:", error);
    return { error: "Failed to logout" };
  }
}
