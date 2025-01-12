import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numAllowed, charAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [numAllowed, charAllowed, length]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="display">
        <input type="text" className="password" value={password} readOnly />
        <button className="copyBtn">copy</button>
      </div>
      <div className="controls">
        <div className="lengthSlider">
          <input
            type="range"
            name="length"
            id="length"
            min={8}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length" id="text">
            Length: {length}
          </label>
        </div>
        <div className="num_checkBox">
          <input type="checkbox" name="numAllowed" id="numbers"
          onChange={()=>{
            setNumAllowed(!numAllowed);
          }}
          />
          <label htmlFor="numbers" id="text">
            Numbers
          </label>
        </div>
        <div className="char_checkBox">
          <input type="checkbox" name="charsAllowed" id="chars" 
          onChange= {()=>{
            setCharAllowed(!charAllowed)
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
