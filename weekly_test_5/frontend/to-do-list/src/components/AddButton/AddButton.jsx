import { useEffect, useState } from "react";
import "./AddButton.css";
import Form from "../Form/Form";

function AddButton() {
  const [isClicked, setIsClicked] = useState(false);
  const handleCloseButton = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isClicked]);

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
