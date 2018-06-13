import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], text: "" };
    this.removeTodo = this.removeTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    this.setState({
      todos: [this.state.text, ...this.state.todos],
      text: ""
    });
  }

  removeTodo(name, i) {
    let todos = this.state.todos.slice();
    todos.splice(i, 1);
    this.setState({
      todos
    });
  }

  removeAllTodos(name, i) {
    let todos = this.state.todos.slice();
    todos.splice(0, todos.length);
    this.setState({
      todos
    });
  }

  updateValue(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.addTodo(e)}>
          <input
            placeholder="Add Todo"
            value={this.state.text}
            onChange={e => {
              this.updateValue(e);
            }}
          />
          <button type="submit">Add Todo</button> *Click Item To Remove.
          **Double Click Removes All.
        </form>

        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
          removeAllTodos={this.removeAllTodos}
        />
      </div>
    );
  }
}

class TodoList extends React.Component {
  removeItem(item, i) {
    this.props.removeTodo(item, i);
  }

  removeAllItem(item, i) {
    this.props.removeAllTodos(item, i);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.todos.map((todo, i) => {
            return (
              <li
                onClick={() => {
                  this.removeItem(todo, i);
                }}
                onDoubleClick={() => {
                  this.removeAllItem(todo, i);
                }}
                key={i}
              >
                {todo}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todos />, rootElement);
