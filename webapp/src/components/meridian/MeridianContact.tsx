import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";

export default function MeridianContact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    receiveInfo: false,
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post<{ success: boolean }>("/api/contact", {
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        interest: form.interest,
        message: form.message,
        receiveInfo: form.receiveInfo,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-cloud-white meridian-pattern">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: CTA copy */}
          <div className="reveal initial-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-zenith-gold" />
              <span className="font-montserrat font-medium text-xs tracking-[0.3em] uppercase text-convergence-gray">
                Find Your Meridian
              </span>
            </div>
            <h2 className="font-montserrat font-extrabold text-4xl lg:text-5xl text-meridian-charcoal leading-tight mb-6">
              Your Defining<br />
              <span className="text-zenith-gold">Moment Awaits</span>
            </h2>
            <p className="font-inter text-convergence-gray text-lg leading-relaxed mb-10">
              Coming soon — opening Winter 2026. Join the professionals who are choosing The Meridian as the place where their ambitions and home life perfectly align.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-zenith-gold pl-5">
                <div className="font-montserrat font-bold text-meridian-charcoal text-sm mb-1">
                  Leasing Office
                </div>
                <div className="font-inter text-convergence-gray text-sm">
                  2522 Ceitus Pkwy<br />Cape Coral, FL 33991
                </div>
              </div>
              <div className="border-l-2 border-zenith-gold pl-5">
                <div className="font-montserrat font-bold text-meridian-charcoal text-sm mb-1">
                  Social
                </div>
                <div className="font-inter text-convergence-gray text-sm">
                  @TheMeridianPineIsland
                </div>
              </div>
            </div>

            {/* Logo at bottom */}
            <div className="mt-12 pt-12 border-t border-border">
              <img
                src="/images/meridian-logo.png"
                alt="The Meridian at Pine Island"
                className="h-12 w-auto object-contain"
                style={{ filter: "none" }}
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal initial-hidden animation-delay-200">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-px bg-zenith-gold mx-auto mb-8" />
                <h3 className="font-montserrat font-bold text-2xl text-meridian-charcoal mb-4">
                  Your Meridian Awaits
                </h3>
                <p className="font-cormorant italic text-xl text-convergence-gray mb-6 max-w-xs">
                  "We'll be in touch shortly to help align everything perfectly."
                </p>
                <div className="w-16 h-px bg-zenith-gold mx-auto mt-8" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-montserrat text-xs font-semibold tracking-widest uppercase text-convergence-gray block mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-background border border-border text-meridian-charcoal font-inter text-sm placeholder:text-convergence-gray/40 focus:outline-none focus:border-zenith-gold transition-colors duration-300 rounded"
                      placeholder="Alex Johnson"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-xs font-semibold tracking-widest uppercase text-convergence-gray block mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-background border border-border text-meridian-charcoal font-inter text-sm placeholder:text-convergence-gray/40 focus:outline-none focus:border-zenith-gold transition-colors duration-300 rounded"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-montserrat text-xs font-semibold tracking-widest uppercase text-convergence-gray block mb-2">
                    Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3.5 bg-background border border-border text-meridian-charcoal font-inter text-sm placeholder:text-convergence-gray/40 focus:outline-none focus:border-zenith-gold transition-colors duration-300 rounded"
                    placeholder="(239) 555-0100"
                  />
                </div>

                <div>
                  <label className="font-montserrat text-xs font-semibold tracking-widest uppercase text-convergence-gray block mb-2">
                    I'm Interested In
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3.5 bg-background border border-border text-meridian-charcoal font-inter text-sm focus:outline-none focus:border-zenith-gold transition-colors duration-300 rounded appearance-none"
                  >
                    <option value="">Select a floor plan type</option>
                    <option>Studio / 1 Bedroom</option>
                    <option>1 Bedroom</option>
                    <option>2 Bedroom</option>
                    <option>3 Bedroom</option>
                    <option>All Options — Send Me Everything</option>
                  </select>
                </div>

                <div>
                  <label className="font-montserrat text-xs font-semibold tracking-widest uppercase text-convergence-gray block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 bg-background border border-border text-meridian-charcoal font-inter text-sm placeholder:text-convergence-gray/40 focus:outline-none focus:border-zenith-gold transition-colors duration-300 rounded resize-none"
                    placeholder="Tell us about your ideal move-in timeline and any questions..."
                  />
                </div>

                <div className="flex items-start gap-3 py-1">
                  <input
                    required
                    type="checkbox"
                    id="receiveInfo"
                    checked={form.receiveInfo}
                    onChange={(e) => setForm({ ...form, receiveInfo: e.target.checked })}
                    className="mt-1 w-4 h-4 accent-zenith-gold cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="receiveInfo" className="font-inter text-sm text-convergence-gray leading-snug cursor-pointer">
                    I want to receive more information about the community. <span className="text-zenith-gold">*</span>
                  </label>
                </div>

                {error !== null && (
                  <p className="font-inter text-sm text-red-600 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-montserrat font-bold text-sm tracking-widest uppercase py-4 bg-zenith-gold text-meridian-charcoal rounded hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl hover:shadow-zenith-gold/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
                >
                  {loading ? "Sending..." : "Join the VIP Waitlist"}
                </button>

                <p className="font-inter text-xs text-convergence-gray/60 text-center leading-relaxed">
                  By submitting, you consent to be contacted about The Meridian at Pine Island. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
