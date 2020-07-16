import React from "react";
import SignIn from "../molecules/SignIn";
import Jumbotron from "react-bootstrap/Jumbotron";

export default () => (
  <Jumbotron className="my-4">
    <h1>Welcome to Todo!</h1>
    <p>
      This is a simple app, built with React and Firebase. In order to use it,
      you'll need to sign in to Google.
    </p>
    <p>
      <SignIn />
    </p>
  </Jumbotron>
);
