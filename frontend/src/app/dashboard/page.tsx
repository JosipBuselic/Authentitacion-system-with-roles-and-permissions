'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "./dashboard.css"


export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("")

  const handleLogout = async () => {
    const response = await fetch("/clear-session", {
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    if(data.success === "true"){
        router.replace("/")
    }
    else{
        alert("Something went wrong")
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      const res = await fetch("/username", {
        method: "GET",
        credentials: "include"
      });

      if(res.ok) {
        const data = await res.json();
        setUsername(data.username || "");

        if (data.username == ""){
            router.replace("/")
        }
      }
    };

    getUsername();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome {username}! You are successfully logged in.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-100 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-700">Edit your info, change password, etc.</p>
          </div>
          <div className="p-4 bg-green-100 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Activity</h2>
            <p className="text-gray-700">Recent logins, actions, or metrics.</p>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
