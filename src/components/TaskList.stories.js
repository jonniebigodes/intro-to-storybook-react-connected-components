import React from "react";

import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

import { Provider } from "react-redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";

const ExampleTasks = [
  { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
  { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
  { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
  { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
  { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
  { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
];

// A super-simple mock of a redux store
const Mockstore = configureStore({
  reducer: {
    taskbox: createSlice({
      name: "taskbox",
      initialState: {
        tasks: [],
        status: "idle",
        error: null,
      },
      reducers: {},
    }).reducer,
  },
});

export default {
  component: TaskList,
  title: "TaskList",
  argTypes: {
    onArchiveTask: { action: "onArchiveTask" },
    onPinTask: { action: "onPinTask" },
  },
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => (
    <Provider
      store={configureStore({
        reducer: {
          taskbox: createSlice({
            name: "taskbox",
            initialState: {
              tasks: ExampleTasks,
              status: "idle",
              error: null,
            },
            reducers: {
              updateTaskState: (state, action) => {
                const { id, newTaskState } = action.payload;
                const task = state.tasks.findIndex((task) => task.id === id);
                if (task >= 0) {
                  state.tasks[task].state = newTaskState;
                }
              },
            },
          }).reducer,
        },
      })}
    >
      {story()}
    </Provider>
  ),
];
// Tasklist is already a connected component and we're not using the args anymore
/* Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
}; */

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
  (story) => (
    <Provider
      store={configureStore({
        reducer: {
          taskbox: createSlice({
            name: "taskbox",
            initialState: {
              tasks: [
                ...ExampleTasks.slice(0, 5),
                { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
              ],
              status: "idle",
              error: null,
            },
            reducers: {
              updateTaskState: (state, action) => {
                const { id, newTaskState } = action.payload;
                const task = state.tasks.findIndex((task) => task.id === id);
                if (task >= 0) {
                  state.tasks[task].state = newTaskState;
                }
              },
            },
          }).reducer,
        },
      })}
    >
      {story()}
    </Provider>
  ),
];

// Tasklist is already a connected component and we're not using the args anymore
/* WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
  ],
}; */

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => <Provider store={Mockstore}>{story()}</Provider>,
];
Loading.args = {
  //tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
// Tasklist is already a connected component and we're not using the args anymore
Empty.decorators = [
  (story) => <Provider store={Mockstore}>{story()}</Provider>,
];

/* Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
}; */
