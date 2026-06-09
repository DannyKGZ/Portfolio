const HeroCoderScene = () => (
  <div className="hero-coder hidden lg:block" aria-hidden>
    <div className="hero-coder__desk">
      <div className="hero-coder__monitor">
        <div className="hero-coder__screen">
          <div className="hero-coder__code-line hero-coder__code-line--1" />
          <div className="hero-coder__code-line hero-coder__code-line--2" />
          <div className="hero-coder__code-line hero-coder__code-line--3" />
          <div className="hero-coder__cursor" />
        </div>
        <div className="hero-coder__stand" />
      </div>

      <div className="hero-coder__chair">
        <div className="hero-coder__seat" />
        <div className="hero-coder__back" />
        <div className="hero-coder__leg hero-coder__leg--1" />
        <div className="hero-coder__leg hero-coder__leg--2" />
      </div>

      <div className="hero-coder__person">
        <div className="hero-coder__head" />
        <div className="hero-coder__body" />
        <div className="hero-coder__arm hero-coder__arm--left" />
        <div className="hero-coder__arm hero-coder__arm--right" />
      </div>

      <div className="hero-coder__keyboard" />
      <div className="hero-coder__mouse" />
    </div>
  </div>
);

export default HeroCoderScene;
