import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return redirect(
      "/login?error=Invalid verification link. Please request a new one.",
    );
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
        return redirect(
          "/login?error=This verification link has expired. Please request a new one.",
        );
      }

      return redirect(
        `/login?error=${encodeURIComponent(verifyError.message)}`,
      );
    }
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      return new Response(null, {
        status: 303, // Using 303 for "See Other"
        headers: {
          Location: "/login?error=Session error occurred",
        },
      });
    }

    // If we have a session, redirect to home with success message
    if (session) {
      return new Response(null, {
        status: 303,
        headers: {
          Location:
            "/?message=Email verified successfully! Welcome to Budget Pocket.",
        },
      });
    }

    // If no session, redirect to login with success message
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/login?message=Email verified successfully! Please log in.",
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return redirect(
      "/login?error=An unexpected error occurred. Please try again.",
    );
  }
}
