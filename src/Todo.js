import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    const nextId = parseInt(localStorage.getItem("nextId"), 10);
    const todos = [];
    const keys = Object.keys(localStorage).filter(k => k !== "nextId");
    for (let i in keys) {
      let td = JSON.parse(localStorage.getItem(keys[i]));
      todos.push(td);
    }
    console.log(todos);
    this.state = {
      nextId: nextId?nextId:0,
      todos,
    };
  }

  handleChangeTodo = (todo) => {
   const idx = this.state.todos.indexOf(todo);
   const todos = this.state.todos.slice();
   todos[idx].done = !todos[idx].done;
   localStorage.setItem(todo.id, JSON.stringify(todo));
   this.setState({ todos });
  }

  handleAddTodo = (todo) => {
    if (todo.note.length === 0) {
      return;
    }
    todo.id = this.state.nextId;
    localStorage.setItem(todo.id, JSON.stringify(todo));
    localStorage.setItem("nextId", this.state.nextId + 1);
    const todos = this.state.todos.concat(todo);
    this.setState({
      todos,
      nextId: this.state.nextId + 1,
    });
  }

  handleDeleteTodo = (todo) => {
    const todos = this.state.todos.slice();
    const idx = todos.indexOf(todo);
    localStorage.removeItem(todo.id);
    todos.splice(idx, 1);
    this.setState({ todos });
  }

  render() {
    const todoItems = this.state.todos.map(
      item => <TodoItem
        key={item.id}
        todo={item}
        onToggleDone={this.handleChangeTodo}
        onDelete={this.handleDeleteTodo}/>
    );

    return (
      <div>
        <h1>Todo!</h1>
        <TodoInput onAdd={this.handleAddTodo}/>
        <div className="todoItems">
          {todoItems}
        </div>
      </div>
    );
  }
}

export default Todo;