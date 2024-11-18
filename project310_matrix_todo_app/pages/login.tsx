import Image from "next/image";
import { useState } from "react";
import GetTasks from "./getTasks";

export default function Login() {
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLoginClick = () => {
    fetch(`http://localhost:3000/api/login?code=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setLoggedIn(data.loggedIn);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Login failed");
        setLoggedIn(false);
      });
  };

  if (!loggedIn) {
    return (
      <div className="bg-back-gray h-screen w-full text-black flex justify-center items-center">
        <div className="bg-white h-3/4 w-1/3 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center mb-4">
            <Image src="/my_logo.png" alt="Logo" height={100} width={100} />
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="numberInput"
              className="mb-2"
              style={{ color: "black", fontWeight: "600" }}
            >
              Enter a Number:
            </label>
            <input
              id="numberInput"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              placeholder="Enter Login Code"
              style={{ color: "black" }}
            />
            <button
              onClick={handleLoginClick}
              className="bg-app-purple text-black px-6 py-2 rounded-lg hover:bg-app-purple transition-colors duration-200"
            >
              Login
            </button>
            {message && (
              <div className="mt-4 font-semibold" style={{ color: "black" }}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <GetTasks inputValue={inputValue} />;
  }
}
