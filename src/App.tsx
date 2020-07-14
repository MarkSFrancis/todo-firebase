import React from "react";
import Container from "react-bootstrap/Container";
import "./App.scss";
import NavBar from "./components/NavBar";
import TodoList from "./containers/TodoList";
import { firebaseConfig, setup } from "./firebase";

setup(firebaseConfig);

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Container>
        <TodoList></TodoList>
      </Container>
    </div>
  );
}

export default App;
