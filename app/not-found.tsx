import { ErrorPageView } from "@/components/error/ErrorPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CampusIQ",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <ErrorPageView
      type="404"
      statusCode="404"
      badgeText="CAMPUSIQ • NAVIGATION ERROR"
      titleSans="This page"
      titleSerif="wandered off."
      description="We couldn't find the page you're looking for. It may have moved, or the address may be incorrect."
    />
  );
}
