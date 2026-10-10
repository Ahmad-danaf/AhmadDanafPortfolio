import { RxGithubLogo } from "react-icons/rx";

import { ArrowOut } from "@/components/sub/marks";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/content/projects";
import { SOCIALS } from "@/content/site";

const GITHUB_URL = SOCIALS.find((s) => s.name === "GitHub")!.url;

export const Projects = () => (
  <section id="projects" className="flex flex-col items-center justify-center py-20">
    <h2 className="py-10 text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
      Projects
    </h2>
    <div className="grid w-full max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-10">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
    <div className="mt-16 flex flex-col items-center px-5 text-center">
      <p className="mb-4 text-lg text-gray-300">More of my code is on GitHub.</p>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
        <RxGithubLogo className="text-base" />
        More on GitHub
        <ArrowOut />
      </a>
    </div>
  </section>
);
