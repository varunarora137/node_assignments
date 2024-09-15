import "./Form.css";

function Form({ handleCloseButton }) {
  return (
    <div className="FormContainer">
      <div className="Form">
        <button className="close" onClick={handleCloseButton}>
          ❌
        </button>
      </div>
    </div>
  );
}

export default Form;
