import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaFilePdf } from "react-icons/fa"; 


export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo, 
    link: "https://www.linkedin.com/in/ahmad-danaf/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo, 
    link: "https://github.com/Ahmad-danaf",
  },
  {
    name: "Resume",
    icon: FaFilePdf,
    link: "/AhmadDanaf_Resume.pdf", 
  },
] as const;

export const PROGRAMMING_LANGUAGES = [
  {
    skill_name: "C",
    image: "c.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C++",
    image: "c++.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Python",
    image: "python.png",
    width: 90,
    height: 90,
  },
  {
    skill_name: "Django",
    image: "django.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Flask",
    image: "flask.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java",
    image: "java.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Spring Boot",
    image: "spring_boot.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  
] as const;

export const WEB_DEVELOPMENT = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },

  {
    skill_name: "Bootstrap",
    image: "bootstrap.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
] as const;

export const DATABASES = [
  {
    skill_name: "JSON",
    image: "json.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "SQL",
    image: "sql.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "SQLite",
    image: "sqlite.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 90,
    height: 90,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const TOOLS = [
  {
    skill_name: "Git",
    image: "git.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "GitHub",
    image: "github.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "AWS",
    image: "aws.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Azure",
    image: "azure.png",
    width: 70,
    height: 70,
  },
] as const;

export const OS_FRAMEWORKS = [
  {
    skill_name: "Linux",
    image: "linux.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Windows",
    image: "windows.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "JavaFX",
    image: "javafx.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tkinter",
    image: "tkinter.png",
    width: 70,
    height: 70,
  },
] as const;

export const PROJECTS = [
  {
    title: "SpaceCodey",
    description:
      'SpaceCodey is a web application designed for astrophotographers and space enthusiasts. Built using Django, it offers tools for tracking celestial events, planning astrophotography sessions, and exploring astronomy-related topics. Features include user authentication, NASA APOD integration, real-time ISS tracking, weather comparison for photography, and more. The sleek dark-themed design is crafted for space lovers.',
    image: "/projects/spacecodey.png",
    link: "https://www.spacecodey.com/",
    buttons: [
      { label: "Site Link", url: "https://www.spacecodey.com/" },
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/SpaceCodey" },
    ]
    
  },
  {
    title: "Volunteen",
    description:
      'Volunteen is a platform aimed at encouraging youth involvement in community service through a points-based system. Built with a focus on task management and mentor-child interaction, it helps track volunteering efforts, rewards achievements, and fosters learning. The platform integrates features for mentorship guidance, task assignments, and progress tracking, promoting community engagement and development.',
    image: "/projects/volunteen.png", 
    link: "https://www.linkedin.com/company/volunteen2024", 
    buttons: [
      { label: "Site Link", url: "https://www.volunteen.site/" },
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/Volunteen" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/volunteen2024" }
    ]
  },
  {
    title: "Sheet-Cell Project",
    description:
      'The "Sheet-Cell Project" is an innovative approach to creating a custom-built spreadsheet engine. Inspired by platforms like Google Sheets and Excel, this project is developed in Java across multiple phases: a console-based interface, a JavaFX GUI, and a client-server architecture. It explores complex functionalities like cell-based formulas, dynamic updates, multi-user collaboration, and more.',
    image: "/projects/sheet-cell.png",
    link: "https://github.com/Ahmad-danaf/Sheet-Cell",
    buttons: [
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/Sheet-Cell" },
    ]
  },
  {
    title: "Flight Deal Finder",
    description:
      'Automates searching for flight deals and sends email alerts for cheap flights. This Python project leverages APIs like Tequila and Sheety to track flight prices and automate notifications, making travel planning easier and more affordable.',
    image: "/projects/flight-deal-finder.png",
    link: "https://github.com/Ahmad-danaf/FunLearn-Projects-Hub",
    buttons: [
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/FunLearn-Projects-Hub" },
    ]
  },
  {
    title: "Automated Amazon Price Tracker",
    description:
      'Tracks Amazon product prices and sends notifications when prices drop. This project highlights my experience with web automation and email alerts using Python, making online shopping more efficient.',
    image: "/projects/amazon-price-tracker.png",
    link: "https://github.com/Ahmad-danaf/FunLearn-Projects-Hub",
    buttons: [
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/FunLearn-Projects-Hub" },
    ]
  },
  {
    title: "Turtle Crossing Game",
    description:
      'A fun, interactive game where players help a turtle cross the road while avoiding cars. Built using Python, this game gets progressively more difficult, showcasing my skills in game development and logic implementation.',
    image: "/projects/turtle-crossing.png",
    link: "https://github.com/Ahmad-danaf/GameDev",
    buttons: [
      { label: "Source Code", url: "https://github.com/Ahmad-danaf/GameDev" },
    ]
  },
] as const;


export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo, 
        link: "https://www.linkedin.com/in/ahmad-danaf/",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo, 
        link: "https://github.com/Ahmad-danaf",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "About Me",
        icon: null,
        link: "#about-me", 
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:ahmad.danf@gmail.com",
      },
    ],
  },
] as const;


export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
