import { ArrowUpRight, Film } from "lucide-react";
import MeridianVideoPlayer from "./MeridianVideoPlayer";
import "./meridian-construction.css";

export default function MeridianConstruction() {
  return (
    <section id="construction" className="construction-section" aria-labelledby="construction-heading">
      <div className="construction-layout">
        <div className="construction-copy">
          <p className="construction-eyebrow">
            <span aria-hidden="true" />
            Construction update
          </p>
          <h2 id="construction-heading">See The Meridian<br />taking shape.</h2>
          <p className="construction-description">
            A look inside your future home. Step behind the scenes at The Meridian
            at Pine Island Road, where the spaces and finishing details are coming together.
          </p>
          <p className="construction-film-note">
            <Film size={16} strokeWidth={1.5} aria-hidden="true" />
            A 39-second look behind the scenes
          </p>
          <div className="construction-opening">
            <div>
              <p>Opening January 2027</p>
              <span>Cape Coral, Florida</span>
            </div>
            <a href="#contact">
              Join the VIP waitlist
              <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="construction-film">
          <MeridianVideoPlayer />
          <figcaption>
            <span>The Meridian, in progress</span>
            <span>Pine Island Road</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
