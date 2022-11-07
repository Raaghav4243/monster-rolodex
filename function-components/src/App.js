import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  console.log("render");
  const [searchField, setSearchField] = useState(""); //  [value, setValueFunc] | array desctructuring: const [a,b] = [1,2]
  const [monsters, setMonsters] = useState([]); 
  const [filteredMonsters, setFilteredMonsters] = useState(monsters); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // ALWAYS RUN WHEN THE COMPONENT IS MOUNTED | args = callback function, array of dependencies (monitoring, if changes, runs the callback functions)

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodox</h1>
      <SearchBox onChangeHandler={onSearchChange} placeHolder="Search Monsters" className="monsters-search-box" />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
