import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || "/"; // Default to protected page

  if (!token_hash || !type) {
    console.error("Missing token or type in confirmation link");
    return redirect("/login?code=invalid_link");
  }

  const supabase = await createClient();

  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (verifyError) {
      console.error("Verification failed:", verifyError.message);
      return redirect(`/login?code=${getErrorCode(verifyError)}`);
    }

    // Directly redirect after successful verification
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
