import { Truck, Megaphone, CalendarDays, MonitorSmartphone, ShoppingCart, PenLine, Camera, Radio } from "lucide-react";

/** Maps the `icon` string in lib/data services to a lucide component. */
const map = {
  Truck,
  Megaphone,
  CalendarDays,
  MonitorSmartphone,
  ShoppingCart,
  PenLine,
  Camera,
  Radio,
} as const;

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name as keyof typeof map] ?? Truck;
  return <Icon className={className} strokeWidth={1.4} />;
}
