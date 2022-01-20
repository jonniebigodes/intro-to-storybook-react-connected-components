import React from "react";
import { Provider } from "react-redux";
import { rest } from "msw";
import { fireEvent, within } from "@storybook/testing-library";
import InboxScreen from "./InboxScreen";
import store from "../lib/store";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = (args) => <InboxScreen {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  msw: {
    handlers: {
      profile: rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: 1,
                title: "Task 1",
                completed: false,
              },
              {
                id: 2,
                title: "Task 2",
                completed: false,
              },
              {
                id: 3,
                title: "Task 3",
                completed: false,
              },
              {
                id: 4,
                userID: 2,
                title: "Task 4",
                completed: false,
              },
            ])
          );
        }
      ),
    },
  },
};
// Function to emulate pausing between interactions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
Default.play = async ({ canvasElement }) => {
  sleep(3000);
  const canvas = within(canvasElement);

  // Simulates pinning the first task
  await fireEvent.click(canvas.getByLabelText("pinTask-1"));
  // Simulates pinning the third task
  await fireEvent.click(canvas.getByLabelText("pinTask-3"));
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: {
      auth: rest.get(
        "https://jsonplaceholder.typicode.com/todos?userId=1",
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    },
  },
};
