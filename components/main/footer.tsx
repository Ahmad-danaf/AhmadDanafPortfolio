import Link from "next/link";

import { NAV_LINKS, SITE, SOCIALS } from "@/content/site";

export const Footer = () => {
  const connect = [
    ...SOCIALS.filter((s) => s.name !== "Resume").map((s) => ({ name: s.name as string, url: s.url })),
    { name: "Email", url: `mailto:${SITE.email}` },
  ];

  return (
    <footer className="w-full bg-transparent text-gray-200 p-[15px]">
      <div className="w-full flex flex-col items-center m-auto">
        <div className="w-full flex flex-row flex-wrap items-start justify-around gap-6">
          <nav aria-label="Connect" className="min-w-[200px] flex flex-col items-center">
            <h3 className="font-bold text-[16px]">Connect</h3>
            {connect.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="my-[10px] text-[15px] hover:text-[rgb(112,66,248)] transition"
              >
                {name}
              </a>
            ))}
          </nav>
          <nav aria-label="Site" className="min-w-[200px] flex flex-col items-center">
            <h3 className="font-bold text-[16px]">Site</h3>
            {NAV_LINKS.map(({ title, link }) => (
              <Link key={title} href={link} className="my-[10px] text-[15px] hover:text-[rgb(112,66,248)] transition">
                {title}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 mb-[20px] text-[15px] text-center">
          &copy; {SITE.name} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
