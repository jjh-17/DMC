interface User {
  memberSeq: number;
  profileImage: string;
  nicName: string;
  title: string;
  tag: string[];
}

const Profile = (user: User) => {
  // 태그 크기를 랜덤으로 설정하는 함수
  const randomFontSize = () => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className="flex flex-col items-start p-4">
      <div className="flex flex-row items-center">
        <div className="w-24 h-24 bg-brown-500 rounded-full overflow-hidden mr-4">
          <img
            src={user.profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-lg">{user.title}</div>
          <button className="px-4 py-2 mt-2 bg-blue-500 text-white rounded">
            회원 정보 수정
          </button>
        </div>
      </div>

      <p className="mt-4">{user.nicName} 님의 #카페구름</p>

      {/* 워드 클라우드 */}
      <div className="mt-4 p-4 w-full h-52 border-primary border-2 rounded-2xl md:w-1/2">
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
