import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

// 1st - Separate components + findByTestId

// const LoadingRow = () => (
//   <div className="loading-item">
//     <span className="glow-checkbox" />
//     <span className="glow-text">
//       <span>Loading</span> <span>cool</span> <span>state</span>
//     </span>
//   </div>
// );

// const LoadingState = () => (
//   <div className="list-items" data-testid="loading">
//     <LoadingRow />
//     <LoadingRow />
//     <LoadingRow />
//     <LoadingRow />
//     <LoadingRow />
//     <LoadingRow />
//   </div>
// )

// 2nd - Testid inside of each loading element inside LoadingRow + findAllByTestId

// 3rd - Add key property to each state wrapper, to invalidate React's comparison algorithm + findByTestId

export default function TaskList({ loading }) {
  // We're retrieving our state from the store
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  });
  const dispatch = useDispatch();

  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}
TaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
};
TaskList.defaultProps = {
  loading: false,
};
