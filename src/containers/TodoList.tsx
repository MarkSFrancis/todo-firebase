import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { Db, getUserId, mapToData, onSignInOrOut } from "../firebase";
import { partOf } from "../utils";

interface todo {
  complete: boolean;
  text: string;
  id: string;
}

interface state {
  todos?: todo[];
  newTodo?: partOf<todo>;
}

export default class TodoList extends React.Component<{}, state> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  db = new Db();
  cleanupGetTodosSub: (() => void) | undefined = undefined;

  componentDidMount() {
    onSignInOrOut(() => {
      if (this.cleanupGetTodosSub) {
        this.cleanupGetTodosSub();
      }

      const userId = getUserId();
      if (!userId) {
        this.setState({
          todos: [],
        });
        return;
      }

      this.cleanupGetTodosSub = this.db.todos(userId).onSnapshot((next) => {
        this.setState({
          todos: mapToData(next),
        });
      });
    });
  }

  componentWillUnmount() {
    this.cleanupGetTodosSub?.();
  }

  createTodo() {
    this.db
      .todos(getUserId() || "")
      .add({ ...this.state.newTodo, complete: false });
  }

  setCompleteStatus(todo: todo, complete: boolean) {
    todo.complete = complete;
    this.db
      .todos(getUserId() || "")
      .doc(todo.id.toString())
      .update({
        ...todo,
      });
  }

  render() {
    if (!this.state.todos) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h1 className="my-4">Todo</h1>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              this.createTodo();
            }}
          >
            <Form.Group className="flex-grow-1">
              <Form.Control
                placeholder="New todo"
                style={{ width: "100%" }}
                className="mr-2"
                value={this.state.newTodo?.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ newTodo: { text: e.target.value } });
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Form.Group>
          </Form>
          <hr />
          <ListGroup>
            {this.state.todos.map((todo) => (
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
}
