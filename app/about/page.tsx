import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AboutBody } from "@/components/AboutBody";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: company.blurb,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={"A diversified\nbusiness solutions company."} intro={company.blurb} />
      <AboutBody />
    </>
  );
}
