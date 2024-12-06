// import { render, screen, fireEvent } from "@testing-library/react";
// import NewHome from "../app/home/page";

// it("deletes a task from the 'Urgent & Important' quadrant", async () => {
//   render(<NewHome />);

//   // Add a temporary task to delete
//   fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("UI")']" })); // Open 'Add New Task' modal
//   const titleInput = screen.getByLabelText("Task Title");
//   fireEvent.change(titleInput, { target: { value: "Task to Delete" } });
//   const submitButton = screen.getByText("Submit");
//   fireEvent.click(submitButton); // Add the task

//   // Simulate delete action
//   const deleteButton = screen.getByText("Delete", { selector: `button[data-task-id='${Date.now()}']` }); // Adjust selector based on delete button context
//   fireEvent.click(deleteButton); // Simulate clicking the delete button

//   expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument(); // Verify that the task no longer appears in the DOM
// });

// it("deletes multiple tasks from the 'Not Urgent & Important' quadrant", async () => {
//   render(<NewHome />);

//   // Add multiple temporary tasks
//   fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("NUI")']" }));
//   const titleInput = screen.getByLabelText("Task Title");
//   fireEvent.change(titleInput, { target: { value: "Task 1" } });
//   fireEvent.click(screen.getByText("Submit"));

//   fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("NUI")']" }));
//   fireEvent.change(titleInput, { target: { value: "Task 2" } });
//   fireEvent.click(screen.getByText("Submit"));

//   // Simulate delete action on Task 1
//   const deleteButton = screen.getByText("Delete", { selector: `button[data-task-id='${Date.now()}']` });
//   fireEvent.click(deleteButton);

//   expect(screen.queryByText("Task 1")).not.toBeInTheDocument(); // Verify that Task 1 no longer appears in the DOM
//   expect(screen.getByText("Task 2")).toBeInTheDocument(); // Verify that Task 2 is still present
// });