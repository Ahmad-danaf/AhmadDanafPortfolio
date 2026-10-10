// Two slowly rotating star layers. Transform-only CSS animation runs on the
// compositor, so it costs no main-thread time (the old WebGL field did).
export const StarField = () => (
  <div data-starfield aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="star-layer star-layer-near" />
    <div className="star-layer star-layer-far" />
  </div>
);
