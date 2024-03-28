import { useState, useEffect } from "react";
import UpArrow from "../../assets/icons/up-arrow.svg?react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 사용자가 스크롤할 때마다 isVisible 상태를 업데이트합니다.
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        // 300px 이상 스크롤되었을 때 버튼을 표시합니다.
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 페이지를 최상단으로 스크롤하는 함수입니다.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤 효과를 적용합니다.
    });
  };

  return (
    <div>
      {isVisible && (
        <>
          <div
            className="fixed cursor-pointer bottom-0 left-0 ml-8 mb-20 py-2 px-4 rounded-full md:ml-80"
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
