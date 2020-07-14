import React from "react";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { getDb, getUserId, onSignInOrOut, mapToData, db } from "../firebase";

interface todo {
  complete: boolean;
  text: string;
  id: string;
}

export default class TodoList extends React.Component<{}, { todos: todo[] | undefined }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      todos: undefined,
    };
  }

  db = new db();
  cleanupGetTodosSub: (() => void) | undefined = undefined;

  componentDidMount() {
    onSignInOrOut(() => {
      if (this.cleanupGetTodosSub) {
        this.cleanupGetTodosSub();
      }

      const userId = getUserId();
      if (!userId) {
        this.setState({
          todos: []
        });
        return;
      }

      this.cleanupGetTodosSub = this.db.todos(userId)
        .onSnapshot((next) => {
          console.log('Snapshot', mapToData(next));
          this.setState({
            todos: mapToData(next),
          });
        });
    });
  }

  componentWillUnmount() {
    this.cleanupGetTodosSub?.();
  }

  setCompleteStatus(todo: todo, complete: boolean) {
    todo.complete = complete;
    this.db.todos(getUserId() || '').doc(todo.id.toString()).update({
      ...todo
    });
  }

  render() {
    return (
      <div>
        <h1 className="my-4">Todo</h1>
        <ListGroup>
          {this.state.todos &&
            this.state.todos.map((todo) => (
              <ListGroup.Item key={todo.id}>
                <Form.Check
                  id={`todo-${todo.id}`}
                  label={todo.text}
                  checked={todo.complete}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.setCompleteStatus(todo, e.target.checked)
                  }
                ></Form.Check>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    );
  }
}
