interface ButtonProps {
  label: string; // 버튼에 표시될 텍스트
  onClick: () => void; // 클릭 시 실행될 함수
  addClass?: string; // 추가적인 스타일링을 위한 클래스 이름
}

const Button = (buttonProps: ButtonProps) => {
  return (
    <button
      className={`bg-white rounded-md shadow-md border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white m-2 p-2 w-fit transition duration-400 ${buttonProps.addClass}`}
      onClick={buttonProps.onClick}
    >
      {buttonProps.label}
    </button>
  );
};

export default Button;