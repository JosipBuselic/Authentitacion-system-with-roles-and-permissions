export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="bg-amber-100 flex flex-col px-5 py-5 items-center w-1/5 shadow-md" >
        <h1 className="text-blue-600 text-3xl font-bold my-5">Login</h1>
        
        <div className="flex flex-col items-center">
            <form action="" className="flex flex-col">
              <label>Username:</label>
              <input className="bg-amber-50 px-1 py-1" type="text" required/>
              <label>Password:</label>
              <input className="bg-amber-50 px-1 py-1" type="password" required/>
              <button className="my-5 py-2 bg-blue-300 hover:bg-blue-600 hover:text-white cursor-pointer transition" >Submit</button>
            </form>
            <a href="/register" className="underline text-blue-700">Register</a>
        </div>
      </div> 
    </div>
  
  );
}