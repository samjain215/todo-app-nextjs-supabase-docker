// import { Button } from "@nextui-org/button";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface GetTasksProps {
//   inputValue: string;
// }

// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   dueDate: string;
// };

// export default function GetTasks({ inputValue }: GetTasksProps) {
//   const [name, setName] = useState("User");
//   const [tasks, setTasks] = useState<Task[]>([]); // Initialize as an empty array of type Task
//   const router = useRouter();

//   useEffect(() => {
//     if (inputValue) {
//       // Fetch user details
//       fetch(`http://localhost:3000/api/getUserDetails?code=${inputValue}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setName(data?.name?.[0]?.username || "User"); // Use optional chaining for safety
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error);
//         });

//       // Fetch tasks
//       fetch(`http://localhost:3000/api/getTasks?password=${inputValue}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setTasks(data); // Only set if data is an array
//           } else {
//             console.error("Unexpected data format for tasks:", data);
//             setTasks([]); // Fallback to an empty array if data is not an array
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching tasks:", error);
//         });
//     }
//   }, [inputValue]);

//   const handleAddTask = () => {
//     if (inputValue) {
//       router.push(`/addTask?password=${inputValue}`);
//     } else {
//       console.error("No inputValue provided for navigation.");
//     }
//   };

//   const taskElements: JSX.Element[] = tasks.map((task: Task) => (
//     <li key={task.id} className="p-4 w-full">
//       <div className="rounded-2xl shadow-lg p-4">
//         <div className="flex justify-between mb-2">
//           <div className="font-bold text-black">{task.title}</div>
//           <div className="text-black">{task.dueDate}</div>
//         </div>
//         <div className="mb-2 text-black">{task.description}</div>
//         <div className="mb-4 text-black">{task.category}</div>
//         <div className="flex justify-end">
//           <Button isIconOnly color="danger" variant="faded" aria-label="Delete">
//             <Image src="/delete.png" alt="Delete Icon" width={24} height={24} />
//           </Button>
//         </div>
//       </div>
//     </li>
//   ));

//   return (
//     <body className="bg-white h-screen w-full pt-4">
//       <div className="text-black ml-2 flex items-center justify-between">
//         <span className="font-bold text-black">My Tasks</span>
//         <div>
//           <button
//             onClick={handleAddTask}
//             className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 mr-5"
//           >
//             Add Task
//           </button>
//           <button className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 mr-5">
//             {name}
//           </button>
//         </div>
//       </div>
//       <div className="mt-4">
//         <ul className="text-black">{taskElements}</ul>
//       </div>
//     </body>
//   );
// }
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white p-8 flex">
      {/* Taskbar on the left side */}
      <div className="w-1/24 bg-white p-4 rounded-md shadow-md mr-8">
        <div className="text-lg font-bold mb-4">Taskbar</div>
        <button className="w-full bg-blue-500 text-black py-2 rounded-md mb-4">
          User
        </button>
        <button className="w-full bg-green-500 text-black py-2 rounded-md">
          Add Collaborator
        </button>
      </div>
      {/* Eisenhower Matrix */}
      <div className="w-23/24">
        <div className="text-2xl font-bold mb-8">Eisenhower Matrix</div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {/* Urgent & Important */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="text-red-500 text-lg font-bold mb-4">
              Urgent & Important
            </div>
            <div className="text-gray-500 italic">No Tasks</div>
          </div>
          {/* Not Urgent & Important */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="text-yellow-500 text-lg font-bold mb-4">
              Not Urgent & Important
            </div>
            <div className="text-gray-500 italic">No Tasks</div>
          </div>
          {/* Urgent & Unimportant */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="text-blue-500 text-lg font-bold mb-4">
              Urgent & Unimportant
            </div>
            <div className="text-gray-500 italic">No Tasks</div>
          </div>
          {/* Not Urgent & Unimportant */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="text-green-500 text-lg font-bold mb-4">
              Not Urgent & Unimportant
            </div>
            <ul className="space-y-2">
              <li>
                <input type="checkbox" /> Calendar: Check your schedule
              </li>
              <li>
                <input type="checkbox" /> Pomodoro: Rescue from procrastination
              </li>
              <li>
                <input type="checkbox" /> Habit: Visualize your efforts
              </li>
              <li>
                <input type="checkbox" /> Subscription Calendar: Never miss
                events
              </li>
              <li>
                <input type="checkbox" /> Click the input box to create a task
              </li>
              <li>
                <input type="checkbox" /> Use lists to manage tasks
              </li>
              <li>
                <input type="checkbox" /> More unique features
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
