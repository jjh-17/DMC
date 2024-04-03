import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import { useLocation } from "react-router-dom";
import { memberAPI } from "../../api/memberAPI";
import dummyUserImg from "../../assets/icons/dummyUserImg.png";
import Swal from "sweetalert2";

export default function MyInfo() {
  const { state: user } = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.profileImageUrl
  );
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [able, setAble] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(user.nickname);
    setPreviewUrl(user.profileImageUrl);
  }, [user.nickname, user.profileImageUrl]);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const checkMyNickName = async () => {
    try {
      const response = await memberAPI.checkMyNickname(inputValue);
      setAble(true);
      Swal.fire({
        title: "닉네임 사용 가능합니다.",
        icon: "success",
      });

      if (!response.data.success) {
        Swal.fire({
          title: "중복 닉네임이 존재합니다.",
          icon: "info",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(event.target.value);
  };

  const handleUpdateClick = async () => {
    const isNickNameChanged = inputValue !== user.nickname;
    if (isNickNameChanged && !able) {
      Swal.fire({
        title: "중복 닉네임을 체크해주세요.",
        icon: "info",
      });
      return;
    }

    if (inputValue.trim() != "") {
      const updatedNickName = inputValue;

      try {
        if (isNickNameChanged) {
          await memberAPI.modifyMyNickname(
            updatedNickName,
            able
          );
        }

        if (selectedFile) {
          const formData = new FormData();
          formData.append("profileImage", selectedFile);
          await memberAPI.changeMyProfilePic(formData);
        }

        if (selectedTitle && selectedTitle !== user.title) {
          const titleResponse = await memberAPI.changeMyTitle(selectedTitle);
        }

        Swal.fire({
          title: "수정 성공!.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "수정 실패!.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "닉네임이 지정되지 않았습니다.",
        icon: "info",
      });
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);

      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col w-[80lvw] md:w-[60lvw] lg:w-[40lvw] max-w-4xl mt-5 p-4 mx-auto space-y-4">
      <div className="whitespace-nowrap font-light">프로필 사진</div>
      <div className="mx-auto">
        <div
          className="w-full md:w-[30lvw] lg:w-[20lvw]"
          onClick={handleImageClick}
        >
          <img
            src={previewUrl || dummyUserImg}
            alt="프로필 이미지"
            className="w-[40lvw] h-[40lvw] md:w-[30lvw] md:h-[30lvw] lg:w-[20lvw] lg:h-[20lvw] p-2 m-2 rounded-full object-contain border-2 border-primary "
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
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
      <button
        onClick={checkMyNickName}
        className="inline-block text-sm text-left ml-2"
      >
        중복확인
      </button>

      <div className="flex flex-row items-center gap-4 md:gap-12 lg:gap-20">
        <p className="whitespace-pre-wrap">대표 칭호 선택하기</p>
        <select
          className="border-2 border-primary p-2"
          onChange={handleTitleChange}
        >
          <option value="" className="font-light"> 선택 없음</option>
          {user.titleList.map((title: any, index: any) => {
            return (
              <option value={title} key={index} className="font-light">
                {title}
              </option>
            );
          })}
        </select>
      </div>

      <Button label="수정하기" onClick={handleUpdateClick} addClass="mx-auto" />
    </div>
  );
}
