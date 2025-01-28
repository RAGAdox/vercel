import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useAnimate, useInView } from "motion/react";
import { useEffect, useState } from "react";

const skills = {
  "programming languages": ["Typescript", "Java", "Python", "C/C++", "SQL"],
  "frontend development": [
    "React.js",
    "Next.js",
    "React-Router",
    "SCSS",
    "TailwindCSS",
    "Bootstrap",
    "Redux",
    "Zustand",
  ],
  "backend development": [
    "Node.js",
    "Express.js",
    "Koa.js",
    "RESTful APIs",
    "Spring Boot",
    "GraohQL",
  ],
  Databases: ["PostgresSQL", "MongoDB", "Redis", "MySQL", "SQLite"],
  "Cloud and DevOps": [
    "Microsoft Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Nginx",
    "HAProxy",
    "Github Actions",
    "Travis CI",
  ],
  "Tools and Others": ["Git", "Jira", "Agile", "System Design", "Testing"],
};

const HeroSection3 = ({
  containerRef,
  setInView,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  setInView: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(containerRef, { amount: 0.5, once: false });
  const [currentIndex, setCurrentIndex] = useState<number>();

  const handlePageAnimations = async () => {
    await animate(
      scope.current,
      { opacity: isInView ? [0, 1] : [1, 0] },
      { duration: 0.5 }
    );
  };

  useEffect(() => {
    if (isInView) {
      setInView();
    }
    if (!isInView) {
      setCurrentIndex(undefined);
    }
    handlePageAnimations();
  }, [isInView]);

  const handleSkillContainerClick = async (index: number) => {
    if (currentIndex === index) {
      setCurrentIndex(undefined);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div ref={containerRef}>
      <section
        ref={scope}
        className="min-h-svh md:h-svh md:snap-start flex items-center px-2 w-full md:1/2 lg:w-2/3 mx-auto"
      >
        <div id="skills-div" className="w-full">
          <p className="text-2xl">Skills</p>
          <div className="grid gap-2">
            {Object.entries(skills).map(
              ([category, categorySkills], categoryIndex) => {
                return (
                  <div
                    id={`skill-container-${categoryIndex}`}
                    key={categoryIndex}
                    className=""
                  >
                    <button
                      className="flex flex-row gap-x-2 items-center "
                      onClick={() => {
                        handleSkillContainerClick(categoryIndex);
                      }}
                    >
                      <p className="capitalize text-lg hover:underline">
                        {category}
                      </p>
                      <motion.span
                        animate={{
                          transform:
                            currentIndex === categoryIndex
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                        transition={{ duration: 0.2 }}
                        className=" inline-block"
                      >
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-none xl:grid-flow-col gap-4">
                        {currentIndex === categoryIndex &&
                          categorySkills.map((skill, skillIndex) => (
                            <motion.button
                              key={skillIndex}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className={`skill-box border rounded-lg p-4 text-nowrap`}
                              transition={{
                                duration: 0.3,
                                delay: skillIndex / 20,
                                ease: "easeInOut",
                              }}
                            >
                              {skill}
                            </motion.button>
                          ))}
                      </div>
                    </AnimatePresence>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection3;
