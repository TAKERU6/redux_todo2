import React, { Component } from "react";
import { connect } from "react-redux";
import { addTasks } from "../actions";

class Form extends Component {
  state = { text: "" };

  handleChange = (event) => this.setState({ text: event.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const text = this.state.text;
    const createdAt = new Date().toLocaleDateString();
    onSubmit(text, createdAt);
    this.setState({ text: "" });
  };

  render() {
    console.log(this.props.todos);

    return (
      <form
        onSubmit={(e) => {
          this.onSubmit(e);
        }}
      >
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <input type="submit" value="add" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (text, createdAt) => dispatch(addTasks(text, createdAt))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
