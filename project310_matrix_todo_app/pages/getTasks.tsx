import { Button } from "@nextui-org/button";
import Image from 'next/image';

export default function GetTasks() {
    const tasks = [
        { id: 1, title: "Complete project report", description: "This is Task 1", category: "Work", dueDate: "2024-11-24 16:55:00" },
        { id: 2, title: "Buy groceries", description: "This is Task 2", category: "Work", dueDate: "2024-11-24 16:55:00" },
        { id: 3, title: "Schedule doctor appointment", description: "This is Task 3", category: "Work", dueDate: "2024-11-24 16:55:00" },
    ];

    const taskElements: JSX.Element[] = [];
    for (let i = 0; i < tasks.length; i++) {
        taskElements.push(
            <li key={tasks[i].id} className="p-4 border-b w-full h-200">
                <div className="bg-grey text-black rounded-2xl shadow-lg p-4 ">
                    <div className="flex justify-between">
                        <div>{tasks[i].title}</div>
                        <div>{tasks[i].dueDate}</div>
                    </div>
                    <div>{tasks[i].description}</div>
                    <div>{tasks[i].category}</div>
                    <div className="flex justify-end">
                    <Button isIconOnly color="danger" variant="faded" aria-label="Delete">
                        <Image
                            src="/delete.png"
                            alt="Delete Icon"
                            width={24}
                            height={10}
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
            <span>My Tasks</span>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mr-5">
                User
            </button>
            </div>
        <div>
        <ul>
            {taskElements}
        </ul>
        </div>
        </div>


    )
}