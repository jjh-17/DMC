interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  handleClick: () => void;
}

function Button (ButtonProps: ButtonProps): React.ReactElement {
  return (
    <button
      className="bg-white rounded-md shadow-md font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white m-2 p-2 w-fit transition duration-400"
      onClick={ButtonProps.handleClick}
    >
      {ButtonProps.text}
    </button>
  );
};

export default Button;