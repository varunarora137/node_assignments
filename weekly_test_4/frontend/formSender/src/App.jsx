import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./App.css";

const options = {
  position: "top-center",
  autoClose: 1500,
  closeOnClick: true,
  draggable: true,
  theme: "light",
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const validateEmail = (email) => {
    const match = /^[a-zA-Z0-9\.\_]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}$/;
    const lowerCaseEmail = email.toLowerCase();
    return match.test(lowerCaseEmail);
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || gender === "") {
      toast.error("Please Fill All The Details", options);
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid Email Format.Please Enter A Valid Email", options);
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        `${
          password.length < 8
            ? "Password Needs To Be Atleast 8 Characters Long"
            : "Password Should Contain At Least One Special Character, One Uppercase Letter, And One Numeric Character."
        }`,
        options
      );

      return;
    }
    sendData();
  }

  async function sendData() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/postUserData`,
        {
          name,
          email,
          password,
          gender,
        }
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
      setGender("");
      toast.success("Data Sent Successfully", options);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Enter Details</h1>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="" disabled>
            Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
