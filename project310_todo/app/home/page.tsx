"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Task } from "../types/db";
import TaskCard from "../components/task_card";
import { Category } from "../types/db";
import { Category, Task } from "../types/db";
import Selector from "../components/selector";

export default function NewHome() {
  // User Variables
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState("User");


  // Task Variables
  const [tasksUI, setTasksUI] = useState < Task[] > ([]);
  const [currentCategory, setCurrentCategory] = useState < Category > ({ category_id: 1, name: "Work" });
  const [tasksNUI, setTasksNUI] = useState < Task[] > ([]);
  const [tasksUNI, setTasksUNI] = useState < Task[] > ([]);
  const [tasksNUNI, setTasksNUNI] = useState < Task[] > ([]);
  const [showModal, setShowModal] = useState < boolean > (false);
  const [currentQuadrant, setCurrentQuadrant] = useState("");
  const [currentTask, setCurrentTask] = useState < Task | null > (null);
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
  const fetchTasks = async (category: Category | undefined) => {
    const response = category
      ? await fetch("/api/tasks/getTasks", { method: "POST", body: JSON.stringify({ category: category.category_id }) })
      : await fetch("/api/tasks/getTasks", { method: "POST", body: JSON.stringify({}) });

    const json = await response.json();
    console.log("JSON => ", json);
    if (json["tasks"]["UI"].length > 0) {
      setTasksUI(
        json["tasks"]["UI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    } else {
      setTasksUI([]);
    }
    if (json["tasks"]["NUI"].length > 0) {
      setTasksNUI(
        json["tasks"]["NUI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    } else {
      setTasksNUI([]);
    }
    if (json["tasks"]["UNI"].length > 0) {
      setTasksUNI(
        json["tasks"]["UNI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    } else {
      setTasksUNI([]);
    }
    if (json["tasks"]["NUNI"].length > 0) {
      setTasksNUNI(
        json["tasks"]["NUNI"].sort(
          (a: Task, b: Task) => Number(a.completed) - Number(b.completed)
        )
      );
    } else {
      setTasksNUNI([]);
    }
  };

  // Handle toggle task completion
  const handleToggleTask = (taskId: number, quadrant: "UI" | "NUI" | "UNI" | "NUNI") => {
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

  // Handle opening the modal for adding or editing tasks
  const handleOpenModal = (quadrant, task = null) => {
    setShowModal(true);
    setCurrentQuadrant(quadrant);
    setCurrentTask(task);
    if (task) {
      setNewTask({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        display_due_date: task.display_due_date,
      });
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
    setNewTask({
      title: "",
      description: "",
      due_date: "",
      display_due_date: "",
    }); // Reset form
  };

  const addOrUpdateTaskToState = (quadrant, newTaskData) => {
    switch (quadrant) {
      case "UI":
        if (currentTask) {
          setTasksUI((prevTasks) =>
            prevTasks.map((task) =>
              task.task_id === currentTask.task_id ? newTaskData : task
            )
          );
        } else {
          setTasksUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        }
        newTaskData.priority_id = 1;
        break;
      case "NUI":
        if (currentTask) {
          setTasksNUI((prevTasks) =>
            prevTasks.map((task) =>
              task.task_id === currentTask.task_id ? newTaskData : task
            )
          );
        } else {
          setTasksNUI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        }
        newTaskData.priority_id = 2;
        break;
      case "UNI":
        if (currentTask) {
          setTasksUNI((prevTasks) =>
            prevTasks.map((task) =>
              task.task_id === currentTask.task_id ? newTaskData : task
            )
          );
        } else {
          setTasksUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        }
        newTaskData.priority_id = 3;
        break;
      case "NUNI":
        if (currentTask) {
          setTasksNUNI((prevTasks) =>
            prevTasks.map((task) =>
              task.task_id === currentTask.task_id ? newTaskData : task
            )
          );
        } else {
          setTasksNUNI((prevTasks) => [newTaskData, ...prevTasks]); // Add to top of list
        }
        newTaskData.priority_id = 4;
        break;
      default:
        break;
    }
  };

  // Handle task submission
  const handleSubmitTask = () => {
    const newTaskData: Task = {
      task_id: Date.now(), // Generate unique id
      user_id: userID,
      title: newTask.title,
      description: newTask.description,
      completed: currentTask ? currentTask.completed : false,
      due_date: newTask.due_date,
      priority_id: 0,
      category_id: currentCategory.category_id,
      display_due_date: newTask.display_due_date,
    };

    // Call the function to update the state
    addOrUpdateTaskToState(currentQuadrant, newTaskData);

    // Send the task to the backend
    const endpoint = currentTask ? "/api/tasks/updateTask" : "/api/tasks/addTask";
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ reqTaskData: newTaskData }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log("Add Update Resp => ", json);
        if (json["error"]) {
          alert(json["message"]);
        }
      });

    handleCloseModal(); // Close modal after task submission
  };

  const removeTaskFromState = (quadrant) => {
    switch (quadrant) {
      case "UI":
        setTasksUI((prevTasks) =>
          prevTasks.filter((task) => task.task_id !== currentTask.task_id)
        );
        break;
      case "NUI":
        setTasksNUI((prevTasks) =>
          prevTasks.filter((task) => task.task_id !== currentTask.task_id)
        );
        break;
      case "UNI":
        setTasksUNI((prevTasks) =>
          prevTasks.filter((task) => task.task_id !== currentTask.task_id)
        );
        break;
      case "NUNI":
        setTasksNUNI((prevTasks) =>
          prevTasks.filter((task) => task.task_id !== currentTask.task_id)
        );
        break;
      default:
        break;
    }
  };

  // Handle deleting a task
  const handleDeleteTask = () => {
    if (currentTask) {
      fetch("/api/tasks/deleteTask", {
        method: "POST",
        body: JSON.stringify({ taskID: currentTask.task_id }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json["error"]) {
            alert(json["message"]);
          } else {
            // Remove the task from the state
            removeTaskFromState(currentQuadrant);
          }
        });
    }
    handleCloseModal();
  };


  const preventPropagation = (e) => {
    return e.stopPropagation();
  }

  const handleCategorySelected = async (category: Category) => {
    console.log(category);
    setCurrentCategory(category);
    await fetchTasks(category);
  }

  useEffect(() => {
    getUser();
    fetchTasks(undefined);
  }, [userID]);

  return (
    <div className="flex">
      <Sidebar displayName={displayName} />
      <div className="min-h-screen bg-gray-200 p-8 flex w-full">
        {/* Eisenhower Matrix */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold mb-8 text-black">
              Eisenhower Matrix
            </div>
            <Selector
              testId="category-selector"
              onCategorySelect={handleCategorySelected} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Urgent & Important */}
            <TaskCard tasks={tasksUI} quadrant="UI" handleOpenModal={handleOpenModal} handleToggleTask={handleToggleTask} preventPropagation={preventPropagation} buttonTestID="UI_button_+UI" gTestID="UI-Card" />
            {/* Not Urgent & Important */}
            <TaskCard tasks={tasksNUI} quadrant="NUI" handleOpenModal={handleOpenModal} handleToggleTask={handleToggleTask} preventPropagation={preventPropagation} buttonTestID="UI_button_+NUI" gTestID="NUI-Card" />
            {/* Urgent & Unimportant */}
            <TaskCard tasks={tasksUNI} quadrant="UNI" handleOpenModal={handleOpenModal} handleToggleTask={handleToggleTask} preventPropagation={preventPropagation} buttonTestID="UI_button_+UNI" gTestID="UNI-Card" />
            {/* Not Urgent & Unimportant */}
            <TaskCard tasks={tasksNUNI} quadrant="NUNI" handleOpenModal={handleOpenModal} handleToggleTask={handleToggleTask} preventPropagation={preventPropagation} buttonTestID="UI_button_+NUNI" gTestID="NUNI-Card" />
          </div >
        </div >
      </div >

      {/* Modal for adding/editing a task */}
      {
        showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseModal();
              }
            }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4 text-black">
                {currentTask ? "Edit Task" : "Add New Task"}
              </h2>
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
                {currentTask && (
                  <button
                    onClick={handleDeleteTask}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    data-testid="delete-button"
                  >
                    Delete
                  </button>
                )}
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
                  {currentTask ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
