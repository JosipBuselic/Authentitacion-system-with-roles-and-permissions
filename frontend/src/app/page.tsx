
"use client"
import "./home.css"
import {useRouter} from "next/navigation"
import { useEffect } from "react"

export default function Home() {

  const router = useRouter()

  const goLogin =  () =>{
    router.push("/login")
  }

  const goRegister = () =>{
    router.push("/register")
  }

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/check-session', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.logged_in) {
        router.replace('/dashboard');
      }
    };

    checkSession();
  }, [router]);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center justify-center bg-white w-full py-15 max-w-4xl rounded-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Authentitacion system</h1>
          <p className="text-gray-600 mb-10">Please login or register to continue.</p>
          <div className="flex space-x-4">
            <button onClick = {goLogin} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer">
              Login
            </button>
            <button onClick = {goRegister} className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition cursor-pointer">
              Register
            </button>
          </div>
      </div>
    
    </main>
  );
}
