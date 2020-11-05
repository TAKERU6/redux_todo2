import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask, editTask, doneTask, changeText } from "../actions";

class Task extends Component {
  state = { editText: "" };

  handleChange = (event) => this.setState({ editText: event.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, todo } = this.props;
    const editText = this.state.editText;
    const editAt = new Date().toLocaleDateString();
    onSubmit(todo.id, editText, editAt);
    this.setState({ editText: "" });
  };

  handleDelete = () => {
    const { todo, deleteTask } = this.props;
    if (window.confirm(`タスク名: 「${todo.text}」 を削除して良いですか ?　`)) {
      deleteTask(todo.id);
    }
  };

  render() {
    const { todo, editTask, doneTask } = this.props;
    const isEdit = !!todo.isEdit;
    const isDone = !!todo.isDone;
    return (
      <div>
        {todo.text}
        <button onClick={() => this.handleDelete()}>dellete</button>
        <button
          onClick={() => {
            editTask(todo.id, todo.isEdit);
          }}
        >
          edit
        </button>
        <button
          onClick={() => {
            doneTask(todo.id, todo.isDone);
          }}
        >
          {isDone ? "done" : "no done"}
        </button>
        <span>{todo.createdAt}</span>
        {isEdit && (
          <form onSubmit={(e) => this.onSubmit(e)}>
            <input
              type="text"
              value={this.state.editText}
              onChange={this.handleChange}
            />
            <input type="submit" value="edit" />
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (id) => dispatch(deleteTask(id)),
    editTask: (id, isEdit) => dispatch(editTask(id, isEdit)),
    doneTask: (id, isDone) => dispatch(doneTask(id, isDone)),
    onSubmit: (id, editText, editAt) =>
      dispatch(changeText(id, editText, editAt))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
