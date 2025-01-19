"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if ((message || error) && !hasShownToast.current) {
      hasShownToast.current = true;

      if (message) {
        toast.success(decodeURIComponent(message));
      }
      if (error) {
        toast.error(decodeURIComponent(error));
      }

      // Clean up URL parameters without causing a refresh
      const cleanPath = pathname.split("?")[0];
      router.replace(cleanPath, { scroll: false });
    }

    // Reset the ref when the URL changes without toast params
    if (!message && !error) {
      hasShownToast.current = false;
    }
  }, [searchParams, pathname, router]);

  return null;
}
