import { forwardRef } from "react";

interface HomeSectionProps {
  children?: React.ReactNode;
  id: string;
  className?: string;
}

const HomeSection = forwardRef<HTMLElement, HomeSectionProps>(
  ({ children, id, className = "" }, ref) => {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }
);

export default HomeSection;
