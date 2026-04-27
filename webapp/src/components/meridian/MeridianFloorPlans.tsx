import { useState, useEffect, useRef } from "react";

const floorPlans = [
  {
    id: 1,
    type: "Studio / 1BR",
    name: "The Longitude",
    beds: "1",
    baths: "1",
    sqft: "720–850",
    image: "/images/floor-plan-1.png",
    tag: "Most Popular",
  },
  {
    id: 2,
    type: "1 Bedroom",
    name: "The Zenith",
    beds: "1",
    baths: "1",
    sqft: "850–1,020",
    image: "/images/floor-plan-2.png",
    tag: null,
  },
  {
    id: 3,
    type: "2 Bedroom",
    name: "The Meridian",
    beds: "2",
    baths: "2",
    sqft: "1,100–1,280",
    image: "/images/floor-plan-3.png",
    tag: "Signature",
  },
  {
    id: 4,
    type: "2 Bedroom",
    name: "The Convergence",
    beds: "2",
    baths: "2",
    sqft: "1,200–1,380",
    image: "/images/floor-plan-4.png",
    tag: null,
  },
  {
    id: 5,
    type: "2 Bedroom Alt",
    name: "The Pinnacle",
    beds: "2",
    baths: "2",
    sqft: "1,250–1,400",
    image: "/images/floor-plan-4b.png",
    tag: null,
  },
  {
    id: 6,
    type: "3 Bedroom",
    name: "The Summit",
    beds: "3",
    baths: "2",
    sqft: "1,450–1,650",
    image: "/images/floor-plan-6.png",
    tag: "Premium",
  },
];

export default function MeridianFloorPlans() {
  const [active, setActive] = useState(floorPlans[0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageLoaded(false);
  }, [active]);

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
    <section id="floorplans" ref={sectionRef} className="py-28 bg-cloud-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 reveal initial-hidden">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-zenith-gold" />
            <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-convergence-gray">
              Residence Collection
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-montserrat font-extrabold text-4xl lg:text-5xl text-meridian-charcoal">
              Floor Plans
            </h2>
            <p className="font-inter text-convergence-gray max-w-sm">
              Thoughtfully designed residences for every chapter of your journey. Studio to 3-bedroom options available.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-border reveal initial-hidden animation-delay-200">
          {/* Plan selector sidebar */}
          <div className="lg:col-span-2 bg-background">
            {floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActive(plan)}
                className={`w-full text-left px-6 py-5 border-b border-border flex items-center justify-between group transition-all duration-300 ${
                  active.id === plan.id
                    ? "bg-meridian-charcoal"
                    : "bg-cloud-white hover:bg-muted"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-montserrat font-semibold text-xs tracking-widest uppercase transition-colors duration-300 ${
                        active.id === plan.id ? "text-zenith-gold" : "text-convergence-gray"
                      }`}
                    >
                      {plan.type}
                    </span>
                    {plan.tag && (
                      <span className="font-montserrat text-xs font-bold px-2 py-0.5 bg-zenith-gold/20 text-zenith-gold rounded-sm">
                        {plan.tag}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-montserrat font-bold text-lg transition-colors duration-300 ${
                      active.id === plan.id ? "text-cloud-white" : "text-meridian-charcoal"
                    }`}
                  >
                    {plan.name}
                  </span>
                  <div
                    className={`font-inter text-sm mt-1 transition-colors duration-300 ${
                      active.id === plan.id ? "text-cloud-white/50" : "text-convergence-gray"
                    }`}
                  >
                    {plan.beds} BD · {plan.baths} BA · {plan.sqft} SF
                  </div>
                </div>
                <div
                  className={`w-1.5 h-8 transition-all duration-300 ${
                    active.id === plan.id ? "bg-zenith-gold" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Floor plan display */}
          <div className="lg:col-span-3 bg-muted flex flex-col">
            {/* Plan image */}
            <div className="flex-1 relative min-h-[400px] bg-cloud-white flex items-center justify-center overflow-hidden">
              <div
                className={`absolute inset-0 bg-cloud-white transition-opacity duration-500 ${
                  imageLoaded ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                key={active.id}
                src={active.image}
                alt={`${active.name} floor plan`}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain p-8 transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </div>

            {/* Plan details bar */}
            <div className="bg-meridian-charcoal p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="font-montserrat text-xs font-medium tracking-widest uppercase text-zenith-gold mb-1">
                    {active.type}
                  </div>
                  <div className="font-montserrat font-bold text-2xl text-cloud-white">
                    {active.name}
                  </div>
                  <div className="flex gap-6 mt-3">
                    {[
                      { label: "Bedrooms", value: active.beds },
                      { label: "Bathrooms", value: active.baths },
                      { label: "Square Feet", value: active.sqft },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="font-montserrat font-bold text-lg text-cloud-white">
                          {stat.value}
                        </div>
                        <div className="font-inter text-xs text-cloud-white/40 uppercase tracking-widest">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="flex-shrink-0 font-montserrat font-bold text-xs tracking-widest uppercase px-6 py-3.5 bg-zenith-gold text-meridian-charcoal rounded hover:bg-opacity-90 transition-all duration-300 text-center"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
