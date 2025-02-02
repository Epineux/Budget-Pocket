import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || "/dashboard"; // Default to protected page

  if (!token_hash || !type) {
    console.error("Missing token or type in confirmation link");
    return redirect("/login?code=invalid_link");
  }

  const supabase = await createClient();

  try {
    const { error: verifyError, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (verifyError) {
      console.error("Verification failed:", verifyError.message);
      return redirect(`/login?code=${getErrorCode(verifyError)}`);
    }

    // Get the user ID after successful verification
    const user = data.user;
    if (!user) {
      console.error("User not found after verification");
      return redirect("/login?code=user_not_found");
    }

    // Insert a new row into the `userInfos` table with default values
    const { error: insertError } = await supabase
      .from("userInfos")
      .insert([{ user_id: user.id, column1: 0, column2: 0, column3: 0 }]); // Replace `column1`, `column2`, etc. with your actual column names

    if (insertError) {
      console.error("Failed to create userInfos:", insertError.message);
      return redirect("/login?code=user_info_creation_failed");
    }

    // Directly redirect after successful verification and userInfos creation
    return new Response(null, {
      status: 303,
      headers: { Location: next },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return redirect("/login?code=unexpected_error");
  }
}

// Helper to map Supabase errors to custom codes
function getErrorCode(error: any) {
  if (error.code === "otp_expired") return "link_expired";
  if (error.code === "invalid_otp") return "invalid_link";
  return "verification_error";
}
