import "./App.css";
import AddButton from "./components/AddButton/AddButton";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <h1 className="title">Task Scheduler</h1>
      <Header />
      <Main />
      <AddButton />
    </>
  );
}

export default App;
