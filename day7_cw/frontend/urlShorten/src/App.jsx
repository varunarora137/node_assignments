import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [modifiedURL, setModifiedURL] = useState("");

  useEffect(() => {
    if (url === "") setModifiedURL("");
  }, [url]);
  const handleSubmit = async () => {
    try {
      let fetchedID = await axios.post("http://localhost:5000/api/url/", {
        originalURL: url,
      });
      if (fetchedID.data.message) {
        throw new Error(fetchedID.data.message);
      }
      let fetchedLink = fetchedID.data.link;
      setModifiedURL(fetchedLink);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="container">
      <h1>URL SHORTENER</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {modifiedURL && (
        <div className="output">
          <input type="text" value={modifiedURL} disabled />
          <button
            className="output-buttons"
            onClick={() => navigator.clipboard.writeText(modifiedURL)}
          >
            Copy Short Link
          </button>
        </div>
      )}
      <button onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
}

export default App;
