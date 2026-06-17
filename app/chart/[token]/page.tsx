import type { Metadata } from "next";
import { getChartByToken } from "../../../lib/db";
import SharedChartClient from "./SharedChartClient";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  let name = "Birth chart";
  try {
    const birth = await getChartByToken(token);
    if (birth?.name) name = birth.name;
  } catch {
    // DB unavailable (e.g. local dev without env vars) — fall back to generic title
  }

  const title = `${name}'s birth chart, explained — chartwise`;
  const description = `${name}'s natal chart: Sun, Moon, Rising, houses, and a plain-English reading of every placement. Free, no signup.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "chartwise",
      // og:image is served by the co-located opengraph-image.tsx route (dynamic per-chart)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // twitter:image is served by the co-located opengraph-image.tsx route
    },
  };
}

export default function SharedChartPage() {
  return <SharedChartClient />;
}
