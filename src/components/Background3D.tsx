const Background3D = () => (
  <div className="bg-3d fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
    <div className="bg-3d__gradient" />

    <div className="bg-3d__grid-wrap">
      <div className="bg-3d__grid" />
    </div>

    <div className="bg-3d__shapes">
      <div className="shape-3d shape-3d--cube shape-3d--1" />
      <div className="shape-3d shape-3d--ring shape-3d--2" />
      <div className="shape-3d shape-3d--cube shape-3d--3" />
      <div className="shape-3d shape-3d--octa shape-3d--4" />
      <div className="shape-3d shape-3d--ring shape-3d--5" />
      <div className="shape-3d shape-3d--cube shape-3d--6" />
    </div>

    <div className="bg-3d__orb bg-3d__orb--1" />
    <div className="bg-3d__orb bg-3d__orb--2" />
    <div className="bg-3d__orb bg-3d__orb--3" />
  </div>
);

export default Background3D;
