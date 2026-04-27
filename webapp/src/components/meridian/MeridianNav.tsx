import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Floor Plans", href: "#floorplans" },
  { label: "Location", href: "#location" },
];

// Section backgrounds ordered by document flow
// dark: true  = dark background → white logo + light text
// dark: false = light background → color logo + dark text
const SECTION_MAP: { id: string; dark: boolean }[] = [
  { id: "hero",       dark: true  },
  { id: "residences", dark: false },
  { id: "amenities",  dark: true  },
  { id: "floorplans", dark: false },
  { id: "location",   dark: true  },
  { id: "contact",    dark: false },
  { id: "footer",     dark: true  },
];

function useActiveSectionIsDark() {
  const [isDark, setIsDark] = useState(true);

  const detect = useCallback(() => {
    const checkPoint = 81; // 1px below the 80px nav bar

    // Walk from bottom to top — first section whose top ≤ checkPoint is the active one
    for (let i = SECTION_MAP.length - 1; i >= 0; i--) {
      const { id, dark } = SECTION_MAP[i];
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= checkPoint) {
        setIsDark(dark);
        return;
      }
    }

    setIsDark(true); // above all sections = hero = dark
  }, []);

  useEffect(() => {
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, [detect]);

  return isDark;
}

export default function MeridianNav() {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = useActiveSectionIsDark();

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY < 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On dark sections: always use dark/navy nav styling
  // On light sections: use a frosted white nav
  // atTop on dark section = fully transparent (hero entrance effect)
  const navBg = isDark
    ? atTop
      ? "bg-transparent"
      : "bg-coastal-navy/95 backdrop-blur-md shadow-lg shadow-black/20"
    : "bg-cloud-white/95 backdrop-blur-md border-b border-border shadow-sm";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo — color brand logo on light, white-inverted on dark */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/images/meridian-logo.png"
              alt="The Meridian at Pine Island"
              className="h-12 w-auto object-contain transition-all duration-500"
              style={isDark ? { filter: "brightness(0) invert(1)" } : {}}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-cloud-white">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-montserrat font-medium text-xs tracking-widest uppercase transition-colors duration-300 nav-link-hover ${
                  isDark
                    ? "text-cloud-white/80 hover:text-zenith-gold"
                    : "text-meridian-charcoal/80 hover:text-zenith-gold"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className={`font-montserrat font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded transition-all duration-300 ${
                isDark
                  ? "bg-zenith-gold text-meridian-charcoal hover:opacity-90 hover:shadow-lg hover:shadow-zenith-gold/20"
                  : "bg-meridian-charcoal text-cloud-white hover:bg-zenith-gold hover:text-meridian-charcoal"
              }`}
            >
              Join the VIP Waitlist
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isDark ? "bg-cloud-white" : "bg-meridian-charcoal"
                } ${
                  i === 0 && menuOpen ? "rotate-45 translate-y-2" :
                  i === 1 && menuOpen ? "opacity-0" :
                  i === 2 && menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-coastal-navy border-t border-zenith-gold/20 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block font-montserrat font-medium text-xs tracking-widest uppercase text-white hover:text-zenith-gold transition-colors duration-300 py-3 px-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 font-montserrat font-semibold text-xs tracking-widest uppercase px-6 py-3 bg-zenith-gold text-meridian-charcoal rounded text-center"
            >
              Join the VIP Waitlist
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
