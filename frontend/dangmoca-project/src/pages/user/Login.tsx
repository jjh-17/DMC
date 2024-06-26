import Logo from '../../assets/icons/logo1.svg?react'
import { motion } from 'framer-motion';
import NaverIconUrl from '../../assets/icons/naver.png'
import KakaoIconUrl from '../../assets/icons/kakao.png'

export default function Login() {
  const naverURL = import.meta.env.VITE_NAVER_LOGIN_URL;
  const kakaoURL = import.meta.env.VITE_KAKAO_LOGIN_URL;
  const linkClassName = "flex flex-row gap-4 p-2 items-center rounded-md shadow-lg mt-4 text-lg lg:text-2xl"

  return (
    <div className="flex flex-col mx-auto w-fit">
      <Logo className='w-full mb-12' />
      <motion.div whileHover={{scale:1.1}}>
        <a href={naverURL}
          className={linkClassName}
        >
          <img
            src={NaverIconUrl}
            alt="Naver 로그인"
            className='w-12 h-12 md:w-20 md:h-20'
          />
          <p id="test">네이버로 시작하기</p>
        </a>
      </motion.div>
      <motion.div whileHover={{scale:1.1}}>
        <a href={kakaoURL}
          className={linkClassName}
        >
          <img
            src={KakaoIconUrl}
            alt="Kakao 로그인"
            className='w-12 h-12 md:w-20 md:h-20'
          />
          <p id="test">카카오로 시작하기</p>
        </a>
      </motion.div>
    </div>
  );
}
