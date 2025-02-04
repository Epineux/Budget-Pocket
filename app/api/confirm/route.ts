// app/api/confirm/route.ts
import { AUTH_MESSAGES } from "@/constants/messages";
import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Validate parameters
  if (!token_hash || !type) {
    return redirect(`/login?code=${AUTH_MESSAGES.INVALID_LINK}`);
  }

  const supabase = await createClient();

  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (verifyError) {
      const errorKey = getErrorKey(verifyError);
      return redirect(`/login?code=${errorKey}`);
    }

    return redirect(`/login?code=EMAIL_VERIFIED`);
  } catch (error: any) {
    // Check if this is a Next.js redirect error
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      // This is actually a successful redirect, so just return
      return redirect(`/login?code=EMAIL_VERIFIED`);
    }

    // Log actual unexpected errors
    console.error("Unexpected verification error:", error);
    return redirect(`/login?code=UNEXPECTED_ERROR`);
  }
}

// Return KEYS (not messages)
function getErrorKey(error: any): string {
  switch (error.code) {
    case "otp_expired":
      return "LINK_EXPIRED";
    case "invalid_otp":
      return "INVALID_LINK";
    default:
      return "VERIFICATION_ERROR";
  }
}
