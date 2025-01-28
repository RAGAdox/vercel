import { useInView, type UseInViewOptions } from "motion/react";
import { useEffect, type RefObject } from "react";

const useSetInView = (
  ref: RefObject<HTMLDivElement | HTMLElement>,
  callback: () => void,
  options: UseInViewOptions = { amount: 0.5, once: false }
) => {
  const isInView = useInView(ref, options);

  useEffect(() => {
    if (isInView) {
      callback();
    }
  }, [isInView]);
};

export default useSetInView;
