"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Placeholder for Task type
type Task = {
  task_id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
};

export default function NewHome() {
  const [tasksUI, setTasksUI] = useState<Task[]>([]);
  const [tasksNUI, setTasksNUI] = useState<Task[]>([]);
  const [tasksUNI, setTasksUNI] = useState<Task[]>([]);
  const [tasksNUNI, setTasksNUNI] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuadrant, setCurrentQuadrant] = useState<string>("");
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    due_date: string;
  }>({
    title: "",
    description: "",
    due_date: "",
  });

  // Placeholder function for fetching tasks
  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const json = await response.json();
    if (json["tasks"].length > 0) {
      setTasksUI(
        json["tasks"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    }
  };

  // Handle toggle task completion
  const handleToggleTask = (taskId: number, quadrant: string) => {
    const updatedTasks = (tasks: Task[]): Task[] =>
      tasks.map((task) =>
        task.task_id === taskId ? { ...task, completed: !task.completed } : task
      );

    switch (quadrant) {
      case "UI":
        setTasksUI(updatedTasks(tasksUI));
        break;
      case "NUI":
        setTasksNUI(updatedTasks(tasksNUI));
        break;
      case "UNI":
        setTasksUNI(updatedTasks(tasksUNI));
        break;
      case "NUNI":
        setTasksNUNI(updatedTasks(tasksNUNI));
        break;
      default:
        break;
    }
  };

  // Handle opening the modal
  const handleOpenModal = (quadrant: string) => {
    setShowModal(true);
    setCurrentQuadrant(quadrant);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({ title: "", description: "", due_date: "" }); // Reset form
  };

  // Handle task submission
  const handleSubmitTask = () => {
    const newTaskData = {
      task_id: Date.now(), // Generate unique id
      title: newTask.title,
      description: newTask.description,
      completed: false,
      due_date: newTask.due_date,
    };

    switch (currentQuadrant) {
      case "UI":
        setTasksUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        break;
      case "NUI":
        setTasksNUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        break;
      case "UNI":
        setTasksUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        break;
      case "NUNI":
        setTasksNUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        break;
      default:
        break;
    }

    handleCloseModal();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar (Taskbar) */}
      <div className="w-16 bg-gray-100 p-4 flex flex-col items-center space-y-4 border-r border-solid border-gray-300">
        <button className="h-12 w-12 bg-red-500 text-white rounded-full flex items-center justify-center">
          A
        </button>
        <button className="h-12 w-12 bg-green-500 text-black rounded-full flex items-center justify-center">
          <Image
            src="/colab_tasks.png"
            alt="Colab Tasks"
            height={24}
            width={24}
          />
        </button>
      </div>

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
                  className="text-2xl mr-3"
                  onClick={() => handleOpenModal("UI")}
                >
                  +
                </button>
              </div>
              <ul className="mr-4 ml-2 overflow-y-auto">
                {tasksUI.map((task: Task) => (
                  <li
                    key={task.task_id}
                    className="mt-2 border-b border-red-200 text-sm flex items-center justify-between mb-1"
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2 w-3 h-3"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.task_id, "UI")}
                      />
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div>{task.due_date}</div>
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
                {tasksNUI.map((task: Task) => (
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
                    <div>{task.due_date}</div>
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
                {tasksUNI.map((task: Task) => (
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
                    <div>{task.due_date}</div>
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
                {tasksNUNI.map((task: Task) => (
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
                    <div>{task.due_date}</div>
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
              <label className="block text-sm font-bold mb-2 text-black">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-black">
                Task Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-black">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
                className="w-full border rounded p-2 text-black"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
