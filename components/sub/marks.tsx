// ArrowOut for links that leave the page, ArrowDown for in-page jumps.

export const ArrowOut = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="btn-mark btn-mark-out h-3 w-3 shrink-0 opacity-70"
  >
    <path d="M3.5 8.5 8.5 3.5" />
    <path d="M4.25 3.5H8.5V7.75" />
  </svg>
);

export const ArrowDown = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="btn-mark btn-mark-down h-3 w-3 shrink-0 opacity-70"
  >
    <path d="M6 2.5v7" />
    <path d="M3 6.75 6 9.5l3-2.75" />
  </svg>
);
