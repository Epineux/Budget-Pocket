import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return redirect("/login?code=invalid_link");
  }

  const supabase = await createClient();

  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (verifyError) {
      console.error("Verification error:", verifyError);
      if (verifyError.status === 403 && verifyError.code === "otp_expired") {
        return redirect("/login?code=link_expired");
      }
      return redirect(`/login?code=verification_error`);
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/login?code=session_error" },
      });
    }

    return new Response(null, {
      status: 303,
      headers: { Location: "/login?code=email_verified" },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return redirect("/login?code=unexpected_error");
  }
}
