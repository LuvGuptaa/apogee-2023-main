import "./App.css";
import Landing from "./components/JSX/Landing";
import Contact from "./components/JSX/Contact";
import Events from "./components/JSX/Events";

function App() {
  return (
    <div className="App">
      {/* <Landing /> */}
      <Contact />
      <Events/>
      <a href="https://bits-dvm.org/" target="_blank" className="footer">
        Made with{" "}
        <i
          aria-hidden="true"
          style={{ margin: "0", cursor: "pointer", color: "red" }}
          className="fa fa-heart"
        ></i>{" "}
        by DVM
      </a>
    </div>
  );
}

export default App;
