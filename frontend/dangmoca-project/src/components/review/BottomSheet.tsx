import { useMemo, useState, ReactNode } from "react";
import { useDragControls, motion } from "framer-motion";
import useMeasure from "react-use-measure";

// interface BottomSheetProps {
//   prop: ReactNode;
//   viewpoint: number
// }

const BottomSheet = ({ prop }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [contentRef, contentBounds] = useMeasure();
  const dragControls = useDragControls();

  const animateState = isOpened ? "opened" : "closed";

  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );

  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-screen bg-black"
        initial={false}
        animate={animateState}
        variants={{
          opened: {
            backdropFilter: "blur(1px)",
            pointerEvents: "all",
            opacity: 0.7,
          },
          closed: {
            backdropFilter: "blur(0px)",
            pointerEvents: "none",
            opacity: 0,
          },
        }}
        onTap={() => setIsOpened(false)}
      />

      <motion.div
        className="absolute top-0 left-0 w-full bg-white shadow-lg rounded-t-3xl p-3"
        style={{ height: "auto" }}
        initial="closed"
        animate={animateState}
        variants={{
          opened: { top: `calc(100vh - ${expandedHeight}px)` },
          closed: { top: `calc(100vh + 450px)` },
          // closed: { top: `calc(100vh - 120px)` },
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          const offsetThreshold = 150;
          const deltaThreshold = 5;
          const isOverThreshold =
            Math.abs(info.offset.y) > offsetThreshold ||
            Math.abs(info.delta.y) > deltaThreshold;
          if (!isOverThreshold) return;
          setIsOpened(info.offset.y < 0);
        }}
      >
        <div
          className="h-12 cursor-grab select-none text-center bg-gray"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <button className="w-14 h-2 bg-gray-300 m-auto rounded-full">
            ㅡ
          </button>
        </div>
        {isOpened && (
          <div
            className="w-full text-black p-6"
            style={{ height: "auto" }}
            ref={contentRef}
          >
            {prop}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default BottomSheet;
