
"use client"
import Image from "next/image";
import "./register.css"
import { useState } from "react";



export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [samepassword, setSamepassword] = useState("")


    const handleSubmit = async (e: React.FormEvent) =>{

        if(password != samepassword){
            alert("password and confirm password are not the same!")
        }
        e.preventDefault()

        const response = await fetch("/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({username: username, password: password, email: email})
        })

        const data = await response.json();
        alert(data.message)
    }

    return(
        <div className="flex min-h-screen justify-center items-center">
            <div className="bg-white flex flex-col px-5 py-5 items-center sm:w-1/3 shadow-md" >
                <h1 className="text-blue-600 text-3xl font-bold my-5">Register</h1>
                
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="flex flex-col w-55">
                    <label>Username:</label>
                    <input className="bg-gray-200 px-1 py-1 rounded" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email:</label>
                    <input className="bg-gray-200 px-1 py-1 rounded" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password:</label>
                    <input className="bg-gray-200 px-1 py-1 rounded" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>Password confirm:</label>
                    <input className="bg-gray-200 px-1 py-1 rounded" type="password" required value={samepassword} onChange={(e) => setSamepassword(e.target.value)}/>
                    <button className="my-5 py-2 bg-blue-300 hover:bg-blue-600 hover:text-white cursor-pointer transition" >Submit</button>
                    </form>
                    <p className="mt-2 opacity-50">Or register with</p>
                    <div className="flex items-center mt-2 mb-6">
                        <a href="" className="shadow-md py-2 px-2 mr-2 flex items-center justify-between"><Image src="/icons/github_icon.svg" alt="github Icon" width={20} height={20}/>GitHub</a>
                        <a href="" className="shadow-md py-2 px-2 mr-2 flex items-center justify-between"><Image src="/icons/google_icon.svg" alt="google Icon" width={20} height={20}/>Google</a>
                    </div>
                    <p>Already registered? <a href="/login" className="underline text-blue-700">Login</a></p>
                </div>
            </div> 
        </div>
    );
}