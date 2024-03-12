import Button from "../components/common/Button"

export default function MainPage() {

  const handleClick = () => {
    alert('click');
  };

  return (<>
    <p>MainPage</p>
    <Button text="BUTTON" handleClick={handleClick} />
  </>
  )
}
