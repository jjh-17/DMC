import UpArrow from "../../assets/icons/up-arrow.svg?react";

const ScrollToTop = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <>
        <div
          className="fixed cursor-pointer bottom-0 right-0 ml-0 mb-20 py-2 px-4 rounded-full md:mr-[20lvw] lg:mr-[20lvw]"
          onClick={scrollToTop}
          style={{ transition: "opacity 0.5s" }}
        >
          <UpArrow className="w-14 h-14 fill-white" />
        </div>
      </>
    </div>
  );
};

export default ScrollToTop;
