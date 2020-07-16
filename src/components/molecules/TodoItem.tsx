import ListGroupItem from "react-bootstrap/ListGroupItem";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

export interface Todo {
  complete: boolean;
  text: string;
  id: string;
}

export interface TodoItemProps {
  todo: Todo
  onCompleteChange: (complete: boolean) => void;
}

export default (props: TodoItemProps) => (
  <ListGroupItem>
    <FormCheck
      id={`todo-${props.todo.id}`}
      label={props.todo.text}
      checked={props.todo.complete}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        props.onCompleteChange(e.target.checked)
      }
    ></FormCheck>
  </ListGroupItem>
);
