import { useState } from "react";
import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react";
import FullBean from "../../assets/icons/full-coffee-bean.svg?react";

interface BeanIconProps {
  onClick: () => void;
  onMouseEnter: () => void;
  type: 'empty' | 'full';
}

const BeanIcon = ({ onClick, onMouseEnter, type } : BeanIconProps) => {
  const Icon = type === 'full' ? FullBean : EmptyBean;
  return (
    <button onClick={onClick} onMouseEnter={onMouseEnter} className="w-8 h-8">
      <Icon className="w-full h-full" />
    </button>
  );
};

export default function ReviewRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleClick = (value: number) => {
    setRating(value);
  };

  const renderBeans = () => {
    const beans = [];
    for (let i = 1; i <= 5; i++) {
      beans.push(
        <BeanIcon
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          type={hoverRating >= i || rating >= i ? 'full' : 'empty'}
        />
      );
    }
    return beans;
  };

  return (
    <div className="flex flex-row space-x-1" onMouseLeave={() => setHoverRating(rating)}>
      {renderBeans()}
    </div>
  );
}

// import { useState } from "react";
// import EmptyBean from "../../assets/icons/empty-coffee-bean.svg?react"
// import HalfBean from "../../assets/icons/half-coffee-bean.svg?react";
// import FullBean from "../../assets/icons/full-coffee-bean.svg?react";

// interface BeanIconProps {
//   onClick: () => void;
//   onMouseEnter: () => void;
//   type: 'empty' | 'half' | 'full';
// }

// const BeanIcon: React.FC<BeanIconProps> = ({ onClick, onMouseEnter, type }) => {
//   const Icon = type === 'full' ? FullBean : type === 'half' ? HalfBean : EmptyBean;
//   return (
//     <button onClick={onClick} onMouseEnter={onMouseEnter} className="w-8 h-8">
//       <Icon className="w-full h-full" />
//     </button>
//   );
// };

// export default function ReviewRating() {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);

//   const handleMouseEnter = (value: number) => {
//     setHoverRating(value);
//   };

//   const handleClick = (value: number) => {
//     setRating(value);
//   };

//   const renderBeans = () => {
//     const beans = [];
//     for (let i = 1; i <= 5; i++) {
//       beans.push(
//         <div key={i} className="flex flex-row">
//           <BeanIcon
//             onClick={() => handleClick(i - 0.5)}
//             onMouseEnter={() => handleMouseEnter(i - 0.5)}
//             type={hoverRating >= i - 0.5 || rating >= i - 0.5 ? 'half' : 'empty'}
//           />
//           <BeanIcon
//             onClick={() => handleClick(i)}
//             onMouseEnter={() => handleMouseEnter(i)}
//             type={hoverRating >= i || rating >= i ? 'full' : 'empty'}
//           />
//         </div>
//       );
//     }
//     return beans;
//   };

//   return (
//     <div className="flex flex-row space-x-1" onMouseLeave={() => setHoverRating(rating)}>
//       {renderBeans()}
//     </div>
//   );
// }
