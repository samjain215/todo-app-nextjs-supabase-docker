import { Button } from "@nextui-org/button";
import Image from 'next/image';
import { useEffect, useState } from "react";

interface GetTasksProps {
    inputValue: string;
}

export default function GetTasks({ inputValue }: GetTasksProps) {
    const [name, setName] = useState("User");
    useEffect(() => {
        if (inputValue) {
            fetch(`http://localhost:3000/api/getUserDetails?code=${inputValue}`)
                .then(response => response.json())
                .then(data => {
                    setName(data['name'][0]['username']); // You can use this data to update the UI if needed
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
        }
    }, [inputValue]);

    const tasks = [
        { id: 1, title: "Complete project report", description: "This is Task 1", category: "Work", dueDate: "2024-11-24 16:55:00" },
        { id: 2, title: "Buy groceries", description: "This is Task 2", category: "Work", dueDate: "2024-11-24 16:55:00" },
        { id: 3, title: "Schedule doctor appointment", description: "This is Task 3", category: "Work", dueDate: "2024-11-24 16:55:00" },
    ];

    const taskElements: JSX.Element[] = [];
    for (let i = 0; i < tasks.length; i++) {
        taskElements.push(
            <li key={tasks[i].id} className="p-4 w-full">
                <div className="rounded-2xl shadow-lg p-4">
                    <div className="flex justify-between mb-2">
                        <div className="font-bold text-black">{tasks[i].title}</div>
                        <div className="text-black">{tasks[i].dueDate}</div>
                    </div>
                    <div className="mb-2 text-black">{tasks[i].description}</div>
                    <div className="mb-4 text-black">{tasks[i].category}</div>
                    <div className="flex justify-end">
                        <Button isIconOnly color="danger" variant="faded" aria-label="Delete">
                            <Image
                                key={tasks[i].id}
                                src="/delete.png"
                                alt="Delete Icon"
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <div className="bg-white h-screen w-full pt-4">
            <div className="text-black ml-2 flex items-center justify-between">
                <span className="font-bold text-black">My Tasks</span>
                <button className="bg-app-purple text-white px-4 py-2 rounded hover:bg-purple-600 mr-5">
                    {name}
                </button>
            </div>
            <div className="mt-4">
                <ul className="text-black">
                    {taskElements}
                </ul>
            </div>
        </div>
    );
}
