import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(4);
  const [abcdAllowed, setAbcdAllowed] = useState(true);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "";
    if (abcdAllowed)
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [abcdAllowed, numAllowed, charAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [abcdAllowed, numAllowed, charAllowed, length]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="display">
        <input type="text" className="password" value={password} readOnly />
        <button
          className="btn"
          onClick={() => navigator.clipboard.writeText(password)}
        >
          Copy
        </button>
        <button className="btn" onClick={generatePassword}>
          Regenerate
        </button>
      </div>
      <div className="controls">
        <div className="lengthSlider">
          <input
            type="range"
            name="length"
            id="length"
            min={4}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length" id="text">
            Length: {length}
          </label>
        </div>
        <div className="num_checkBox">
          <input
            type="checkbox"
            name="abcdAllowed"
            id="alphas"
            checked={abcdAllowed}
            onChange={() => {
              setAbcdAllowed(!abcdAllowed);
            }}
          />
          <label htmlFor="alphas" id="text">
            Alphabets
          </label>
        </div>
        <div className="num_checkBox">
          <input
            type="checkbox"
            name="numAllowed"
            id="numbers"
            checked={numAllowed}
            onChange={() => {
              setNumAllowed(!numAllowed);
            }}
          />
          <label htmlFor="numbers" id="text">
            Numbers
          </label>
        </div>
        <div className="char_checkBox">
          <input
            type="checkbox"
            name="charsAllowed"
            id="chars"
            checked={charAllowed}
            onChange={() => {
              setCharAllowed(!charAllowed);
            }}
          />
          <label htmlFor="chars" id="text">
            Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
