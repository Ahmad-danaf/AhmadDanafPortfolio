import { RxEnvelopeClosed, RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

import { BackgroundVideo } from "@/components/sub/background-video";
import { ArrowOut } from "@/components/sub/marks";
import { BACKGROUNDS, CONTACT, SITE, SOCIALS } from "@/content/site";

const linkedin = SOCIALS.find((s) => s.name === "LinkedIn")!;
const github = SOCIALS.find((s) => s.name === "GitHub")!;

export const Contact = () => (
  <section id="contact" className="relative flex flex-col items-center overflow-hidden px-5 py-32 text-center">
    <BackgroundVideo
      src={BACKGROUNDS.contact}
      className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
    />
    <h2 className="text-[32px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
      {CONTACT.title}
    </h2>
    <p className="mt-4 max-w-xl text-lg text-gray-300">{CONTACT.line}</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a href={`mailto:${SITE.email}`} className="btn btn-primary btn-lg">
        <RxEnvelopeClosed className="text-base" />
        Email me
      </a>
      <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
        <RxLinkedinLogo className="text-base" />
        LinkedIn
        <ArrowOut />
      </a>
      <a href={github.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
        <RxGithubLogo className="text-base" />
        GitHub
        <ArrowOut />
      </a>
    </div>
  </section>
);
