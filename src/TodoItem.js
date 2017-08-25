import React, { Component } from 'react';

class TodoItem extends Component {
  handleToggleDone = () => {
    if (this.props.hasOwnProperty('onToggleDone')) {
      this.props.onToggleDone(this.props.todo);
    }
  };

  handleDelete = () => {
    if (window.confirm("Delete todo item - '" + this.props.todo.note + "' ?")) {
      if (this.props.hasOwnProperty('onDelete')) {
        this.props.onDelete(this.props.todo);
      }
    }
  }

  render() {
    const { todo } = this.props;
    const done = todo.done ? "X" : " ";
    return (
      <div className="todoItem">
        <span className="doneMarker" onClick={this.handleToggleDone}>[{done}]</span>
        <span className="dragMarker">&nbsp;::&nbsp;</span>
        <span
          className="todoText"
          style={{textDecoration: todo.done?'line-through':'none'}}>{todo.note}</span>
        <span className="deleteMarker" onClick={this.handleDelete}>X</span>
      </div>
    );
  }
}

export default TodoItem;