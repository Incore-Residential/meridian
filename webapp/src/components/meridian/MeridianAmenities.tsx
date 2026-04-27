import { useEffect, useRef } from "react";

const amenities = [
  {
    category: "Fitness & Wellness Studio",
    description: "A fully equipped fitness and wellness studio designed to support your active lifestyle without ever leaving home.",
  },
  {
    category: "Lakeside Resort-Style Pool",
    description: "Unwind at our stunning lakeside pool — a true resort experience steps from your front door.",
  },
  {
    category: "Pickleball Court",
    description: "Stay active and connect with neighbors on our dedicated pickleball court, one of Florida's fastest-growing sports.",
  },
  {
    category: "Walking Trail",
    description: "A scenic walking trail winding through the community — perfect for morning runs or evening strolls.",
  },
  {
    category: "Bark Park",
    description: "A dedicated off-leash dog park where your four-legged family members can run, play, and socialize.",
  },
];

export default function MeridianAmenities() {
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
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="amenities" ref={sectionRef} className="py-28 bg-meridian-charcoal relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 meridian-pattern opacity-30" />

      {/* Decorative gold vertical line */}
      <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-zenith-gold/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 reveal initial-hidden">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-zenith-gold" />
            <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-zenith-gold">
              Community Amenities
            </span>
            <div className="w-8 h-px bg-zenith-gold" />
          </div>
          <h2 className="font-montserrat font-extrabold text-4xl lg:text-5xl text-cloud-white leading-tight">
            Designed for the Way<br />You Actually Live
          </h2>
          <p className="font-inter text-convergence-gray text-lg mt-5 max-w-xl mx-auto leading-relaxed text-muted">
            Every amenity at The Meridian is purpose-built for professionals who demand excellence in both their work and personal lives.
          </p>
        </div>

        {/* Amenity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-cloud-white/10">
          {amenities.map((amenity, i) => (
            <div
              key={amenity.category}
              className={`reveal initial-hidden animation-delay-${(i + 1) * 200} bg-meridian-charcoal p-8 lg:p-10 hover:bg-coastal-navy transition-all duration-500`}
            >
              <h3 className="font-montserrat font-bold text-xs tracking-widest uppercase text-zenith-gold mb-4">
                {amenity.category}
              </h3>
              <p className="font-inter text-sm text-white/80 leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-20 text-center reveal initial-hidden">
          <div className="inline-block border border-zenith-gold/20 px-12 py-8 max-w-2xl">
            <p className="font-cormorant text-2xl lg:text-3xl italic text-cloud-white/80 leading-relaxed text-zenith-gold">
              "I've earned this. My home should reflect my success and support my ambitions."
            </p>
            <div className="w-12 h-px bg-zenith-gold mx-auto mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
