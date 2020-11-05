import React from "react";
import Task from "./Task";

const Tasks = ({ todos }) => {
  return (
    <div>
      {Object.values(todos).map((todo) => (
        <Task key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Tasks;
