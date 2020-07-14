import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import SignIn from './SignIn';

export default () => (
  <NavBar bg="light">
    <NavBar.Brand>Todo</NavBar.Brand>
    <NavBar.Toggle aria-controls="todo-navbar"></NavBar.Toggle>
    <NavBar.Collapse id="todo-navbar">
      <Nav className="mr-auto">

      </Nav>
      <Form inline>
        <SignIn></SignIn>
      </Form>
    </NavBar.Collapse>
  </NavBar>
);