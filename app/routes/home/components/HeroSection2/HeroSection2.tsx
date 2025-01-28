import { useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

const HeroSection2 = ({
  containerRef,
  setInView,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  setInView: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  const handleAnimations = async () => {
    animate(
      scope.current,
      { opacity: isInView ? [0, 1] : [1, 0] },
      { duration: 0.5 }
    );
  };

  useEffect(() => {
    if (isInView) {
      setInView();
    }
    handleAnimations();
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <section
        id="about"
        ref={scope}
        className="min-h-svh md:h-svh md:snap-start flex flex-col justify-center gap-y-4 w-full md:1/2 lg:w-2/3 px-4 mx-auto"
      >
        <div id="about-div" className="pt-20 text-center">
          <p className="text-2xl">About Me</p>
          <p className="text-lg">{`Hi, I’m Rishi Mukherjee, a passionate Full Stack Developer with over 5 years of experience building dynamic and scalable web applications. I enjoy tackling complex challenges, driving efficiency through automation, and collaborating with teams to create impactful solutions. Beyond coding, I’m an avid music enthusiast who loves exploring new songs and genres, finding inspiration in the melodies of life. I also enjoy traveling to serene and peaceful places, where I can recharge and draw creative energy. When I’m not working on innovative projects or contributing to open-source initiatives, you’ll find me immersed in music or planning my next tranquil escape.`}</p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection2;
