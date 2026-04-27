import { useEffect, useRef } from "react";
import { MapPin, Navigation, Building2, TreePine } from "lucide-react";

const nearbyItems = [
  {
    icon: Building2,
    label: "Business District",
    detail: "Cape Coral Commercial Core — 5 min",
  },
  {
    icon: Navigation,
    label: "Fort Myers",
    detail: "RSW International Airport — 25 min",
  },
  {
    icon: TreePine,
    label: "Waterfront Parks",
    detail: "Cape Coral Parkway Access — 8 min",
  },
  {
    icon: MapPin,
    label: "Shopping & Dining",
    detail: "Pine Island Corridor — Walking",
  },
];

const highlights = [
  "Center of Cape Coral's fastest-growing corridor",
  "Minutes from Cape Coral's commercial hub",
  "Quick access to Fort Myers and RSW Airport",
  "Surrounded by top dining, fitness, and retail",
];

export default function MeridianLocation() {
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
    <section id="location" ref={sectionRef} className="py-28 bg-coastal-navy relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 meridian-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center text-cloud-white">
          {/* Left: text */}
          <div className="reveal initial-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-zenith-gold" />
              <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-zenith-gold">
                Location
              </span>
            </div>
            <h2 className="font-montserrat font-extrabold text-4xl lg:text-5xl text-cloud-white leading-tight mb-6">
              Positioned<br />
              <span className="text-zenith-gold">Perfectly</span>
            </h2>
            <p className="font-inter text-cloud-white/60 text-lg leading-relaxed mb-10">
              The Pine Island Corridor is Cape Coral's defining address — positioned at the epicenter of Southwest Florida's most dynamic growth. Your next chapter starts here.
            </p>

            {/* Highlights */}
            <ul className="space-y-4 mb-12">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2.5 flex-shrink-0" />
                  <span className="font-inter text-cloud-white/70 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            {/* Nearby grid */}
            <div className="grid grid-cols-2 gap-px bg-cloud-white/10">
              {nearbyItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-coastal-navy hover:bg-meridian-charcoal transition-colors duration-300 p-5 group"
                >
                  <item.icon
                    size={18}
                    className="text-zenith-gold mb-3"
                  />
                  <div className="font-montserrat font-semibold text-sm text-cloud-white mb-1">
                    {item.label}
                  </div>
                  <div className="font-inter text-xs text-cloud-white/40 text-zenith-gold">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map embed placeholder with styled overlay */}
          <div className="reveal initial-hidden animation-delay-200">
            <div className="relative aspect-[4/5] bg-meridian-charcoal overflow-hidden rounded">
              {/* Map iframe */}
              <iframe
                title="The Meridian at Pine Island Road location"
                src="https://maps.google.com/maps?q=2522+Ceitus+Pkwy,+Cape+Coral,+FL+33991&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 opacity-60"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-meridian-charcoal/95 backdrop-blur-sm p-5 border border-zenith-gold/20">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-zenith-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-montserrat font-bold text-cloud-white text-sm mb-0.5">
                      The Meridian at Pine Island
                    </div>
                    <div className="font-inter text-xs text-cloud-white/50">
                      2522 Ceitus Pkwy · Cape Coral, FL 33991
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
