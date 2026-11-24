import type { Metadata } from "next";
import { IndustriesBento } from "@/components/IndustriesBento";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The industries Open Box Ventures LLP serves: transportation, consumer brands & retail, hospitality & events, technology, direct-to-consumer, media, fashion, and entertainment.",
};

export default function IndustriesPage() {
  return (
    <>
      <IndustriesBento />
    </>
  );
}
