import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { getDb, getUserId, mapToData, onSignInOrOut } from "../../firebase";
import SignIn from "../molecules/SignIn";
import { Todo } from "../molecules/TodoItem";
import TodoList from "../organisms/TodoList";

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
    } else {
      setTodos(undefined);
    }
  }, [userId]);

  function createTodo(text: string) {
    getDb()
      .todos(getUserId() || "")
      .add({ text, complete: false });
  }

  function updateTodo(todo: Todo) {
    getDb()
      .todos(getUserId() || "")
      .doc(todo.id.toString())
      .update({
        ...todo,
      });
  }

  if (!userId) {
    return (
      <Jumbotron className="my-4">
        <h1>Welcome to Todo!</h1>
        <p>
          This is a simple app, built with React and Firebase. In order to use
          it, you'll need to sign in to Google.
        </p>
        <p>
          <SignIn />
        </p>
      </Jumbotron>
    );
  }

  if (!todos) {
    return <h3>Loading..</h3>;
  }

  return (
    <>
      <TodoList createTodo={createTodo} todos={todos} updateTodo={updateTodo} />
    </>
  );
};
