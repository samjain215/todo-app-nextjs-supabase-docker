"use client"

import Image from 'next/image';
import React from 'react';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100  bg-cover bg-center bg-[url('/background.png')]">
            <div className="bg-white rounded-xl shadow-xl p-12 h-2/3 w-1/4 max-w-md bg-opacity-60">
                <div className="flex flex items-center justify-center mb-6">
                    <div className='ml-5 flex-col items-center justify-center'>
                        <h1 className="text-4xl font-bold text-gray-800">Matrix</h1>
                        <p className="text-gray-600">Your Todo App</p>
                    </div>
                </div>
                <form action="/auth/login" method="post" className='bg-opacity-80'>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            data-testid="__email__"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 mb-4"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}