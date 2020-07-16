import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import NewTodo from "../molecules/NewTodo";
import TodoItem, { Todo } from "../molecules/TodoItem";

export interface TodoListProps {
  todos: Todo[];
  createTodo: (text: string) => void;
  updateTodo: (todo: Todo) => void;
}

export default (props: TodoListProps) => {
  function setCompleteStatus(todo: Todo, complete: boolean) {
    todo.complete = complete;

    props.updateTodo(todo);
  }

  return (
    <div>
      <h1 className="my-4">Todo</h1>
      <NewTodo createTodo={props.createTodo} />
      <hr />
      <ListGroup>
        {props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCompleteChange={(complete) => setCompleteStatus(todo, complete)}
          />
        ))}
      </ListGroup>
    </div>
  );
};
