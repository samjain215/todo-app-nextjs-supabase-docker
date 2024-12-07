"use client"

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

export default function Profile() {
    const [initialProfileName, setInitialProfileName] = useState("");
    const [initialStatus, setInitialStatus] = useState("");
    const [initialDesc, setInitialDesc] = useState("");

    const [profileName, setProfileName] = useState("");
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userID, setUserID] = useState("");

    const getUser = async () => {
        try {
            const re = await supabase.auth.getUser();
            console.log("USERDATA => ", re);
            if (re.error) throw error;
            if (!re.data.user) throw new Error("No user found");

            setEmail(re.data.user.email || "");
            setUserID(re.data.user.id);

            const response = await fetch("/api/users/getUserDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: re.data.user.id
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            const json = await response.json();

            const myProfile = json.data.profile;
            if (myProfile) {
                // Set initial and current values, ensuring they're never undefined
                setInitialProfileName(myProfile.username || "");
                setInitialStatus(myProfile.status || "");
                setInitialDesc(myProfile.description || "");

                setProfileName(myProfile.username || "");
                setStatus(myProfile.status || "");
                setDesc(myProfile.description || "");
            } else {
                throw new Error(json.error || "Unknown error occurred");
            }
        } catch (e) {
            console.log("Error:", e);
            setError(true);
            setErrorMessage(e);
        }
    };

    const saveUser = async () => {
        try {
            const response = await fetch("/api/users/saveUserDetails", {
                method: "POST",
                body: JSON.stringify({
                    user_id: userID,
                    username: profileName,
                    email: email,
                    description: desc,
                    status: status,
                })
            });

            const json = await response.json();
            if (json["error"]) {
                alert(json['error']);
            } else {
                alert("Profile Has Been Successfully Saved");
            }
            window.location.reload();
        } catch (e) {
            setError(true);
            setErrorMessage(e);
        }
    }

    useEffect(() => {
        getUser();
    }, [userID]);

    const isSaveDisabled =
        profileName === initialProfileName &&
        status === initialStatus &&
        desc === initialDesc;

    return (
        <div className="flex">
            <Sidebar displayName={profileName != "" ? profileName : "User"} />
            {!error ? (
                <div className="bg-gray-200 h-screen w-full flex items-center justify-center">
                    <div className="w-1/4 p-5 border border-gray-300 rounded-lg bg-white">
                        <div className="flex items-center gap-6">
                            <div className="rounded-full w-14 h-14 bg-red-500 flex items-center justify-center text-2xl">
                                {profileName.split("")[0]}
                            </div>
                        </div>
                        <div className="mt-5">
                            <label htmlFor="profileName" className="block text-sm font-medium text-gray-700">Profile name</label>
                            <input
                                data-testid="__PROFILE__"
                                type="text"
                                id="profileName"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                disabled
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none text-gray-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <input
                                type="text"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">About me</label>
                            <textarea
                                id="aboutMe"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 text-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-24 max-h-48"
                            ></textarea>
                        </div>
                        <button
                            className="bg-gray-600 text-white px-4 py-3 rounded-md mt-5 w-full hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSaveDisabled}
                            onClick={saveUser}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex items-center justify-center bg-gray-400 text-black">
                    {errorMessage.toString()}
                </div>
            )
            }
        </div>
    );
}
