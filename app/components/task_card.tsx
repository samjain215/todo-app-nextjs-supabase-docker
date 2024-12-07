import { useEffect, useState } from "react";
import { Task } from "../types/db";

type TaskCardProps = {
    quadrant: "UI" | "NUI" | "UNI" | "NUNI";
    tasks: Task[];
    handleOpenModal: (quadrant: "UI" | "NUI" | "UNI" | "NUNI", task?: Task) => void;
    handleToggleTask: (taskId: number, quadrant: "UI" | "NUI" | "UNI" | "NUNI") => void;
    preventPropagation: (
        event: React.MouseEvent<HTMLInputElement | HTMLButtonElement, MouseEvent>
    ) => void; // Updated type
    buttonTestID?: string;
    gTestID?: string;
};


export default function TaskCard({
    quadrant,
    tasks,
    handleOpenModal,
    handleToggleTask,
    preventPropagation,
    buttonTestID,
    gTestID,
}: TaskCardProps) {
    const [header, setHeader] = useState({
        quadrant: "UI",
        displayName: "Urgent & Important",
        color: "red",
    });

    const setQuadrant = (quadrant: string) => {
        switch (quadrant) {
            case "UI":
                return setHeader({
                    quadrant: "Ⅰ",
                    displayName: "Urgent & Important",
                    color: "red",
                });
            case "NUI":
                return setHeader({
                    quadrant: "Ⅱ",
                    displayName: "Not Urgent & Important",
                    color: "yellow",
                });
            case "UNI":
                return setHeader({
                    quadrant: "Ⅲ",
                    displayName: "Urgent & Not Important",
                    color: "blue",
                });
            case "NUNI":
                return setHeader({
                    quadrant: "Ⅳ",
                    displayName: "Not Urgent & Not Important",
                    color: "green",
                });
            default:
                return setHeader({
                    quadrant: "Ⅰ",
                    displayName: "Urgent & Important",
                    color: "red",
                });
        }
    };

    useEffect(() => {
        setQuadrant(quadrant);
    }, [quadrant]);

    return (
        <div
            className="bg-white rounded-lg text-black shadow-md p-4 flex flex-col justify-between"
            style={{ height: "300px" }}
        >
            <div className="flex justify-between items-center mt-1 mb-2">
                <div className="flex ml-2">
                    <div
                        className={`h-5 w-5 text-sm border rounded-full bg-${header.color}-500 text-white mr-2 flex items-center justify-center`}
                    >
                        {header.quadrant}
                    </div>
                    <p className={`text-${header.color}-500 text-sm`}>
                        {header.displayName}
                    </p>
                </div>
                <button
                    data-testid={buttonTestID}
                    className="text-2xl mr-3"
                    onClick={() => handleOpenModal(quadrant)}
                >
                    +
                </button>
            </div>
            <ul className="mr-4 ml-2 overflow-y-auto" data-testid={gTestID}>
                {tasks.map((task) => (
                    <li
                        key={task.task_id}
                        className={`mt-2 border border-${header.color}-200 text-sm mb-1 rounded-xl`}
                    >
                        <button
                            data-testid={`button-${task.task_id}`}
                            className={`flex items-center justify-between bg-${header.color} w-full h-10`}
                            onClick={() => handleOpenModal(quadrant, task)}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    data-testid={`checkbox-${task.task_id}`}
                                    className="ml-2 mr-2 w-3 h-3"
                                    checked={task.completed}
                                    onChange={() => {
                                        handleToggleTask(task.task_id, quadrant);
                                    }}
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                        preventPropagation(e)
                                    }
                                />
                                <div
                                    className={`${task.completed ? "line-through text-gray-500" : ""
                                        }`}
                                >
                                    {task.title}: {task.description}
                                </div>
                            </div>
                            <div className="mr-2">
                                {task.display_due_date ?? task.due_date}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
