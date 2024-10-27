import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  buttons: { label: string; url: string }[]; // Add buttons prop
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  buttons,
}: ProjectCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">
      <Link href={link} target="_blank" rel="noreferrer noopener">
        <Image
          src={src}
          alt={title}
          width={1200}
          height={1200}
          className="w-full object-contain"
        />
      </Link>

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-1 px-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white ${
                buttons.length === 3 ? "w-1/3" : "w-1/2"
              } text-center`}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
