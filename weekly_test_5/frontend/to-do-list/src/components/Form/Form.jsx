import { useState } from "react";
import "./Form.css";
import axios from "axios";

function Form({ handleCloseButton }) {
  const [data, setData] = useState(null);
  const [createdBy, setCreatedBy] = useState("");
  const [reciever, setReciever] = useState("");
  const [task, setTask] = useState("");
  const [expiry, setExpiry] = useState({
    type: "never",
    day: "",
    month: "",
    hour: "",
    minute: "",
    year: "",
  });

  const [schedule, setSchedule] = useState({
    selectedOption: "mins",
    minutes: {
      minute: "",
    },
    hours: { hour: "", minute: "" },
    days: { day: "", hour: "", minute: "" },
    months: { date: "", month: "", hour: "", minute: "" },
  });

  const handleRadioChange = (e) => {
    setSchedule((prev) => ({
      ...prev,
      selectedOption: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const option = schedule.selectedOption;

    setSchedule((prev) => {
      if (option === "mins") {
        if (name === "minutes" && (value < 0 || value > 59)) {
          alert("Invalid Minute");
          return prev;
        }
        return { ...prev, minutes: { minute: value } };
      } else if (option === "hours") {
        if (name === "minute" && (value < 0 || value > 59)) {
          alert("Invalid Minute");
          return prev;
        }
        if (name === "hour" && (value < 0 || value > 23)) {
          alert("Invalid Hour");
          return prev;
        }
        return { ...prev, hours: { ...prev.hours, [name]: value } };
      } else if (option === "days") {
        if (name === "minute" && (value < 0 || value > 59)) {
          alert("Invalid Minute");
          return prev;
        }
        if (name === "hour" && (value < 0 || value > 23)) {
          alert("Invalid Hour");
          return prev;
        }
        if (name === "day" && (value < 1 || value > 31)) {
          alert("Invalid Day");
          return prev;
        }
        return { ...prev, days: { ...prev.days, [name]: value } };
      } else if (option === "months") {
        if (name === "minute" && (value < 0 || value > 59)) {
          alert("Invalid Minute");
          return prev;
        }
        if (name === "hour" && (value < 0 || value > 23)) {
          alert("Invalid Hour");
          return prev;
        }
        if (name === "day" && (value < 1 || value > 31)) {
          alert("Invalid Day");
          return prev;
        }
        if (name === "month" && (value < 1 || value > 12)) {
          alert("Invalid Month");
          return prev;
        }
        return { ...prev, months: { ...prev.months, [name]: value } };
      }
      return prev;
    });
  };

  const handleRadioChangeExpiry = (e) => {
    setExpiry((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));

    if (e.target.value === "never") {
      setExpiry((prevState) => ({
        ...prevState,
        day: "",
        month: "",
        hour: "",
        minute: "",
        year: "",
      }));
    }
  };

  const handleInputChangeExpiry = (e) => {
    const { id, value } = e.target;
    setExpiry((prevState) => {
      if (id === "day" && (value < 1 || value > 31)) {
        alert("Invalid Day");
        return prevState;
      }
      if (id === "month" && (value < 1 || value > 12)) {
        alert("Invalid Month");
        return prevState;
      }
      if (id === "hour" && (value < 0 || value > 23)) {
        alert("Invalid Hour");
        return prevState;
      }
      if (id === "minute" && (value < 0 || value > 59)) {
        alert("Invalid Minute");
        return prevState;
      }
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (expiry.type === "date" && expiry.year < new Date().getFullYear()) {
      alert("Invalid Year");
      return;
    }
    if (createdBy === "" || reciever === "" || task === "") {
      alert("All fields are required");
      return;
    }
    const data = {
      createdBy,
      reciever,
      task,
      expiry,
      schedule,
    };
    setData(data);
    console.log(data);
    const sentData = axios.post(
      import.meta.env.VITE_API_HOST + "/api/postUserData",
      data
    );
    sentData
      .then((response) => {
        console.log("data sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    handleCloseButton();
  };
  return (
    <div className="FormContainer">
      <div className="Form">
        <button className="close" onClick={handleCloseButton}>
          ❌
        </button>
        <h1>Enter Details</h1>
        <div className="Form-data">
          <div className="info">
            <label htmlFor="name">
              Name:{" "}
              <input
                type="text"
                id="name"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                placeholder="Enter Name"
              />
            </label>
            <label
              htmlFor="email"
              onChange={(e) => setReciever(e.target.value)}
              value={reciever}
            >
              Reciever's Email:
              <input type="email" id="email" placeholder="Enter Email" />
            </label>
          </div>
          <fieldset>
            <legend>Reminder Schedule</legend>

            {/* Minutes */}
            <input
              type="radio"
              name="time"
              value="mins"
              onChange={handleRadioChange}
              checked={schedule.selectedOption === "mins"}
            />
            <label htmlFor="mins">
              Every{" "}
              <input
                type="number"
                name="minutes"
                placeholder="0-59"
                min={0}
                max={59}
                value={schedule.minutes.minute}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "mins"}
              />{" "}
              minutes(s)
            </label>
            <br />

            {/* Hours */}
            <input
              type="radio"
              name="time"
              value="hours"
              onChange={handleRadioChange}
              checked={schedule.selectedOption === "hours"}
            />
            <label htmlFor="hours">
              Every day at{" "}
              <input
                type="number"
                name="hour"
                placeholder="0-23"
                min={0}
                max={23}
                value={schedule.hours.hour}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "hours"}
              />{" "}
              hour(s) :{" "}
              <input
                type="number"
                name="minute"
                placeholder="0-59"
                min={0}
                max={59}
                value={schedule.hours.minute}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "hours"}
              />{" "}
              minute(s)
            </label>
            <br />

            {/* Days */}
            <input
              type="radio"
              name="time"
              value="days"
              onChange={handleRadioChange}
              checked={schedule.selectedOption === "days"}
            />
            <label htmlFor="days">
              Every{" "}
              <input
                type="number"
                name="day"
                placeholder="1-31"
                max={31}
                min={1}
                value={schedule.days.day}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "days"}
              />{" "}
              day of the month at{" "}
              <input
                type="number"
                name="hour"
                placeholder="0-23"
                min={0}
                max={23}
                value={schedule.days.hour}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "days"}
              />{" "}
              hour(s) :{" "}
              <input
                type="number"
                name="minute"
                placeholder="0-59"
                min={0}
                max={59}
                value={schedule.days.minute}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "days"}
              />{" "}
              minute(s)
            </label>
            <br />

            {/* Months */}
            <input
              type="radio"
              name="time"
              value="months"
              onChange={handleRadioChange}
              checked={schedule.selectedOption === "months"}
            />
            <label htmlFor="months">
              Every year on{" "}
              <input
                type="number"
                name="date"
                placeholder="1-31"
                max={31}
                min={1}
                value={schedule.months.date}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "months"}
              />{" "}
              <input
                type="text"
                name="month"
                placeholder="month"
                value={schedule.months.month}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "months"}
              />{" "}
              at{" "}
              <input
                type="number"
                name="hour"
                placeholder="0-23"
                min={0}
                max={23}
                value={schedule.months.hour}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "months"}
              />{" "}
              hour(s) :{" "}
              <input
                type="number"
                name="minute"
                placeholder="0-59"
                min={0}
                max={59}
                value={schedule.months.minute}
                onChange={handleInputChange}
                disabled={schedule.selectedOption !== "months"}
              />{" "}
              minute(s)
            </label>
          </fieldset>
          <fieldset>
            <legend>Reminder Expiry</legend>

            <input
              type="radio"
              name="expiry"
              value="never"
              onChange={handleRadioChangeExpiry}
              checked={expiry.type === "never"}
            />
            <label htmlFor="never">Never</label>
            <br />

            <input
              type="radio"
              name="expiry"
              value="date"
              onChange={handleRadioChangeExpiry}
              checked={expiry.type === "date"}
            />
            <label htmlFor="expiry_date">
              year{" "}
              <input
                type="text"
                id="year"
                value={expiry.year}
                onChange={handleInputChangeExpiry}
                disabled={expiry.type !== "date"}
                placeholder="YYYY"
              />{" "}
              on day{" "}
              <input
                type="number"
                id="day"
                placeholder="1-31"
                max={31}
                min={1}
                value={expiry.day}
                onChange={handleInputChangeExpiry}
                disabled={expiry.type !== "date"}
              />
              <input
                type="text"
                id="month"
                placeholder="month"
                value={expiry.month}
                onChange={handleInputChangeExpiry}
                disabled={expiry.type !== "date"}
              />{" "}
              at{" "}
              <input
                type="number"
                id="hour"
                placeholder="0-23"
                min={0}
                max={23}
                value={expiry.hour}
                onChange={handleInputChangeExpiry}
                disabled={expiry.type !== "date"}
              />{" "}
              hour(s) :{" "}
              <input
                type="number"
                id="minute"
                placeholder="0-59"
                min={0}
                max={59}
                value={expiry.minute}
                onChange={handleInputChangeExpiry}
                disabled={expiry.type !== "date"}
              />{" "}
              minute(s)
            </label>
          </fieldset>
          <p>Enter task description</p>
          <textarea
            name="description"
            rows="3"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
