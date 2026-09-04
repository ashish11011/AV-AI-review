import Image from "next/image";
import { Star } from "lucide-react";

const stars = [0, 1, 2, 3, 4];

export function HeroVisual() {
  return (
    <div className="reference-hero-visual relative min-h-[360px] sm:min-h-[480px] xl:min-h-[700px]">
      <div className="reference-glass-slab absolute right-[3%] top-[5%] h-[84%] w-[84%] rounded-[22px] sm:right-[4%] sm:w-[78%] sm:rounded-[24px]" />
      <div className="reference-orbit absolute right-[4%] top-[8%] h-[76%] w-[82%] rounded-[26px] sm:right-[5%] sm:w-[76%] sm:rounded-[28px]" />

      <div className="reference-hero-photo reference-hero-photo-in absolute right-[4%] top-[8%] h-[76%] w-[82%] overflow-hidden rounded-[20px] sm:right-[6%] sm:w-[72%] sm:rounded-[22px] xl:w-[70%]">
        <Image
          src="/images/home/reviewflow-architecture.webp"
          alt="Warm, considered architecture"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 92vw"
          className="reference-photo-drift object-cover object-[62%_center] saturate-[0.72]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,252,247,.28),transparent_48%,rgba(95,73,46,.10))]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#eadfce]/40 to-transparent" />
      </div>

      <article className="reference-review-card reference-card-in absolute left-[5%] top-[25%] z-20 w-[min(284px,72%)] rounded-[18px] border border-white/75 bg-[rgba(255,255,255,0.86)] p-4 shadow-[0_22px_55px_rgba(55,39,20,0.16)] backdrop-blur-xl sm:left-[8%] sm:w-[min(292px,62%)] sm:p-5">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e6d2b8] text-[10px] font-bold text-[#4b3826]">SM</span><div><p className="text-[12px] font-semibold text-[#171714]">Sarah Mitchell</p><p className="text-[10px] text-[#8a7d6e]">Verified customer</p></div></div>
        <div className="mt-4 flex gap-0.5 text-[#d89436]">{stars.map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}</div>
        <p className="mt-4 text-[11px] leading-5 text-[#4f473d]">Excellent experience from start to finish. The team was professional, responsive, and truly cared about our success.</p>
        <div className="reference-badge-in absolute -bottom-5 right-[-15px] grid h-[54px] w-[54px] place-items-center rounded-[15px] border border-white bg-[#fffdf9] text-xl font-bold shadow-[0_12px_28px_rgba(55,39,20,0.16)]"><span className="google-g">G</span></div>
      </article>

      <div className="reference-rating-in absolute bottom-[11%] left-[6%] z-20 flex w-[122px] items-center gap-3 rounded-[16px] border border-white/75 bg-[rgba(255,255,255,0.80)] p-3 shadow-[0_18px_42px_rgba(55,39,20,0.12)] backdrop-blur-xl sm:bottom-[12%] sm:left-[10%] sm:w-[126px] sm:p-3.5"><span className="grid h-10 w-10 place-items-center rounded-full border border-[#cfa97a] font-serif text-[15px] text-[#2e2820] sm:h-11 sm:w-11">4.9</span><span className="text-[10px] leading-4 text-[#857767]">Average rating</span></div>

      <div className="absolute bottom-[12%] right-[8%] z-20 flex items-center sm:bottom-[13%] sm:right-[13%]">{["SM", "AK", "JD"].map((initials, index) => <span key={initials} className="reference-avatar-in -ml-2 grid h-7 w-7 place-items-center rounded-full border-2 border-[#fbf9f5] text-[8px] font-semibold text-white first:ml-0" style={{ backgroundColor: ["#8b6a4e", "#3a3128", "#bd9465"][index], animationDelay: `${980 + index * 70}ms` }}>{initials}</span>)}<span className="reference-avatar-in -ml-2 grid h-7 w-7 place-items-center rounded-full border-2 border-[#fbf9f5] bg-white text-xs font-semibold text-[#534839]" style={{ animationDelay: "1190ms" }}>+</span></div>
    </div>
  );
}
