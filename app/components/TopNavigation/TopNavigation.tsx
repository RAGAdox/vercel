import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import "./TopNavigation.scss";

interface ITopNavigationLink {
  to: string;
  display: string;
}

const topNavigationLinks: ITopNavigationLink[] = [
  {
    to: "#",
    display: "Home",
  },
  {
    to: "#about",
    display: "About",
  },
  {
    to: "#skills",
    display: "Skills",
  },
  {
    to: "#experiences",
    display: "Experiences",
  },
];

const TopNavigation = ({
  refArray,
  currentIndex,
}: {
  refArray: React.RefObject<HTMLElement>[];
  currentIndex: number;
}) => {
  const [scope, animate] = useAnimate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const handleScrollToNavigate = (index: number) => {
    refArray[index].current?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
    window.location.hash = "";
  };

  const handleMobileNavAnimation = async () => {
    if (isOpen) {
      await animate(
        ".nav-overlay",
        {
          display: ["none", "grid"],
        },
        { duration: 0 }
      );
    }
    await animate(
      ".nav-overlay",
      {
        opacity: isOpen ? [0, 1] : [1, 0],
        y: isOpen ? [0, "auto"] : ["auto", 0],
        height: isOpen ? [0, "100svh"] : ["100svh", 0],
        borderBottomLeftRadius: isOpen ? ["9999px", 0] : [0, "9999px"],
        borderBottomRightRadius: isOpen ? ["9999px", 0] : [0, "9999px"],
      },
      { duration: 0.2 }
    );
    // await animate(
    //   ".nav-mobile-item",
    //   {
    //     opacity: isOpen ? [0, 1] : [1, 0],
    //     scale: isOpen ? [0, 1] : [1, 0],
    //     display: isOpen ? ["none", "inline"] : ["inline", "none"],
    //   },
    //   { duration: 0.1, delay: 0.1 }
    // );

    if (!isOpen) {
      await animate(
        ".nav-overlay",
        {
          display: ["grid", "none"],
        },
        { duration: 0 }
      );
    }
  };

  useEffect(() => {
    if (!isInitial) {
      handleMobileNavAnimation();
    }
    setIsInitial(false);
  }, [isOpen]);

  return (
    <div className="main-nav-container">
      <nav className="nav-container">
        {topNavigationLinks.map((navItem, index) => (
          <button
            key={index}
            onClick={() => {
              handleScrollToNavigate(index);
            }}
            className={`nav-item ${
              currentIndex === index ? "nav-item-active" : ""
            }`}
          >
            {navItem.display}
          </button>
        ))}
      </nav>
      <nav className="relative block md:hidden">
        <button
          className="fixed z-50 right-4 top-4"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FontAwesomeIcon icon={isOpen ? faX : faBars} size="lg" />
        </button>
        <div ref={scope}>
          {
            <div className="absolute hidden inset-0 z-40  backdrop-blur-3xl content-center justify-center gap-y-2 nav-overlay">
              {topNavigationLinks.map((navItem, index) => (
                <button
                  key={index}
                  className={`nav-item nav-mobile-item ${
                    currentIndex === index ? "nav-item-active" : ""
                  }`}
                  onClick={() => {
                    handleScrollToNavigate(index);
                    setIsOpen(false);
                  }}
                >
                  {navItem.display}
                </button>
              ))}
            </div>
          }
        </div>
      </nav>
    </div>
  );
};

export default TopNavigation;
