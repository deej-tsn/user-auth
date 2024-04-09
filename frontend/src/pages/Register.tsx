import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTokenToCookies } from "../hooks/CookieService";

function Register() {

  let navigator = useNavigate()
    const [LoggedIn , setLoggedIn ] = useState(false);

    useEffect(() => {
        if(LoggedIn){
            return navigator("/")
        }
    }, [LoggedIn])


  async function createPOST(event : React.SyntheticEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        name : {value : string}
        email : {value : string}
        password : {value : string}
        rank : {value : string}
    }

    const data = {
        name: target.name.value,
        email : target.email.value,
        password : target.password.value,
        rank : target.rank.value
    }
    console.log(data);

    let responseMessages = await fetch('http://localhost:1323/users/createUser',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), 
    });
    const res = await  responseMessages.json();
    
    if(res.error == ""){
        console.log("success")
        addTokenToCookies(res.jwt)
        setLoggedIn(true);
    }else{
        console.log(res.error)
    }
    
}
  return (
    <div className=" w-full h-full flex justify-center items-center p-2 bg-slate-400">
        <div className="w-full h-fit sm:w-3/4 md:w-3/5 lg:w-[600px] rounded-2xl drop-shadow-lg bg-white p-4">
            <form className=" w-full flex flex-col items-center" onSubmit={createPOST}>
                <div className="w-full flex flex-col mb-5">
                    <input className = "p-2 rounded-lg border mb-5" type="text" name="name" required id="name" placeholder="Name"></input>
                    <input className = "p-2 rounded-lg border mb-5" type="email"  name="email" required id="email" placeholder="Email address"></input>
                    <input className=" p-2 rounded-lg border mb-5" type="password" name="password" required id="password" placeholder="Password"></input>
                    <input className=" p-2 rounded-lg border" type="password" name="repeat_password" required id="repeat_password" placeholder="Repeat Password"></input>
                    <div className="p-2">
                      <h1>Rank:</h1>
                      <div className=" flex flex-row justify-evenly">
                        <div>
                        <input className=" p-2 rounded-lg border mr-2" type="radio" name="rank" value="beginner" defaultChecked/>
                        <label htmlFor="beginner">Beginner</label>
                        </div>
                      
                      <div>
                      <input className=" p-2 rounded-lg border mr-2" type="radio" name="rank" value="intermediate"/>
                      <label htmlFor="intermediate">Intermediate</label>
                      </div>
                      
                      <div>
                      <input className=" p-2 rounded-lg border mr-2" type="radio" name="rank" value="expert"/>
                      <label htmlFor="expert">Expert</label>
                      </div>
                      
                      </div>

                    </div>
                    
                </div>
                
                <button className="p-2 w-full bg-blue-500 text-white text-xl rounded-lg m-auto cursor-pointer transition-colors hover:bg-blue-700" type="submit">Create Account</button>
            </form>
          
        </div>

    </div>
  )
}

export default Register