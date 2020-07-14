import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export interface NewTodoProps {
  createTodo: (text: string) => void;
}

export default (props: NewTodoProps) => {
  const [text, setText] = useState('');

  return (
    <Form
      inline
      onSubmit={(e) => {
        e.preventDefault();
        props.createTodo(text);
        setText('');
      }}
    >
      <Form.Group className="flex-grow-1">
        <Form.Control
          placeholder="New todo"
          style={{ width: "100%" }}
          className="mr-2"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};
