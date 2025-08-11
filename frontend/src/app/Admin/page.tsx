"use client";

import { useEffect, useReducer, useState } from "react";
import "./dashboard.css"
import Router, { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  roleid: number;
}

export default function DashboardAdmin() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingUser) return;

    const res = await fetch("/admin/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(editingUser),
    });

    if (res.ok) {
      setEditingUser(null);
      fetchUsers();
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 py-2 px-2 bg-white rounded-xl">Admin Dashboard</h1>
      <button onClick={handleLogout} className="mb-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">Logout</button>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role ID</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.roleid}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editingUser && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center bg-blue-500">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <label className="block mb-2">Username</label>
            <input
              className="border px-3 py-2 w-full mb-4"
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({ ...editingUser, username: e.target.value })
              }
            />
            <label className="block mb-2">Email</label>
            <input
              className="border px-3 py-2 w-full mb-4"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <label className="block mb-2">Role ID</label>
            <input
              type="number"
              className="border px-3 py-2 w-full mb-4"
              value={editingUser.roleid}
              onChange={(e) =>
                setEditingUser({ ...editingUser, roleid: Number(e.target.value) })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
