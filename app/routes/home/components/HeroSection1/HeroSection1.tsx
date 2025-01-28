import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAnimate, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import InstallButton from "../../../../components/InstallButton/InstallButton";
import "./HeroSection1.scss";

const HeroSection1 = ({
  containerRef,
  setInView,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  setInView: () => void;
}) => {
  const [isInitialAnimation, setIsInitialAnimation] = useState<boolean>(true);
  const imageDiv = useRef<HTMLDivElement>(null);
  const textDiv = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: false });
  const [scope, animate] = useAnimate();
  const setTextPosition = () => {
    if (textDiv.current && imageDiv.current) {
      const imageBoundingRect = imageDiv.current.getBoundingClientRect();
      const textYPosition = imageBoundingRect.y + imageBoundingRect.height + 10;
      textDiv.current.style.top = textYPosition + "px";
    }
  };

  const animationOnPage = async () => {
    await animate(
      scope.current,
      { opacity: isInView ? [0, 1] : [1, 0] },
      { duration: 0.5, ease: "easeInOut" }
    );
    if (isInitialAnimation) {
      await animate(
        "#image-div",
        {
          filter: ["blur(100px)", "blur(0px)"],
          opacity: [0, 1],
        },
        { duration: 0.5 }
      );
      await animate(
        "#text-div",
        { y: [100, 0], opacity: [0, 1], display: ["none", "inline"] },
        { duration: 0.5 }
      );
      await animate("#text-div a", { display: ["none", "inline"] });

      await animate(
        "#text-div a:nth-of-type(1)",
        { opacity: [0, 1], scale: [0, 1], y: [10, 0] },
        { duration: 0.2 }
      );
      await animate(
        "#text-div a:nth-of-type(2)",
        { opacity: [0, 1], scale: [0, 1], y: [10, 0] },
        { duration: 0.2 }
      );
      await animate(
        "#text-div a:nth-of-type(3)",
        { opacity: [0, 1], scale: [0, 1], y: [10, 0] },
        { duration: 0.2 }
      );

      await animate(
        "#install-button",
        { opacity: [0, 1], scale: [0, 1], y: [10, 0] },
        { duration: 0.2 }
      );
    }
  };

  useLayoutEffect(() => {
    setTextPosition();
  }, []);

  useEffect(() => {
    if (isInView) {
      setInView();
    }
    setIsInitialAnimation(false);
    animationOnPage();
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <section
        ref={scope}
        id="main"
        className="section-1 min-h-svh md:h-svh md:snap-start flex flex-col items-center justify-center"
      >
        <div
          id="image-div"
          ref={imageDiv}
          className="absolute flex flex-col items-center opacity-0" //Opacity is kept at 0 insted of display:none to calculate the position of the text box
        >
          <img
            src="/assets/Hero-1.webp"
            alt="Rishi Mukherjee"
            className="w-1/2 md:w-1/3 lg:w-1/5 rounded-full border-8 border-green-100/10"
          />
        </div>
        <div
          ref={textDiv}
          id="text-div"
          className="absolute hidden text-center"
        >
          <p className="text-2xl">Rishi Mukherjee</p>
          <p className="text-lg">Full Stack Web Developer</p>
          <div className="flex flex-row mt-2 gap-x-4 justify-center">
            <a
              href="http://www.linkedin.com/in/rishi-mukherjee-a89a11142"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden opacity-0"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://github.com/RAGAdox"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden opacity-0"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a
              href="mailto:rishirishi20121997@gmail.com"
              aria-label="Compose Email"
              className="hidden opacity-0"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </div>
          <div id="install-button" className=" opacity-0">
            <InstallButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection1;
