"use server";

import { loginSchema } from "@/schemas/authSchema";
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

export async function handleSignUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Sign-up error:", error);
    return { error: error.message };
  }

  if (data.user) {
    console.log("User created:", data.user);
    redirect("/login");
  }

  return { error: "Something went wrong." };
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
