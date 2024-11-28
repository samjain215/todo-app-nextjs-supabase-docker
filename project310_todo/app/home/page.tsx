"use client"

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Task = {
    "task_id": number,
    "user_id": number,
    "title": string,
    "description": string,
    "priority_id": number,
    "completed": boolean,
    "due_date": string
}

export default function Home() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [messageForPriority1, setMessageForPriority1] = useState("");
    const [tasks, setTasks] = useState < Task[] > ([]);
    const getUser = async () => {
        const data = await supabase.auth.getUser();
        console.log("DATA: ", data);
        setUserId(data.data.user?.id ?? "123");
    };

    const handleToggleTask = (taskId: number) => {
        const updatedTasks = tasks.map(task =>
            task.task_id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(sortTasks(updatedTasks));
    };

    const sortTasks = (tasks: Task[]): Task[] => {
        return tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
    };

    const goToProfile = () => {
        router.push("/profile");
    }

    useEffect(() => {
        getUser();
        fetch("/api/tasks")
            .then((response) => response.json())
            .then((json) => {
                console.log(json['tasks']);
                if (json['tasks'].length > 0)
                    setTasks(sortTasks(json['tasks']));
                else {
                    console.log("Hello")
                    setMessageForPriority1("You're All Done For The Day");
                }
            });
    }, []);
    return (
        <div className="w-full h-screen flex flex-col bg-gray-200">
            <div className="flex items-center justify-between mt-3">
                <div className="text-black text-xl ml-5">
                    <h3>Eisenhower Matrix</h3>
                </div>
                <button onClick={goToProfile} className="rounded-full w-10 h-10 bg-red-500 flex items-center justify-center mr-5">
                    A
                </button>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full p-4">
                <div className="bg-white rounded-lg text-black shadow-md">
                    <div className="flex justify-between items-center mt-1 mb-2">
                        <div className="flex ml-2">
                            <div className="h-5 w-5 text-sm border rounded-full bg-red-500 text-white mr-2 flex items-center justify-center">
                                Ⅰ
                            </div>
                            <p className="text-red-500 text-sm">Urgent & Important</p>
                        </div>
                        <button className="text-2xl mr-3">+</button>
                    </div>
                    {tasks.length > 0 ? (
                        <ul className="mr-4 ml-2">
                            {tasks.map((task: Task) => (
                                <div key={task.task_id} className="mt-2 border-b border-red-200 text-sm">
                                    <li key={task.task_id} className="flex items-center justify-between mb-1">
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="mr-2 w-3 h-3"
                                                checked={task.completed}
                                                color="#EF4444"
                                                onChange={() => handleToggleTask(task.task_id)}
                                            />
                                            <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <div>
                                            {task.due_date}
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="h-3/4 flex items-center justify-center text-gray-500 text-sm">{messageForPriority1}</p>
                    )}
                </div>
                <div className="bg-white rounded-lg text-black flex items-center justify-center shadow-md">
                    Card 2
                </div>
                <div className="bg-white rounded-lg text-black flex items-center justify-center shadow-md">
                    Card 3
                </div>
                <div className="bg-white rounded-lg text-black flex items-center justify-center shadow-md">
                    Card 4
                </div>
            </div>
        </div>
    );
}