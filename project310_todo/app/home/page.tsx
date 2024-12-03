"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Task } from "../types/db";

export default function NewHome() {
  // User Variables
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState("User");

  // Task Variables
  const [tasksUI, setTasksUI] = useState<Task[]>([]);
  const [tasksNUI, setTasksNUI] = useState<Task[]>([]);
  const [tasksUNI, setTasksUNI] = useState<Task[]>([]);
  const [tasksNUNI, setTasksNUNI] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuadrant, setCurrentQuadrant] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    display_due_date: "",
  });

  const getUser = async () => {
    const data = await supabase.auth.getUser();
    console.log("DATA: ", data);
    setUserID(data.data.user?.id ?? "123");

    const response = await fetch("/api/users/getUserDetails", {
      method: "POST",
      body: JSON.stringify({
        userID: userID,
      }),
    });
    const json = await response.json();
    if (json["error"]) {
      alert(`Error: ${json["error"]}`);
    } else {
      const username = json["profile"]["username"];
      if (username != "") setDisplayName(username);
    }
  };

  // Placeholder function for fetching tasks
  const fetchTasks = async () => {
    const response = await fetch("/api/tasks/getTasks");
    const json = await response.json();
    console.log("JSON => ", json);
    if (json["tasks"]["UI"].length > 0) {
      setTasksUI(
        json["tasks"]["UI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    }
    if (json["tasks"]["NUI"].length > 0) {
      setTasksNUI(
        json["tasks"]["NUI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    }
    if (json["tasks"]["UNI"].length > 0) {
      setTasksUNI(
        json["tasks"]["UNI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    }
    if (json["tasks"]["NUNI"].length > 0) {
      setTasksNUNI(
        json["tasks"]["NUNI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    }
  };

  // Handle toggle task completion
  const handleToggleTask = (taskId, quadrant) => {
    const updatedTasks = (tasks: Task[]) =>
      tasks.map((task: Task) => {
        if (task.task_id === taskId) {
          task.completed = !task.completed;
          return task;
        }
        return task;
      });

    let reqTaskData;

    switch (quadrant) {
      case "UI":
        setTasksUI(updatedTasks(tasksUI));
        reqTaskData = tasksUI.filter((task) => task.task_id === taskId)[0];
        break;
      case "NUI":
        setTasksNUI(updatedTasks(tasksNUI));
        reqTaskData = tasksNUI.filter((task) => task.task_id === taskId)[0];
        break;
      case "UNI":
        setTasksUNI(updatedTasks(tasksUNI));
        reqTaskData = tasksUNI.filter((task) => task.task_id === taskId)[0];
        break;
      case "NUNI":
        setTasksNUNI(updatedTasks(tasksNUNI));
        reqTaskData = tasksNUNI.filter((task) => task.task_id === taskId)[0];
        break;
      default:
        setTasksUI(updatedTasks(tasksUI));
        reqTaskData = tasksUI.filter((task) => task.task_id === taskId)[0];
        break;
    }

    console.log("Updating Task: ", reqTaskData);

    fetch("/api/tasks/updateTask", {
      method: "POST",
      body: JSON.stringify({ reqTaskData }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["error"]) {
          alert(`Unable to Update Task\n${json["message"]}`);
        }

        console.log(json);
      });
  };

  // Handle opening the modal
  const handleOpenModal = (quadrant) => {
    setShowModal(true);
    setCurrentQuadrant(quadrant);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      due_date: "",
      display_due_date: "",
    }); // Reset form
  };

  // Handle task submission
  const handleSubmitTask = () => {
    const newTaskData: Task = {
      task_id: "-1", // Generate unique id
      user_id: userID,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      due_date: newTask.due_date,
      priority_id: 0,
      category_id: 1,
      display_due_date: newTask.display_due_date,
    };

    // Add new task based on the current quadrant and update the state properly
    const addTaskToState = (quadrant) => {
      switch (quadrant) {
        case "UI":
          setTasksUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
          newTaskData.priority_id = 1;
          break;
        case "NUI":
          setTasksNUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
          newTaskData.priority_id = 2;
          break;
        case "UNI":
          setTasksUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
          newTaskData.priority_id = 3;
          break;
        case "NUNI":
          setTasksNUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
          newTaskData.priority_id = 4;
          break;
        default:
          break;
      }
    };

    // Call the function to update the state
    addTaskToState(currentQuadrant);

    // Send the task to the backend
    fetch("/api/tasks/addTask", {
      method: "POST",
      body: JSON.stringify({ data: newTaskData }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json["error"]) {
          alert(json["message"]);
        }
      });

    handleCloseModal(); // Close modal after task submission
  };

  useEffect(() => {
    getUser();
    fetchTasks();
  }, [userID]);

  return (
    <div className="flex">
      <Sidebar displayName={displayName} />
      <div className="min-h-screen bg-gray-200 p-8 flex w-full">
        {/* Eisenhower Matrix */}
        <div className="w-full">
          <div className="text-2xl font-bold mb-8 text-black">
            Eisenhower Matrix
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Urgent & Important */}
            <div
              className="bg-white rounded-lg text-black shadow-md p-4 flex flex-col justify-between"
              style={{ height: "300px" }}
            >
              <div className="flex justify-between items-center mt-1 mb-2">
                <div className="flex ml-2">
                  <div className="h-5 w-5 text-sm border rounded-full bg-red-500 text-white mr-2 flex items-center justify-center">
                    Ⅰ
                  </div>
                  <p className="text-red-500 text-sm">Urgent & Important</p>
                </div>
                <button
                  data-testid="UI_button_+"
                  className="text-2xl mr-3"
                  onClick={() => handleOpenModal("UI")}
                >
                  +
                </button>
              </div>
              <ul className="mr-4 ml-2 overflow-y-auto">
                {tasksUI.map((task) => (
                  <li
                    key={task.task_id}
                    className="mt-2 border border-red-200 text-sm mb-1 rounded-xl"
                  >
                    <div className="flex items-center justify-between bg-red w-full h-10">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="ml-2 mr-2 w-3 h-3"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.task_id, "UI")}
                        />
                        <div
                          className={`${
                            task.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.title}: {task.description}
                        </div>
                      </div>
                      <div className="mr-2">
                        {task.display_due_date ?? task.due_date}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Not Urgent & Important */}
            <div
              className="bg-white rounded-lg text-black shadow-md p-4 flex flex-col justify-between"
              style={{ height: "300px" }}
            >
              <div className="flex justify-between items-center mt-1 mb-2">
                <div className="flex ml-2">
                  <div className="h-5 w-5 text-sm border rounded-full bg-yellow-500 text-white mr-2 flex items-center justify-center">
                    Ⅱ
                  </div>
                  <p className="text-yellow-500 text-sm">
                    Not Urgent & Important
                  </p>
                </div>
                <button
                  className="text-2xl mr-3"
                  onClick={() => handleOpenModal("NUI")}
                >
                  +
                </button>
              </div>
              <ul className="mr-4 ml-2 overflow-y-auto">
                {tasksNUI.map((task) => (
                  <li
                    key={task.task_id}
                    className="mt-2 border-b border-yellow-200 text-sm flex items-center justify-between mb-1"
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 w-3 h-3"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.task_id, "NUI")}
                      />
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div>{task.display_due_date ?? task.due_date}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Urgent & Unimportant */}
            <div
              className="bg-white rounded-lg text-black shadow-md p-4 flex flex-col justify-between"
              style={{ height: "300px" }}
            >
              <div className="flex justify-between items-center mt-1 mb-2">
                <div className="flex ml-2">
                  <div className="h-5 w-5 text-sm border rounded-full bg-blue-500 text-white mr-2 flex items-center justify-center">
                    Ⅲ
                  </div>
                  <p className="text-blue-500 text-sm">Urgent & Unimportant</p>
                </div>
                <button
                  className="text-2xl mr-3"
                  onClick={() => handleOpenModal("UNI")}
                >
                  +
                </button>
              </div>
              <ul className="mr-4 ml-2 overflow-y-auto">
                {tasksUNI.map((task) => (
                  <li
                    key={task.task_id}
                    className="mt-2 border-b border-blue-200 text-sm flex items-center justify-between mb-1"
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 w-3 h-3"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.task_id, "UNI")}
                      />
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div>{task.display_due_date ?? task.due_date}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Not Urgent & Unimportant */}
            <div
              className="bg-white rounded-lg text-black shadow-md p-4 flex flex-col justify-between"
              style={{ height: "300px" }}
            >
              <div className="flex justify-between items-center mt-1 mb-2">
                <div className="flex ml-2">
                  <div className="h-5 w-5 text-sm border rounded-full bg-green-500 text-white mr-2 flex items-center justify-center">
                    Ⅳ
                  </div>
                  <p className="text-green-500 text-sm">
                    Not Urgent & Unimportant
                  </p>
                </div>
                <button
                  className="text-2xl mr-3"
                  onClick={() => handleOpenModal("NUNI")}
                >
                  +
                </button>
              </div>
              <ul className="mr-4 ml-2 overflow-y-auto">
                {tasksNUNI.map((task) => (
                  <li
                    key={task.task_id}
                    className="mt-2 border-b border-green-200 text-sm flex items-center justify-between mb-1"
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 w-3 h-3"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.task_id, "NUNI")}
                      />
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div>{task.display_due_date ?? task.due_date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding a task */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4 text-black">Add New Task</h2>
            <div className="mb-4">
              <label
                htmlFor="task-title"
                className="block text-sm font-bold mb-2 text-black"
              >
                Task Title
              </label>
              <input
                id="task-title"
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
                aria-label="Task Title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="task-description"
                className="block text-sm font-bold mb-2 text-black"
              >
                Task Description
              </label>
              <textarea
                id="task-description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
                aria-label="Task Description"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="task-due-date"
                className="block text-sm font-bold mb-2 text-black"
              >
                Due Date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
                aria-label="Due Date"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                data-testid="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                data-testid="submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
