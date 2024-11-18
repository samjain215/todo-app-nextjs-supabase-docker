import Form from "next/form";

export default function AddTask() {
  //   const handleSubmit = () => {
  //     fetch(`http://localhost:3000/api/login?code=${inputValue}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setMessage(data.message);
  //         setLoggedIn(data.loggedIn);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         setMessage("Login failed");
  //         setLoggedIn(false);
  //       });
  //   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Add Task
        </h1>
        <Form action="/search" className="space-y-4">
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
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // {onClick={handleSubmit}}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
