import { useState } from "react";
import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react";
import FullBean from "../../assets/icons/full-coffee-bean.svg?react";

interface BeanIconProps {
  onClick: () => void;
  onMouseEnter: () => void;
  type: "empty" | "full";
}

interface ReviewRatingProps {
  onRatingChange: (value: number) => void;
}

const BeanIcon = ({ onClick, onMouseEnter, type }: BeanIconProps) => {
  const Icon = type === "full" ? FullBean : EmptyBean;
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="w-[15lvw] h-[15lvw] max-w-[60px] max-h-[60px]"
    >
      <Icon className="w-full h-full" />
    </button>
  );
};

export default function ReviewRating({ onRatingChange }: ReviewRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleClick = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  const renderBeans = () => {
    const beans = [];
    for (let i = 1; i <= 5; i++) {
      beans.push(
        <BeanIcon
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          type={hoverRating >= i || rating >= i ? "full" : "empty"}
        />
      );
    }
    return beans;
  };

  return (
    <div
      className="flex flex-row items-center mx-auto max-w-2xl"
      onMouseLeave={() => setHoverRating(rating)}
    >
      {renderBeans()}
    </div>
  );
}