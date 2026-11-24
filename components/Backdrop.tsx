/** Glacier glow + hairline column grid, the backdrop every redesigned section shares. `at` = glow centre (CSS position). */
export function Backdrop({ at = "0% 70%" }: { at?: string }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 90% at ${at}, rgba(34,211,238,0.5), rgba(91,47,176,0.3) 40%, transparent 75%)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />
    </>
  );
}
