import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GetTasksProps {
  inputValue: string;
}

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
}

export default function GetTasks({ inputValue }: GetTasksProps) {
  const [name, setName] = useState("User");
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (inputValue) {
      // Fetch user details
      fetch(`http://localhost:3000/api/getUserDetails?code=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data?.name?.[0]?.username || "User"); // Use optional chaining for safety
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });

      // Fetch tasks
      fetch(`http://localhost:3000/api/getTasks?password=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data || []); // Ensure tasks are an array
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [inputValue]);

  const handleAddTask = () => {
    if (inputValue) {
      router.push(`/addTask?password=${inputValue}`);
    } else {
      console.error("No inputValue provided for navigation.");
    }
  };

  const taskElements: JSX.Element[] = tasks.map((task: Task) => (
    <li key={task.id} className="p-4 w-full">
      <div className="rounded-2xl shadow-lg p-4">
        <div className="flex justify-between mb-2">
          <div className="font-bold text-black">{task.title}</div>
          <div className="text-black">{task.dueDate}</div>
        </div>
        <div className="mb-2 text-black">{task.description}</div>
        <div className="mb-4 text-black">{task.category}</div>
        <div className="flex justify-end">
          <Button
            isIconOnly
            color="danger"
            variant="faded"
            aria-label="Delete"
          >
            <Image
              src="/delete.png"
              alt="Delete Icon"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="bg-white h-screen w-full pt-4">
      <div className="text-black ml-2 flex items-center justify-between">
        <span className="font-bold text-black">My Tasks</span>
        <div>
          <button
            onClick={handleAddTask}
            className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 mr-5"
          >
            Add Task
          </button>
          <button className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 mr-5">
            {name}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <ul className="text-black">{taskElements}</ul>
      </div>
    </div>
  );
}
