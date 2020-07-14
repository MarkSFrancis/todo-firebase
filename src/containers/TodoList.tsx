import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import NewTodo from "../components/NewTodo";
import TodoItem, { Todo } from "../components/TodoItem";
import { getDb, getUserId, mapToData, onSignInOrOut } from "../firebase";

export default () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);

  useEffect(() => {
    return onSignInOrOut(() => {
      setUserId(getUserId());
    });
  });

  useEffect(() => {
    if (userId) {
      return getDb()
        .todos(userId)
        .onSnapshot((next) => {
          setTodos(mapToData(next));
        });
    }
  }, [userId]);

  function createTodo(text: string) {
    getDb()
      .todos(getUserId() || "")
      .add({ text, complete: false });
  }

  function setCompleteStatus(todo: Todo, complete: boolean) {
    todo.complete = complete;
    getDb()
      .todos(getUserId() || "")
      .doc(todo.id.toString())
      .update({
        ...todo,
      });
  }

  if (!todos) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1 className="my-4">Todo</h1>
      <NewTodo createTodo={(text) => createTodo(text)} />
      <hr />
      <ListGroup>
        {todos.map((todo) => (
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
