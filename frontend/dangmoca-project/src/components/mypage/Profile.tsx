import { useNavigate } from "react-router-dom";
import CoffeeBean from "../../assets/icons/coffeebean.svg?react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useState } from 'react';
import { UserInfo } from "../../types/datatype";
import RightArrowIcon from '../../assets/icons/rightarrow.svg?react';
import dummyUserImg from '/src/assets/icons/dummyUserImg.png';

const Profile = (user: UserInfo | null) => {
  const navigate = useNavigate();

  if (user === null) {
    console.log("사용자 정보가 없습니다.");
    return;
  }

  // // 태그 크기를 랜덤으로 설정하는 함수
  // // 초기 워드클라우드
  // const randomFontSize = () => {
  //   const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
  //   return sizes[Math.floor(Math.random() * sizes.length)];
  // };

  const [words, setWords] = useState([
    {
      text: "told",
      value: 64,
    },
    {
      text: "mistake",
      value: 11,
    },
    {
      text: "cake",
      value: 45,
    },{
      text: "coffee",
      value: 29,
    },{
      text: "cafe",
      value: 50,
    },{
      text: "book",
      value: 34,
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options:any = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  const handleCloudClick = () => {
    setWords([
      ...words,
    ]);
  };

  return (
    <div className="flex flex-col  p-4">
      <div className="flex flex-row justify-center gap-4 lg:gap-20 min-w-full my-10">
        <img

          src={user.profileImageUrl || dummyUserImg}
          alt="프로필 이미지"
          className="w-24 h-24 lg:w-48 lg:h-48 rounded-full object-contain border-2 border-primary"
        />
        <div className="mx-6">
          <div>
            <CoffeeBean className="w-6 h-6 inline-block fill-primary" />
            <span className="text-sm lg:text-md">{user.title}</span>
            <h1 className="text-xl lg:text-2xl">{user.nickname}님</h1>
            <span className="text-sm lg:text-md">{user.mileage} 마일리지{" "} </span>
          </div>
          <div className="flex flex-row justify-around text-sm lg:text-base">
            {/* 내역 확인? */}
            {/* <button
              className="ml-2 text-xs lg:text-sm hover:animate-pulse"
              onClick={() => navigate("/mileage")}
            >
              내역 확인
              <RightArrow id="svgIcon" />
            </button> */}
          </div>
          <button
            className="whitespace-nowrap text-sm lg:text-md p-0 mt-2 align-middle"
            onClick={() => navigate("/myinfo", {'state' : user})}
          >정보 수정 <RightArrowIcon className="w-3 h-3 inline-block"/></button>
        </div>
      </div>

      <p className="mt-4 text-xl" id="test">
        {user.nickname} 님의 #카페구름
      </p>

      {/* 구 워드 클라우드 */}
      {/* <div className="mx-auto p-6 w-[80lvw] h-[40lvw] lg:w-[40lvw] lg:h-[20lvw] border-primary border-2 rounded-2xl shadow-lg whitespace-nowrap">
        {user.preferenceTag.map((tag, index) => (
          <span key={index} className={`${randomFontSize()} mr-2`}>
            {tag}
          </span>
        ))}
      </div> */}

      <div onClick={handleCloudClick} className="mx-auto p-6 w-[80lvw] h-[40lvw] lg:w-[40lvw] lg:h-[20lvw] border-primary border-2 rounded-2xl shadow-lg whitespace-nowrap cursor-pointer">
        <ReactWordcloud options={options} words={words} />
      </div>
    </div>
  );
};

export default Profile;
