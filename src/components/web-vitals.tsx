"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useAnalytics } from "@/hooks/useAnalytics";

export function WebVitals() {
  const { trackAction } = useAnalytics();

  useReportWebVitals((metric) => {
    trackAction("SYSTEM", "web_vitals", {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  });

  return null;
}
