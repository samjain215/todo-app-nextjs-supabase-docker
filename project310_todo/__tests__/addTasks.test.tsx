import { render, screen, fireEvent } from "@testing-library/react";
import NewHome from "../app/home/page";

it("adds a task to the 'Urgent & Important' quadrant", async () => {
  render(<NewHome />);

  // Simulate user input for 'Urgent & Important'
  fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("UI")']" })); // Open 'Add New Task' modal for this quadrant

  const titleInput = screen.getByLabelText("Task Title");
  fireEvent.change(titleInput, { target: { value: "Buy groceries" } }); // Simulate typing into the title input field
  const descriptionInput = screen.getByLabelText("Task Description");
  fireEvent.change(descriptionInput, { target: { value: "Need to buy vegetables and fruits." } });
  const dueDateInput = screen.getByLabelText("Due Date");
  fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton); // Simulate clicking the submit button

  expect(await screen.findByText("Buy groceries")).toBeInTheDocument(); // Verify that the new task appears in the DOM under 'Urgent & Important'
});

it("adds a task to the 'Not Urgent & Important' quadrant", async () => {
  render(<NewHome />);

  // Simulate user input for 'Not Urgent & Important'
  fireEvent.click(screen.getByText("+", { selector: "button[onClick='handleOpenModal("NUI")']" })); // Open 'Add New Task' modal for this quadrant

  const titleInput = screen.getByLabelText("Task Title");
  fireEvent.change(titleInput, { target: { value: "Plan vacation" } }); // Simulate typing into the title input field
  const descriptionInput = screen.getByLabelText("Task Description");
  fireEvent.change(descriptionInput, { target: { value: "Research places to visit and make an itinerary." } });
  const dueDateInput = screen.getByLabelText("Due Date");
  fireEvent.change(dueDateInput, { target: { value: "2024-06-15" } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton); // Simulate clicking the submit button

  expect(await screen.findByText("Plan vacation")).toBeInTheDocument(); // Verify that the new task appears in the DOM under 'Not Urgent & Important'
});