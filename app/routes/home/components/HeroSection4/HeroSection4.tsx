import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useAnimate, useInView } from "motion/react";
import { useEffect, useState } from "react";

const experiences: ExperienceProps[] = [
  {
    startYear: 2024,
    endYear: "Present",
    organization: "IBM SOFTWARE LABS",
    role: "Full Stack Developer",
    responsibilities: [
      "Developed and optimized backend services for RedHat Marketplace, focusing on Account Management and Product Discovery functionalities.",
      "Executed component migration strategy from previous versions into CarbonV11.",
      "Managed production systems, troubleshooted issues, and developed automation to improve operational efficiency and reduce manual intervention.",
    ],
    technologies: ["NodeJS", "React", "CarbonV11", "Docker", "Kubernetes"],
  },
  {
    startYear: 2021,
    endYear: 2023,
    organization: "Infosys Pvt. Ltd.",
    role: "Specialist Programmer",
    responsibilities: [
      "Worked on multiple Enterprise Web Applications related to Auditing and Financial Management.",
      "Helped in performance optimization while dealing with larger datasets in client application.",
      "Created a service that would generate presentations based on Audit Results and Financial Data provided.",
      "Worked with a world-leading consumer health company to launch new products and integrate them with third-party sellers.",
      "Architected various features and Proof of Concepts including Refresh Token Rotation, Real-Time User recommendation, and GraphQL integration.",
      "Supported the kick-start of a new customer platform targeted towards women’s health.",
    ],
    technologies: ["React", "GraphQL", "NodeJS", "Redis", "PostgreSQL"],
  },
  {
    startYear: 2019,
    endYear: 2021,
    organization: "Tata Consultancy Services Pvt. Ltd.",
    role: "System Engineer",
    responsibilities: [
      "Worked with a leading German Bank on Identity and Access Management Application.",
      "Created a Windows application to archive production data into secure vaults and can be retrieved thereafter for auditing.",
      "Delivered timely diagnosis and resolution of issues while implementing preventative measures to enhance system stability.",
      "Created a Web Application to help facilitate regression testing.",
    ],
    technologies: ["React", "NodeJS", "Windows", "PostgreSQL", "Spring Batch"],
  },
];
const HeroSection4 = ({
  containerRef,
  setInView,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  setInView: () => void;
}) => {
  const [scope, animate] = useAnimate();

  const [currentExpIndex, setCurrentExpIndex] = useState<number>();
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  const handleClickOutside = (event: any) => {
    if (currentExpIndex !== undefined) {
      handleExpClick(event, currentExpIndex);
    }
  };

  const animationOnPage = async () => {
    await animate(
      scope.current,
      { opacity: isInView ? [0, 1] : [1, 0] },
      { duration: 0.5 }
    );
  };

  const handleExpClick = async (event: any, index: number) => {
    event.stopPropagation();
    if (currentExpIndex === index) {
      setCurrentExpIndex(undefined);
    } else {
      setCurrentExpIndex(index);
    }
  };

  useEffect(() => {
    if (isInView) {
      setInView();
    }
    if (!isInView) {
      setCurrentExpIndex(undefined);
    }
    animationOnPage();
  }, [isInView]);

  return (
    <div ref={containerRef} onClick={handleClickOutside}>
      <section
        id="contact"
        ref={scope}
        className="min-h-svh md:h-svh md:snap-start flex items-center justify-center px-2 w-full md:1/2 lg:w-2/3 mx-auto "
      >
        <div className="grid grid-flow-row gap-4 w-full">
          {experiences.map((experience, experienceIndex) => {
            const {
              organization,
              role,
              startYear,
              endYear,
              responsibilities,
              technologies,
            } = experience;
            if (
              experienceIndex === currentExpIndex ||
              currentExpIndex === undefined
            )
              return (
                <div
                  key={experienceIndex}
                  className="border rounded-md flex flex-col gap-2 p-2 cursor-pointer"
                  onClick={(event) => {
                    handleExpClick(event, experienceIndex);
                  }}
                >
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <p className="text-2xl">{organization}</p>
                      <p className="text-lg">
                        {startYear} - {endYear}
                      </p>
                    </div>
                    <p className="text-lg">{role}</p>
                  </div>
                  <div>
                    <button className="flex flex-row gap-2 items-center hover:underline">
                      <p className="text-lg text-left">Responsibilities</p>
                      <motion.span
                        animate={{
                          transform:
                            currentExpIndex === experienceIndex
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      <ul className="list-disc list-inside">
                        {currentExpIndex === experienceIndex &&
                          responsibilities.map(
                            (responsibility, responsibilityIndex) => (
                              <motion.li
                                key={responsibilityIndex}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: responsibilityIndex / 20,
                                  ease: "easeInOut",
                                }}
                              >
                                {responsibility}
                              </motion.li>
                            )
                          )}
                      </ul>
                    </AnimatePresence>
                  </div>
                  <div>
                    <button className="flex flex-row gap-2 items-center hover:underline">
                      <p className="text-lg">Technologies Used</p>
                      <motion.span
                        animate={{
                          transform:
                            currentExpIndex === experienceIndex
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="inline-block"
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      <ul className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                        {currentExpIndex === experienceIndex &&
                          technologies.map((tech, techIndex) => (
                            <motion.li
                              key={techIndex}
                              initial={{ scale: 0, opacity: 0, height: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{ scale: 0, opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: techIndex / 20,
                                ease: "easeInOut",
                              }}
                              className="bg-black px-2 rounded-md"
                            >
                              {tech}
                            </motion.li>
                          ))}
                      </ul>
                    </AnimatePresence>
                  </div>
                </div>
              );
          })}
        </div>
      </section>
    </div>
  );
};

export default HeroSection4;
