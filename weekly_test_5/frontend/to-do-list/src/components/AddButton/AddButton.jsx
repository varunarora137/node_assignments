import { useState } from "react";
import "./AddButton.css";
import Form from "../Form/Form";

function AddButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleCloseButton = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className="AddButton" onClick={handleCloseButton}>
        ➕
      </div>
      {isClicked && <Form handleCloseButton={handleCloseButton} />}
    </>
  );
}

export default AddButton;
