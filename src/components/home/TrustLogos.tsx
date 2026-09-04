const logos = ["NORTHSTONE", "Verve", "LUMINA", "PIONEER", "alta"];

export function TrustLogos() {
  return (
    <div className="mt-14">
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--home-muted)]">Trusted by forward-thinking businesses</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-2 text-[10px] font-semibold tracking-[0.15em] text-[#696159]">{logos.map((logo) => <span key={logo}>{logo}</span>)}</div>
    </div>
  );
}
