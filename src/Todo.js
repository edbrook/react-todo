import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    const nextId = parseInt(localStorage.getItem("todo__nextId"), 10);
    const todos = [];
    const keys = Object.keys(localStorage).filter(k => 
      k.startsWith('todo__') && k !== "todo__nextId");
    for (let key of keys) {
      let td = JSON.parse(localStorage.getItem(key));
      todos.push(td);
    }
    this.state = {
      nextId: nextId?nextId:0,
      todos,
    };
  }

  handleChangeTodo = (todo) => {
   const idx = this.state.todos.indexOf(todo);
   const todos = this.state.todos.slice();
   todos[idx].done = !todos[idx].done;
   this.storeItem(todo);
   this.setState({ todos });
  }

  handleAddTodo = (todo) => {
    if (todo.note.length === 0) {
      return;
    }
    todo.id = this.state.nextId;
    this.storeItem(todo);
    this.storeNextId(this.state.nextId + 1);
    const todos = this.state.todos.concat(todo);
    this.setState({
      todos,
      nextId: this.state.nextId + 1,
    });
  }

  handleDeleteTodo = (todo) => {
    const todos = this.state.todos.slice();
    const idx = todos.indexOf(todo);
    this.removeItem(todo.id);
    todos.splice(idx, 1);
    this.setState({ todos });
  }

  storeNextId = (nextId) => {
    localStorage.setItem("todo__nextId", nextId);
  }

  storeItem = (item) => {
    const key = "todo__" + item.id;
    localStorage.setItem(key, JSON.stringify(item));
  }

  removeItem = (item) => {
    const key = "todo__" + item.id;
    localStorage.removeItem(key);
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
        <h1 className="fancyHdr">Todo</h1>
        <TodoInput onAdd={this.handleAddTodo}/>
        <div className="todoItems">
          {todoItems}
        </div>
      </div>
    );
  }
}

export default Todo;