import { BeyondCode } from "@/components/main/beyond-code";
import { Contact } from "@/components/main/contact";
import { Experience } from "@/components/main/experience";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <BeyondCode />
        <Contact />
      </div>
    </main>
  );
}
