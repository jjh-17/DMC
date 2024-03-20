import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import CoffeeBean from '../../assets/icons/coffeebean.svg?react'
import RightArrow from '../../assets/icons/rightarrow.svg?react'

interface User {
  memberSeq: number;
  profileImage: string;
  nickName: string;
  title: string;
  tag: string[];
}

const Profile = (user: User) => {
  const navigate = useNavigate();

  // 태그 크기를 랜덤으로 설정하는 함수
  const randomFontSize = () => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className="flex flex-col  p-4">
      <div className="flex flex-row justify-center gap-4 lg:gap-20 min-w-full my-10">
        <img
          src={user.profileImage}
          alt="프로필 이미지"
          className="w-24 h-24 lg:w-48 lg:h-48 rounded-full object-contain border-2 border-primary"
        />
        <div className="mx-6">
          <div className="text-lg lg:text-2xl"><CoffeeBean className="w-6 h-6 inline-block fill-primary" /><span>{user.title}</span></div>
          <div className="flex flex-row justify-around text-sm lg:text-base">{484} 마일리지 <button className="ml-2 text-xs lg:text-sm hover:animate-pulse" onClick={() => navigate('/mileage')}>내역 확인<RightArrow id='svgIcon'
          /></button></div>
          <Button
            label="회원 정보 수정"
            addClass="whitespace-nowrap text-xs mt-5"
            onClick={() => navigate("/myinfo")}
          />
        </div>
      </div>

      <p className="mt-4 text-xl" id="test">{user.nickName} 님의 #카페구름</p>

      {/* 워드 클라우드 */}
      <div className="mx-auto p-6 w-[80lvw] h-[40lvw] lg:w-[40lvw] lg:h-[20lvw] border-primary border-2 rounded-2xl shadow-lg whitespace-nowrap">
        {user.tag.map((tag, index) => (
          <span key={index} className={`${randomFontSize()} mr-2`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Profile;
