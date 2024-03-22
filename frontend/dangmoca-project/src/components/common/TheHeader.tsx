import { useEffect, useState } from "react";
import PrevArrow from "../../assets/icons/prevarrow.svg?react";
import { useNavigate } from "react-router-dom";

const TheHeader = ({ textHeader }: { textHeader: string }) => {
  const [headerClass, setHeaderClass] = useState("fixed top-3 w-full bg-transparent");

  useEffect(() => {
    const handleScroll = () => {
      const limitHeight = 100;
      const newHeaderClass =
        window.scrollY > limitHeight
          ? "pointer-events-none opacity-0 duration-500"
          : "opacity-100 duration-500";

      setHeaderClass(headerClass + newHeaderClass);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <header className={headerClass}>
      <button onClick={() => navigate(-1)} className="absolute left-2 top-1">
        <PrevArrow className="m-1 p-[2px] w-7 h-7" />
      </button>
      <h1 id="test" className="text-center mx-auto mt-2 text-4xl">
        {textHeader}
      </h1>
    </header>
  );
};

export default TheHeader;
