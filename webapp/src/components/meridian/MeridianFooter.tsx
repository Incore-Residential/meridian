export default function MeridianFooter() {
  return (
    <footer id="footer" className="bg-meridian-charcoal border-t border-zenith-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Logo & tagline */}
          <div className="text-zenith-gold">
            <img
              src="/images/meridian-logo.png"
              alt="The Meridian at Pine Island"
              className="h-10 w-auto object-contain mb-5"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="font-cormorant italic text-lg text-cloud-white/50 leading-relaxed mb-4">
              "The Defining Line of Luxury"
            </p>
            <p className="font-inter text-xs text-cloud-white/30 leading-relaxed">
              Where Everything Aligns.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-montserrat font-bold text-xs tracking-widest uppercase text-zenith-gold mb-4">
                Explore
              </div>
              <ul className="space-y-3">
                {[
                  ["Residences", "#residences"],
                  ["Amenities", "#amenities"],
                  ["Floor Plans", "#floorplans"],
                  ["Location", "#location"],
                ].map(([label, href]) => (
                  <li className="text-cloud-white" key={label}>
                    <a
                      href={href}
                      className="font-inter text-sm text-cloud-white/50 hover:text-zenith-gold transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-montserrat font-bold text-xs tracking-widest uppercase text-zenith-gold mb-4">
                Connect
              </div>
              <ul className="space-y-3">
                {[
                  "Join the VIP Waitlist",
                  "Floor Plan Inquiry",
                  "Contact Leasing",
                ].map((label) => (
                  <li key={label}>
                    <a
                      href="#contact"
                      className="font-inter text-sm text-cloud-white/50 hover:text-zenith-gold transition-colors duration-300 text-cloud-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coming soon badge */}
          <div className="border border-zenith-gold/20 p-6">
            <div className="w-2 h-2 rounded-full bg-zenith-gold mb-4 animate-pulse" />
            <div className="font-montserrat font-bold text-xs tracking-widest uppercase text-zenith-gold mb-2">
              Opening Winter 2026
            </div>
            <p className="font-inter text-sm text-cloud-white/60 leading-relaxed mb-4 text-cloud-white">
              Join the VIP Waitlist to be among the first to secure your residence at The Meridian.
            </p>
            <a
              href="#contact"
              className="inline-block font-montserrat font-bold text-xs tracking-widest uppercase px-5 py-3 bg-zenith-gold text-meridian-charcoal rounded hover:bg-opacity-90 transition-all duration-300"
            >
              Join the Waitlist
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cloud-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zenith-gold">
          <p className="font-inter text-xs text-cloud-white/25">
            © 2026 The Meridian at Pine Island. All Rights Reserved.
          </p>
          <p className="font-inter text-xs text-cloud-white/20">
            2522 Ceitus Pkwy · Cape Coral, FL 33991 · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
}
