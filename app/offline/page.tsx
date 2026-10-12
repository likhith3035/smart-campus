import { OfflinePageView } from "@/components/error/OfflinePageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline - No Internet Connection | CampusIQ",
  description: "Looks like you're offline. CampusIQ can't reach the network right now.",
};

export default function OfflinePage() {
  return <OfflinePageView />;
}
