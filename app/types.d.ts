interface BoundingPoints {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface Coordinate {
  x: number;
  y: number;
}

interface ExperienceProps {
  imagePath?: string;
  startYear: number;
  endYear: number | "Present";
  organization: string;
  role?: string;
  responsibilities: string[];
  technologies: string[];
}

interface ProjectProps {
  name: string;
  active?: boolean;
  description?: string;
  technologies: string[];
}
