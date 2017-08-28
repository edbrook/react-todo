import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';

import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.dataSource = props.dataSource;
    this.state = {
      todos: this._getTodoItems(),
    };
  }

  componentDidMount() {
    this.dataSource.registerListener(this);
  }

  componentWillUnmount() {
    this.dataSource.unregisterListener(this);
  }

  onUpdate(dataSource) {
    this.setState({
      todos: this._getTodoItems(),
    });
  }

  _getNextId() {
    let nextId = this.dataSource.getItem("nextId");
    return nextId ? nextId : 0;
  }

  _getTodoItems() {
    return this.dataSource.getItems(k => k !== "nextId");
  }

  handleChangeTodo = (todo) => {
   todo.done = !todo.done;
   this.storeItem(todo);
  }

  handleAddTodo = (todo) => {
    if (todo.note.length === 0) {
      return;
    }
    todo.id = this._getNextId();
    this.storeItem(todo);
    this.storeNextId(todo.id + 1);
  }

  handleDeleteTodo = (todo) => {
    this.removeItem(todo);
  }

  storeNextId = (nextId) => {
    this.dataSource.setItem("nextId", nextId);
  }

  storeItem = (item) => {
    this.dataSource.setItem(item.id, item);
  }

  removeItem = (item) => {
    this.dataSource.removeItem(item.id);
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