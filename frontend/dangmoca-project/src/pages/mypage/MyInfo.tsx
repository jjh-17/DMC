import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";

export default function MyInfo() {
  const user = {
    memberSeq: 1,
    profileImage: "src/assets/icons/dummyUserImg.png",
    nickName: "DMC",
    title: "커피에 미친 사람",
    tag: ["#조용한 카페", "#분위기 좋은 카페"],
  };

  const [inputValue, setInputValue] = useState("");

  const nickNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(user.nickName);
  }, [user.nickName]);

  const handleFocus = () => {
    if (inputValue === user.nickName) {
      setInputValue("");
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setInputValue(user.nickName);
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
    <div className="flex flex-col items-start w-full max-w-4xl mx-auto p-4 space-y-4">
      <p className="text-left w-full">내 프로필 사진</p>
      <div className="w-full">
        <div className="w-40 h-40 mx-auto bg-brown-500 rounded-full overflow-hidden">
          <img
            src={user.profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className="text-left w-full">닉네임</p>
      <input
        className="w-full border-2 border-gray-300 rounded-lg p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <p className="text-left w-full">대표 칭호 선택하기</p>
      <select className="w-full border-2 border-gray-300 rounded-lg p-2">
        <option>{user.title}</option>
      </select>

      <Button
        label="수정하기"
        onClick={handleUpdateClick}
        addClass="mx-auto"
      />
    </div>
  );
}
