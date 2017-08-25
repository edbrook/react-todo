import React, { Component } from 'react';
import TodoItem from './TodoItem';

import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <div>
        <TodoItem />
      </div>
    );
  }
}

export default Todo;