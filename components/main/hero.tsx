import { BackgroundVideo } from "@/components/sub/background-video";
import { HeroContent } from "@/components/sub/hero-content";
import { BACKGROUNDS } from "@/content/site";

export const Hero = () => (
  // overflow-x-clip: the swinging ID card must not widen the page on phones.
  <section id="about-me" className="relative flex flex-col h-full w-full overflow-x-clip">
    <BackgroundVideo
      src={BACKGROUNDS.hero}
      media="(min-width: 768px)"
      className="absolute top-[-40px] left-0 w-full h-full object-cover object-top -z-20 mix-blend-screen [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    />
    <HeroContent />
  </section>
);
