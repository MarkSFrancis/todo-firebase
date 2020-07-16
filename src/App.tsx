import React from "react";
import Container from "react-bootstrap/Container";
import "./App.scss";
import NavBar from "./components/molecules/NavBar";
import TodoTemplate from "./components/templates/TodoTemplate";
import { firebaseConfig, setup } from "./firebase";

setup(firebaseConfig);

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Container>
        <TodoTemplate></TodoTemplate>
      </Container>
    </div>
  );
}

export default App;
