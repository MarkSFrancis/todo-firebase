import React, { useEffect, useState } from "react";
import { getDb, getUserId, mapToData, onSignInOrOut } from "../../firebase";
import { Todo } from "../molecules/TodoItem";
import TodoList from "../organisms/TodoList";
import Welcome from "../organisms/Welcome";

export default () => {
  const [loadedSignIn, setLoadedSignIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [todos, setTodos] = useState<Todo[] | undefined>();

  useEffect(() => {
    return onSignInOrOut(() => {
      setUserId(getUserId());
      setLoadedSignIn(true);
    });
  }, []);

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

  if (!loadedSignIn) {
    return <></>;
  }

  if (!userId) {
    return (
      <Welcome />
    );
  }

  if (!todos) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <TodoList createTodo={createTodo} todos={todos} updateTodo={updateTodo} />
    </>
  );
};
