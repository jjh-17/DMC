export default function Button({text, handleClick }) {
    return (
      <button className="bg-white rounded-md shadow-md font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-white m-2 p-2" onClick={handleClick}>
        {text}
      </button>
    );
  }