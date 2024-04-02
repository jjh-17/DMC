import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import { useLocation } from "react-router-dom";
import { UserInfo } from "../../types/datatype";

export default function MyInfo() {
  let user: UserInfo = {
    nickname: '',
    memberSeq: 0,
    deleted: false,
    mileage: 0,
    preferenceTag: [""],
    profileImageUrl: "",
    title: "",
    titleList: [""],
  }
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  user = state;
  const nickNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(user.nickname);
  }, [user.nickname]);

  const handleFocus = () => {
    if (inputValue === user.nickname) {
      setInputValue("");
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setInputValue(user.nickname);
    }
  };


  const handleUpdateClick = () => {
    if (nickNameRef.current) {
      const updatedNickName = nickNameRef.current.value;
      console.log("업데이트 될 닉네임:", updatedNickName);
    } else {
      console.log("닉네임값이 지정되지 않았습니다.");
    }
  };

  return (
    <div className="flex flex-col items-start w-[80lvw] md:w-[60lvw] lg:w-[40lvw] max-w-4xl mt-5 p-4 space-y-4">
      <div className="whitespace-nowrap font-light">프로필 사진</div>
      <div className="mx-auto">
      <div className="w-full md:w-[30lvw] lg:w-[20lvw]">
          {/* <img
            src={user.profileImageUrl}
            alt="프로필 이미지"
            className="w-[40lvw] h-[40lvw] md:w-[30lvw] md:h-[30lvw] lg:w-[20lvw] lg:h-[20lvw] p-2 m-2 rounded-full object-contain border-2 border-primary "
          /> */}
        </div>
      </div>

      <p className="text-left w-full">닉네임</p>
      <input
        className="w-fit border-2 border-gray-300 rounded-lg p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button className="inline-block text-sm ml-2">중복확인</button>


      <div className="flex flex-row items-center gap-4 md:gap-12 lg:gap-20">
        <p className="whitespace-pre-wrap">대표 칭호 선택하기</p>
        <select className="border-2 border-primary p-2">
          {
            user.titleList.map((title, index) => {
              return (
                <option value={title} key={index} className="font-light">
                  {title}
                </option>
              )
            })
          }
        </select>
      </div>

      <Button
        label="수정하기"
        onClick={handleUpdateClick}
        addClass="mx-auto"
      />
    </div>
  );
}
