import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import {
  RxGithubLogo,
} from "react-icons/rx";
import { ArrowOut } from "@/components/sub/marks";

export const Projects = () => {
  return (
    <section id="projects" className="flex flex-col items-center justify-center py-20">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        {PROJECTS.slice(0, 3).map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
            buttons={[...project.buttons]}
          />
        ))}
      </div>
      
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        {PROJECTS.slice(3, 6).map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
            buttons={[...project.buttons]}
          />
        ))}
      </div>

      <div className="flex flex-col items-center mt-16">
        <p className="text-lg text-gray-300 mb-4">
          Curious for more? Check out my complete portfolio on GitHub for more exciting projects!
        </p>
        <a
          href="https://github.com/Ahmad-danaf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
        >
          <RxGithubLogo className="text-base" />
          More on GitHub
          <ArrowOut />
        </a>
      </div>
    </section>
  );
};
