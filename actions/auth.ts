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

  // Validate input
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  try {
    // Step 1: Create user in auth.users
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?next=/login`,
          data: { name }, // Optional: Store name in auth.users metadata
        },
      },
    );

    if (signUpError) throw signUpError;

    // Step 2: Insert into userInfos
    if (signUpData.user) {
      const { error: insertError } = await supabase.from("userInfos").insert([
        {
          user_id: signUpData.user.id,
          currentBalance: 0,
          income: 0,
        },
      ]);

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (err: any) {
    console.error("Signup failed:", err);
    return {
      errors: { email: [err.message || "Something went wrong"] },
    };
  }
}
export async function logout() {
  s;
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
