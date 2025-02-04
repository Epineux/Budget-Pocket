"use server";

import { loginSchema, signUpSchema } from "@/schemas/authSchema";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/service-role";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type AuthResult = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function handleLogin(
  prevState: any,
  formData: FormData,
): Promise<AuthResult> {
  const cookieStore = await cookies();
  const supabase = await createClient();

  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return {
        errors: { email: [error.message] },
      };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      cookieStore.set("sb-access-token", session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      cookieStore.set("sb-refresh-token", session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
    return { success: true };
  } catch (error) {
    return {
      errors: { email: ["An unexpected error occurred"] },
    };
  }
}

export async function handleSignUp(
  prevState: any,
  formData: FormData,
): Promise<AuthResult> {
  const supabase = await createClient();

  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = result.data;

  try {
    // Sign up avec Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?next=/login`,
          data: {
            name: name.trim(),
          },
        },
      },
    );

    if (signUpError) {
      return {
        errors: {
          email: [signUpError.message],
        },
      };
    }

    if (!signUpData?.user) {
      return {
        errors: {
          email: ["Failed to create user account"],
        },
      };
    }

    // Insert initial user info
    const { error: userInfoError } = await supabaseAdmin
      .from("userInfos")
      .insert({
        user_id: signUpData.user.id,
        currentBalance: 0,
        income: 0,
      });

    // Check for insertion errors
    if (userInfoError) {
      if (userInfoError.code === "23505") {
        // Postgres unique violation code
        console.log("UserInfo record already exists for this user");
        return { success: true };
      }
      console.error("Failed to create user info:", userInfoError);
      return {
        errors: {
          email: ["Failed to set up user profile"],
        },
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error during sign-up:", error);
    return {
      errors: {
        email: ["An unexpected error occurred during sign-up"],
      },
    };
  }
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
