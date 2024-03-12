interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  handleClick: () => void;
}

function Button (ButtonProps: ButtonProps): React.ReactElement {
  return (
    <button
<<<<<<< HEAD
      className="bg-white rounded-md shadow-md font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white m-2 p-2"
=======
      className="bg-white rounded-md shadow-md font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white m-2 p-2 w-fit"
>>>>>>> 96f04e14af2e0c01c642e11d9ef0e2f206ec69db
      onClick={ButtonProps.handleClick}
    >
      {ButtonProps.text}
    </button>
  );
};

export default Button;