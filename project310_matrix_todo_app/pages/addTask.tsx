import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AddTask() {
  const navigator = useRouter();
  const searchParams = useSearchParams();
  const inputValue = searchParams.get("password") || "";
  const [message, setMessage] = useState("");

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on submit

    // Call the API with form data
    fetch(
      `http://localhost:3000/api/addTask?password=${inputValue}&title=${title}&desc=${description}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data["error"] === false) {
          navigator.push("/login");
        } else {
          setMessage(data.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Couldn't Add Tasks " + error.message);
      });
  };

  const handleBack = () => {
    navigator.back();
  };

  return (
    <>
      <div className="bg-back-gray">
        <button
          onClick={handleBack}
          className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 ml-2 mt-2"
        >
          Back To Tasks
        </button>
      </div>
      <div className="flex bg-back-gray items-center justify-center min-h-screen bg-gray-100">
        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-96">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            Add Task
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task Name Input Field */}
            <div>
              <label
                htmlFor="taskName"
                className="block font-semibold mb-1 text-black"
              >
                Task Name
              </label>
              <input
                name="taskName"
                id="taskName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                placeholder="Enter task name"
                required
              />
            </div>

            {/* Task Description Input Field */}
            <div>
              <label
                htmlFor="taskDescription"
                className="block font-semibold mb-1 text-black"
              >
                Task Description
              </label>
              <input
                name="taskDescription"
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                placeholder="Describe the task"
              />
            </div>

            {/* Task Date Input Field */}
            <div>
              <label
                htmlFor="taskDate"
                className="block font-semibold mb-1 text-black"
              >
                Task Date
              </label>
              <input
                type="date"
                name="taskDate"
                id="taskDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                required
              />
            </div>

            {/* Submit Button */}
            {message === "" ? (
              <button
                type="submit"
                className="w-full bg-app-purple text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            ) : (
              <p>{message}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
