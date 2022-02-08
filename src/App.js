import "./App.css";
import "./components/RandomPhoto";
import React, { useState, createContext } from "react";
import RandomPhoto from "./components/RandomPhoto";
import SearchPhoto from "./components/SearchPhoto";
export const changeContext = createContext();

function App() {
  const [query, setQuery] = useState("");
  const [body, setBody] = useState(<RandomPhoto />);

  const enterPress = (evn) => {
    if (evn.key === "Enter") {
      if (query !== "") {
        setBody(<SearchPhoto />);
      } else {
        setBody(<RandomPhoto />);
      }
    }
  };

  return (
    <div className="App">
      <changeContext.Provider value={query}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={enterPress}
          placeholder="Tìm Kiếm...."
        />
        {body}
      </changeContext.Provider>
    </div>
  );
}

export default App;
