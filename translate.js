import React, { useState } from "react";
import languages from "./language";
function Translate() {
  const [idFrom, setIdFrom] = useState("");
  const [idTo, setIdTo] = useState("");
  const [froml, setFroml] = useState("en-GB");
  const [toL, setToL] = useState("ar-SA");

  const handleIcons = (id) => {
    if (id == "from") {
      copytext(idFrom);
    } else {
      copytext(idTo);
    }
  };
  const handleSpeakerIcons = (id) => {
    if (id == "from") {
      textUtter(idFrom, froml);
    } else {
      textUtter(idTo, toL);
    }
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
  };
  const textUtter = (textt, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textt);
    utterance.lang = language;
    synth.speak(utterance);
  };
  const translateHandler = () => {
    const url = `https://api.mymemory.translated.net/get?q=${idFrom}&langpair=${froml}|${toL}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setIdTo(data.responseData.translatedText));
  };

  return (
    <div className="wrapper">
      <div className="text-input">
        <textarea
          value={idFrom}
          onChange={(e) => setIdFrom(e.target.value)}
          name="from"
          id="from"
          placeholder="Enter Text Here.."
          spellCheck={true}
        ></textarea>
        <textarea
          value={idTo}
          name="to"
          id="to"
          readOnly
        ></textarea>
      </div>

      <ul className="controls">
        <li className="row from">
          <div className="icons">
            <i
              id="from"
              class="fa-solid fa-copy"
              onClick={(e) => handleIcons("from")}
            ></i>
            <i
              id="from"
              class="fa-solid fa-volume-high"
              onClick={(e) => handleSpeakerIcons("from")}
            ></i>
          </div>
          <select value={froml} onChange={(e) => setFroml(e.target.value)}>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {" "}
                {name}{" "}
              </option>
            ))}
          </select>
        </li>

        <li className="row to">
          <select value={toL} onChange={(e) => setToL(e.target.value)}>
            {Object.entries(languages).map(([code, names]) => (
              <option key={code} value={code}>
                {" "}
                {names}{" "}
              </option>
            ))}
          </select>
          <div className="icons">
            <i
              id="to"
              class="fa-solid fa-copy"
              onClick={(e) => handleIcons("to")}
            ></i>
            <i
              id="to"
              class="fa-solid fa-volume-high"
              onClick={(e) => handleSpeakerIcons("to")}
            ></i>
          </div>
        </li>
      </ul>

      <button onClick={translateHandler} className="button">
        Translate
      </button>
    </div>
  );
}
export default Translate;
{
  /* <li className="exchange">
                    <i class="fa-solid fa-right-left"></i>
                    </li> */
}
//  const handleIcons = (target, id) => {
//     if (target.classList.contains("fa-copy")) {
//       if (id === "from") {
//         copytext(idFrom);
//       } else {
//         copytext(idTo);
//       }
//     } else {
//       if (id === "from") {
//         textUtter(idFrom, froml);
//       } else {
//         textUtter(idTo, toL);
//       }
//     }
//  };
