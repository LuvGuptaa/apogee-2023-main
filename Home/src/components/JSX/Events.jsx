import React, { useEffect, useRef, useState } from "react";
import dummy from "../../assets/dummy.png";
import dropdown from "../../assets/events/dropdown.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "../CSS/Events.module.css";
import stylesH from "../CSS/About.module.css";
import EventCard from "./EventCard";
import EventsBox from "./EventsBox";
import Squares from "./Squares";
import useScrollVis from "../../hooks/useScrollVis";

function Events(props) {
  const { height, width } = useWindowDimensions();
  const [mainEvent, setMainEvent] = useState([]);
  const [categories, setCategories] = useState([]);
  const visClass = useScrollVis(props.idx, props.pages, props.scrollDir);

  let info = useRef(null);
  let list = useRef(null);
  let container = useRef(null);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 650px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 650px)")
      .addEventListener("change", e => setMatches(e.matches));

    setEvents();
    async function setEvents() {
      const EVENT_URL = "https://bits-apogee.org/registrations/events/";

      try {
        const res = await fetch(EVENT_URL, { method: "GET" });
        const events = await res.json();

        setMainEvent(events.data[0].events[0]);

        setCategories(
          events.data
            .filter(c => c.category_name != "Speakers")
            .map(c => ({
              name: c?.category_name,
              show: false,
              events: c?.events.map((e, i) => (
                <EventCard
                  key={i + 1}
                  event={() => {
                    setMainEvent(e);

                    if (matches) {
                      list.style.display = "none";
                      info.style.display = "block";
                      container.style.height = "auto";
                    }
                  }}
                  index={i + 1}
                  img={e.image_url}
                  name={e.name}
                />
              )),
            }))
        );
      } catch (e) {}
    }
  }, []);

  function toggle(index) {
    setCategories(
      categories.map((c, i) => ({
        ...c,
        show: i === index ? !c?.show : c?.show,
      }))
    );
  }

  function showList() {
    if (matches) {
      list.style.display = "block";
      info.style.display = "none";
      container.style.height = "100vh";
    }
  }

  function removeTags(str) {
    if (str === null || str === "") return null;
    else str = str?.toString();
    return str?.replace(/(<([^>]+)>)/gi, "");
  }

  const ARROW = (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4238 1.7041L7.42383 7.7041L1.42383 1.7041"
        stroke="#BFDFFF"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={visClass}>
      {/* <div
        className={styles.heading}
        onClick={evt => {
          evt.stopPropagation();
        }}
      >
        EVENTS
      </div> */}
      <div
        ref={el => (container = el)}
        className={`${styles.container} ${visClass}`}
      >
        <div
          ref={el => (info = el)}
          className={styles.info}
          onClick={evt => {
            evt.stopPropagation();
            showList();
          }}
        >
          <div className={styles.content}>
            <div className={styles.image}>
              <img
                className={styles.eventImage}
                src={
                  mainEvent?.image_url !== "NA"
                    ? `https://bits-apogee.org${mainEvent?.image_url}`
                    : dummy
                }
              />
            </div>

            <div className={styles.eventDetails}>
              <div className={styles.eventName}>
                {removeTags(mainEvent?.name) ?? "Not Yet Announced"}
              </div>

              <div className={styles.details}>DETAILS</div>
              <div className={styles.text}>
                {removeTags(mainEvent?.about) ?? "N/A"}
              </div>

              <div className={styles.details}>GUIDELINES</div>
              <div className={styles.text}>
                {removeTags(mainEvent?.rules) ?? "N/A"}
              </div>

              {/* <div className={styles.details}>CONTACT US</div>
              <div className={styles.text}>
                {"Mayan Agrawal - +91 9423527868"}
              </div> */}
            </div>

            <Squares />
            <EventsBox />
          </div>
        </div>

        <div
          ref={el => (list = el)}
          className={styles.list}
          onClick={evt => evt.stopPropagation()}
        >
          <div className={styles.carousel}>
            {width < 500 && (
              <div
                style={{ marginTop: "3rem" }}
                className={stylesH.heading}
                onClick={evt => evt.stopPropagation()}
              >
                <span>EVENTS</span>
              </div>
            )}
            <div className={styles.dropdown}>
              {categories.map((c, i) => (
                <div key={i} className={styles.dropdownItem}>
                  <img src={dropdown} alt="" />
                  <span onClick={() => toggle(i)}>
                    {c?.name}
                    <span
                      className={
                        c?.show ? styles.arrowBottom : styles.arrowRight
                      }
                    >
                      {ARROW}
                    </span>
                  </span>

                  {c?.show ? (
                    <div className={styles.dropdownEvents}>{c?.events}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
