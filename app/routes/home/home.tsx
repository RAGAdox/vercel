import { useRef, useState } from "react";
import type { Route } from "./+types/home";

import { Background } from "../../components/Background";
import { TopNavigation } from "../../components/TopNavigation";
import { HeroSection1 } from "./components/HeroSection1";
import HeroSection2 from "./components/HeroSection2/HeroSection2";
import { HeroSection3 } from "./components/HeroSection3";
import HeroSection4 from "./components/HeroSection4/HeroSection4";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "RAGAdox" },
    { name: "description", content: "Portfolio website for RAGAdox" },
  ];
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const refArray = Array.from(
    { length: 4 },
    () => useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <Background currentIndex={currentIndex} />
      <TopNavigation refArray={refArray} currentIndex={currentIndex} />
      <div
        ref={containerRef}
        className="relative h-svh overflow-y-scroll snap-y snap-mandatory
        "
      >
        <HeroSection1
          containerRef={refArray[0]}
          setInView={() => setCurrentIndex(0)}
        />
        <HeroSection2
          containerRef={refArray[1]}
          setInView={() => setCurrentIndex(1)}
        />
        <HeroSection3
          containerRef={refArray[2]}
          setInView={() => setCurrentIndex(2)}
        />
        <HeroSection4
          containerRef={refArray[3]}
          setInView={() => setCurrentIndex(3)}
        />
      </div>
    </>
  );
}
