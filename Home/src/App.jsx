import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import About from "./components/JSX/About";
import BrainLabel from "./components/JSX/BrainLabel";
import Contact from "./components/JSX/Contact";
import Events from "./components/JSX/Events";
import Landing from "./components/JSX/Landing";
import Loader from "./components/JSX/Loader";
import ModalComp from "./components/JSX/ModalComp";
import Speakers from "./components/JSX/Speakers";
import Modal from "./enums/Modal";

export const ModalContext = createContext();

function App() {
  const [modalOpen, setModalOpen] = useState(Modal.None);
  const [displayModal, setDisplayModal] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 450px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 450px)")
      .addEventListener("change", e => setMatches(e.matches));
  }, []);

  const [is2D, set2D] = useState(false),
    [labels, setLabels] = useState({
      event: false,
      contact: true,
      speaker: false,
      about: false,
    });

  const context = {
    modalOpen,
    updateModal: setModalOpen,

    displayModal,
    setDisplayModal,

    labels,
    setLabels: (label, isVisible) => {
      setLabels(currLabel => ({
        ...currLabel,
        [label]: isVisible,
      }));
    },

    is2D,
    set2D,
  };

  const [per, setPer] = useState(0),
    [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    const ET =
      window.performance.getEntries("navigation")[0].loadEventEnd + 2000;
    let a = (per * ET) / 100;

    const int = setInterval(() => {
      a += 100;
      const temp = Math.floor((a / ET) * 100);

      setPer(temp);
      if (temp >= 100) {
        clearInterval(int);
        setLoaded(true);
      }
    }, 100);
  };

  useEffect(() => {
    onLoad();
    const app = document.querySelector(".App");

    if (!loaded) {
      app.style.maxHeight = "100vh";
      app.style.overflow = "hidden";
    } else {
      app.style.minHeight = "100vh";
      app.style.overflow = "none";
    }

    !matches && (app.style.overflow = "unset");
  }, []);

  return (
    <div className="App">
      {!loaded ? <Loader percent={per} /> : <></>}
      <ModalContext.Provider value={context}>
        <Landing loaded={loaded} />

        {!matches && (
          <>
            <About loaded={loaded} />
            <Speakers loaded={loaded} />
            <Events loaded={loaded} />
            <Contact loaded={loaded} />
          </>
        )}

        {!is2D ? (
          <>
            {displayModal ? <ModalComp /> : <></>}
            {labels.event ? <BrainLabel modal={Modal.Event} /> : <></>}
            {labels.contact ? <BrainLabel modal={Modal.Contact} /> : <></>}
            {labels.about ? <BrainLabel modal={Modal.About} /> : <></>}
            {labels.speaker ? <BrainLabel modal={Modal.Speaker} /> : <></>}
          </>
        ) : (
          <></>
        )}
      </ModalContext.Provider>
    </div>
  );
}

export default App;
