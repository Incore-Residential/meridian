export default function MeridianHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed building photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-building.jpg')" }}
      />

      {/* Layered dark gradient — heavier left for legibility, opens up right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      {/* Vertical bottom fade to next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Subtle gold meridian line accents */}
      <div className="absolute top-0 bottom-0 w-px bg-zenith-gold/15" style={{ left: "58%" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 initial-hidden animate-fade-in">
            <div className="w-8 h-px bg-zenith-gold" />
            <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-zenith-gold">
              Cape Coral, Southwest Florida
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-montserrat text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-cloud-white leading-[0.95] tracking-tight mb-6 initial-hidden animate-fade-in-up animation-delay-200">
            The Defining<br />
            <span className="gold-text-shimmer">Line of Luxury</span>
          </h1>

          {/* Sub-brand */}
          <p className="font-montserrat text-lg sm:text-xl font-medium tracking-[0.15em] uppercase text-white mb-8 initial-hidden animate-fade-in-up animation-delay-400" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
            The Meridian at Pine Island Road
          </p>

          {/* Brand promise */}
          <p className="font-cormorant text-xl sm:text-2xl italic text-white leading-relaxed max-w-xl mb-12 initial-hidden animate-fade-in-up animation-delay-600" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
            "Where ambition meets home, career meets rest, and your life reaches its zenith."
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 initial-hidden animate-fade-in-up animation-delay-800">
            <a
              href="#floorplans"
              className="font-montserrat font-bold text-sm tracking-widest uppercase px-8 py-4 bg-zenith-gold text-meridian-charcoal rounded hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl hover:shadow-zenith-gold/30 hover:-translate-y-0.5"
            >
              Explore Floor Plans
            </a>
            <a
              href="#contact"
              className="font-montserrat font-semibold text-sm tracking-widest uppercase px-8 py-4 border border-cloud-white/30 text-cloud-white rounded hover:border-zenith-gold hover:text-zenith-gold transition-all duration-300"
            >
              Join the VIP Waitlist
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg initial-hidden animate-fade-in-up animation-delay-1000">
            {[
              { value: "1–3", label: "Bedroom Options" },
              { value: "Prime", label: "Pine Island Corridor" },
              { value: "Winter 2026", label: "Opening Date" },
            ].map((stat) => (
              <div key={stat.label} className="border-t border-zenith-gold/30 pt-4">
                <div className="font-montserrat text-2xl font-extrabold text-cloud-white mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-xs text-white/80 leading-tight" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aerial inset — desktop only */}
        <div className="hidden lg:block absolute bottom-24 right-6 xl:right-12 initial-hidden animate-fade-in-up animation-delay-1000">
          <div className="relative w-72 xl:w-80 shadow-2xl shadow-black/60">
            {/* Gold border frame */}
            <div className="absolute -inset-px border border-zenith-gold/40 pointer-events-none z-10" />
            <img
              src="/images/hero-aerial.jpg"
              alt="Aerial view of The Meridian at Pine Island"
              className="w-full h-44 xl:h-48 object-cover block"
            />
            {/* Overlay label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="font-montserrat text-[10px] font-semibold tracking-[0.25em] uppercase text-zenith-gold">
                Aerial View
              </p>
              <p className="font-inter text-xs text-cloud-white/70 mt-0.5">
                Cape Coral, FL — Opening Winter 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 initial-hidden animate-fade-in animation-delay-1000">
        <span className="font-montserrat text-xs tracking-[0.2em] uppercase text-cloud-white/30">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zenith-gold/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
