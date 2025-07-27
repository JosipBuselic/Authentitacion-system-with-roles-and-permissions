import "./login.css"
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="bg-white flex flex-col px-5 py-5 items-center shadow-md sm:w-1/3" >
        <h1 className="text-blue-600 text-3xl font-bold my-5">Login</h1>
        
        <div className="flex flex-col items-center">
            <form action="" className="flex flex-col w-55">
              <label>Username:</label>
              <input className="bg-gray-200 px-1 py-1" type="text" required/>
              <label>Password:</label>
              <input className="bg-gray-200 px-1 py-1" type="password" required/>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2 text-blue-500 rounded-2xl"/>
                <label>Remember Me</label>
              </div>
              <button className="my-5 py-2 bg-blue-300 hover:bg-blue-600 hover:text-white cursor-pointer transition" >Submit</button>
            </form>
            <p className="mt-2 opacity-50">Or login with</p>
            <div className="flex items-center mt-2 mb-6">
                <a href="" className="shadow-md py-2 px-2 mr-2 flex items-center justify-between"><Image src="/icons/github_icon.svg" alt="github Icon" width={20} height={20}/>GitHub</a>
                <a href="" className="shadow-md py-2 px-2 mr-2 flex items-center justify-between"><Image src="/icons/google_icon.svg" alt="google Icon" width={20} height={20}/>Google</a>
            </div>
            <p>Not a member? <a href="/register" className="underline text-blue-700">Register</a></p>
        </div>
      </div> 
    </div>
  
  );
}
