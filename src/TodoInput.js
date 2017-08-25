import React, { Component } from 'react';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
    };
  }

  handleOnSubmit = (evt) => {
    evt.preventDefault();
    const todo = { done: false, note: this.state.note };
    if (this.props.hasOwnProperty('onAdd')) {
      this.props.onAdd(todo);
    }
    this.setState({ note: "" });
  };

  handleOnChange = (evt) => {
    const note = evt.target.value;
    this.setState({ note });
  }

  render() {
    const { note } = this.state;
    return (
      <div className="todoInput">
        <form onSubmit={this.handleOnSubmit}>
          <input type="text"
            placeholder="Type new todo here. Press enter to add."
            value={note}
            onChange={this.handleOnChange}/>
        </form>
      </div>
    );
  }
}

export default TodoInput;