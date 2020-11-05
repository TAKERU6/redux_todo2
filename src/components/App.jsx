import React, { Component } from "react";
import "../styles.css";
import Form from "./Form";
import Tasks from "./Tasks";
import { connect } from "react-redux";

class App extends Component {
  state = {
    taskStatus: { all: true, done: false, notDone: false, search: false },
    searchText: "",
    searchTask: []
  };

  onClick = (e, status) => {
    switch (status) {
      case "all":
        this.setState({
          taskStatus: { all: true, done: false, notDone: false, search: false }
        });
        break;
      case "done":
        this.setState({
          taskStatus: { all: false, done: true, notDone: false, search: false }
        });
        break;
      case "notDone":
        this.setState({
          taskStatus: { all: false, done: false, notDone: true, search: false }
        });
        break;
      case "search":
        this.setState({
          taskStatus: { all: false, done: false, notDone: false, search: true }
        });
        break;
      default:
    }
  };

  handleSortTasks = () => {
    const { taskStatus } = this.state;
    const { todos } = this.props;
    if (taskStatus.all) return todos;
    if (taskStatus.done) {
      const sortDone = Object.values(todos).filter(
        (item) => item.isDone === true
      );
      return sortDone.reduce((obj, data) => ({ ...obj, [data.id]: data }), {});
    }
    if (taskStatus.notDone) {
      const sortDone = Object.values(todos).filter(
        (item) => item.isDone !== true
      );
      return sortDone.reduce((obj, data) => ({ ...obj, [data.id]: data }), {});
    }
    if (taskStatus.search) {
      const sortSearch = Object.values(todos).filter(
        (item) => item.text === this.state.searchTask[0]
      );
      return sortSearch.reduce(
        (obj, data) => ({ ...obj, [data.id]: data }),
        {}
      );
    }
  };

  handleChange = (event) => this.setState({ searchText: event.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { searchText } = this.state;
    this.onClick(e, "search");
    this.setState({ searchTask: [searchText], searchText: "" });
  };

  render() {
    const sortedTasks = this.handleSortTasks();
    return (
      <div className="App">
        <h1>todoList</h1>
        <button onClick={(e) => this.onClick(e, "all")}>all</button>
        <button onClick={(e) => this.onClick(e, "done")}>done</button>
        <button onClick={(e) => this.onClick(e, "notDone")}>no done</button>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <input type="submit" value="search" />
        </form>
        <Form />
        <Tasks todos={sortedTasks} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ todos: state.todos });

export default connect(mapStateToProps)(App);
