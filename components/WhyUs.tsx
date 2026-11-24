import { ScrollScenes } from "./ScrollScenes";
import { differentiators } from "@/lib/data";

// same order as `differentiators`
const images = ["roof", "multidisciplinary", "international", "goals"].map((n) => `/whyobv/${n}.png`);

export function WhyUs() {
  return <ScrollScenes heading="Why Open Box Ventures" items={differentiators} images={images} />;
}
