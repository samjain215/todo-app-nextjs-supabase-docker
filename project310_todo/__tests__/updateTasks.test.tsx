// import { render, screen, fireEvent } from "@testing-library/react";
// import NewHome from "../app/home/page";

// it("updates a task in the 'Urgent & Important' quadrant", async () => {
//   render(<NewHome />);

//   // Add a temporary task to update
//   fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("UI")']" })); // Open 'Add New Task' modal
//   const titleInput = screen.getByLabelText("Task Title");
//   fireEvent.change(titleInput, { target: { value: "Task to Update" } });
//   const submitButton = screen.getByText("Submit");
//   fireEvent.click(submitButton); // Add the task

//   // Simulate edit action
//   const editButton = screen.getByText("Edit", { selector: `button[data-task-id='${Date.now()}']` });
//   fireEvent.click(editButton); // Simulate clicking the edit button
//   const editInput = screen.getByDisplayValue("Task to Update"); // Find the input field with the current task value
//   fireEvent.change(editInput, { target: { value: "Updated Task" } }); // Simulate typing the updated value
//   const saveButton = screen.getByText("Save");
//   fireEvent.click(saveButton); // Simulate clicking the save button

//   expect(await screen.findByText("Updated Task")).toBeInTheDocument(); // Verify that the updated task appears in the DOM
// });

// it("updates the due date of a task in the 'Not Urgent & Unimportant' quadrant", async () => {
//   render(<NewHome />);

//   // Add a temporary task to update due date
//   fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("NUNI")']" }));
//   const titleInput = screen.getByLabelText("Task Title");
//   fireEvent.change(titleInput, { target: { value: "Task to Update Due Date" } });
//   fireEvent.click(screen.getByText("Submit"));

//   // Simulate edit action to update the due date
//   const editButton = screen.getByText("Edit", { selector: `button[data-task-id='${Date.now()}']` });
//   fireEvent.click(editButton); // Simulate clicking the edit button
//   const dueDateInput = screen.getByLabelText("Due Date");
//   fireEvent.change(dueDateInput, { target: { value: "2025-01-01" } }); // Simulate changing the due date
//   const saveButton = screen.getByText("Save");
//   fireEvent.click(saveButton); // Simulate clicking the save button

//   expect(await screen.findByText("2025-01-01")).toBeInTheDocument(); // Verify that the updated due date appears in the DOM
// });