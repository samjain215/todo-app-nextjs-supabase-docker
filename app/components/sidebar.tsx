import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sidebar({ displayName }) {
    const router = useRouter();
    const navigateToProfile = () => {
        router.push("/profile");
    };

    const navigateToTasks = () => {
        router.push("/home");
    };

    return (
        <div className="flex">
            {/* Sidebar (Taskbar) */}
            <div className="w-16 bg-gray-100 p-4 flex flex-col items-center space-y-4 border-r border-solid border-gray-300">
                <button className="h-12 w-12 bg-red-500 text-white rounded-full flex items-center justify-center" onClick={navigateToProfile}>
                    {(displayName ?? "User").split("")[0].toUpperCase()}
                </button>
                <button className="h-12 w-12 bg-yellow-500 text-black rounded-full flex items-center justify-center" onClick={navigateToTasks}>
                    <Image
                        key="tasks"
                        src="/colab_tasks.png"
                        alt="Tasks"
                        height={24}
                        width={24}
                    />
                </button>
                <button className="h-12 w-12 bg-green-500 text-black rounded-full flex items-center justify-center">
                    <Image
                        key="colab_tasks"
                        src="/colab_tasks.png"
                        alt="Colab Tasks"
                        height={24}
                        width={24}
                    />
                </button>
            </div>
        </div>
    );
}