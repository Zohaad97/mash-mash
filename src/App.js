import "./App.css";
import Editor from "./components/editor";
import React, { useContext } from "react";
import Loader from "./components/Loader/loader";
import Skeleton from "./components/Sekeleton";
import { MainContext } from "./contexts/MainProvider";
function App({ match }) {
  const { initialState } = useContext(MainContext);
  React.useEffect(() => {
    let color = `linear-gradient(270deg, #${randomColor()}, #${randomColor()}, #${randomColor()}, #${randomColor()}) 0% 0% / 400% 400%`;
    document.body.style.background = color;
  }, []);
  function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16) + "80";
  }
  return (
    <div className="App">
      {initialState.loader ? <Loader /> : null}

      <Skeleton match={match} />
    </div>
  );
}

export default App;
