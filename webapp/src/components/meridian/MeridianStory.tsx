import { useEffect, useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "The Convergence",
    headline: "Where career meets home",
    body: "Your life is multidimensional. The Meridian supports every dimension—career, wellness, relationships, growth—all converging at one address.",
  },
  {
    number: "02",
    title: "The Zenith",
    headline: "Live at your peak",
    body: "You're at your zenith moment—peak earnings, career confidence, life clarity. Your home should reflect this achievement and fuel what's next.",
  },
  {
    number: "03",
    title: "Positioned Perfectly",
    headline: "Location + timing + you",
    body: "Prime Pine Island corridor at the center of Cape Coral's fastest-growing region. Strategic positioning for the professional who plans ahead.",
  },
];

export default function MeridianStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("initial-hidden");
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="residences" ref={sectionRef} className="py-28 bg-cloud-white meridian-pattern">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-start gap-16 mb-20">
          <div className="flex-1 reveal initial-hidden">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-zenith-gold" />
              <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-convergence-gray">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-montserrat font-extrabold text-4xl lg:text-5xl text-meridian-charcoal leading-tight">
              Precisely Where<br />
              <span className="text-zenith-gold">You Belong</span>
            </h2>
          </div>
          <div className="hidden lg:block flex-1 reveal initial-hidden animation-delay-200">
            <p className="font-inter text-lg text-convergence-gray leading-relaxed mt-6 max-w-lg">
              For ambitious professionals experiencing their peak years, The Meridian at Pine Island is the residential community engineered where career ambition, personal wellness, and lifestyle elevation perfectly align.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className={`reveal initial-hidden animation-delay-${(i + 1) * 200} bg-cloud-white p-10 lg:p-12 group hover:bg-meridian-charcoal transition-all duration-500`}
            >
              <span className="font-montserrat text-xs font-bold tracking-[0.3em] text-zenith-gold block mb-6">
                {pillar.number}
              </span>
              <div className="w-px h-12 bg-zenith-gold/30 group-hover:bg-zenith-gold/60 mb-6 transition-colors duration-500" />
              <h3 className="font-montserrat font-bold text-xs tracking-widest uppercase text-convergence-gray group-hover:text-zenith-gold transition-colors duration-500 mb-3">
                {pillar.title}
              </h3>
              <h4 className="font-montserrat font-extrabold text-2xl text-meridian-charcoal group-hover:text-cloud-white transition-colors duration-500 mb-4 leading-tight">
                {pillar.headline}
              </h4>
              <p className="font-inter text-sm text-convergence-gray group-hover:text-cloud-white/70 transition-colors duration-500 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
