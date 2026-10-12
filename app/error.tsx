"use client";

import { useEffect } from "react";
import { ErrorPageView } from "@/components/error/ErrorPageView";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for telemetry
    console.error("CampusIQ Client Exception:", error);
  }, [error]);

  return (
    <ErrorPageView
      type="error"
      statusCode="500"
      badgeText="CAMPUSIQ • SYSTEM RECOVERY"
      titleSans="Something"
      titleSerif="went astray."
      description="An unexpected system condition occurred while rendering this view. Our telemetry has logged the event."
      onRetry={() => reset()}
    />
  );
}
