import { useState, useEffect } from "react";
import UpArrow from "../../assets/icons/up-arrow.svg?react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <>
          <div
            className="fixed cursor-pointer bottom-0 left-0 ml-0 mb-20 py-2 px-4 rounded-full md:ml-[5lvw] lg:ml-[13lvw]"
            onClick={scrollToTop}
            style={{ transition: "opacity 0.5s" }}
          >
            <UpArrow className="w-12 h-12" />
          </div>
        </>
      )}
    </div>
  );
};

export default ScrollToTop;
