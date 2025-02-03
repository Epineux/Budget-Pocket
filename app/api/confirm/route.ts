// route.ts
import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

const ERROR_CODES = {
  INVALID_LINK: "invalid_link",
  LINK_EXPIRED: "link_expired",
  VERIFICATION_ERROR: "verification_error",
  UNEXPECTED_ERROR: "unexpected_error",
} as const;

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || "/";

  // Validation des paramètres
  if (!token_hash || !type) {
    console.error("Missing required parameters in confirmation link");
    return redirect(`/login?code=${ERROR_CODES.INVALID_LINK}`);
  }

  const supabase = await createClient();

  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (verifyError) {
      console.error("Email verification failed:", verifyError.message);
      const errorCode = getErrorCode(verifyError);
      return redirect(`/login?code=${errorCode}`);
    }

    return new Response(null, {
      status: 303,
      headers: {
        Location: next,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Unexpected error during email verification:", error);
    return redirect(`/login?code=${ERROR_CODES.UNEXPECTED_ERROR}`);
  }
}

function getErrorCode(error: any): string {
  switch (error.code) {
    case "otp_expired":
      return ERROR_CODES.LINK_EXPIRED;
    case "invalid_otp":
      return ERROR_CODES.INVALID_LINK;
    default:
      return ERROR_CODES.VERIFICATION_ERROR;
  }
}
