import { Link, useNavigate } from "react-router-dom"
import { addTokenToCookies } from "../hooks/CookieService"
import { useEffect, useState } from "react";


function Login() {
    let navigator = useNavigate()
    const [LoggedIn , setLoggedIn ] = useState(false);

    useEffect(() => {
        if(LoggedIn){
            return navigator("/")
        }
    }, [LoggedIn])

    async function loginPOST(event : React.SyntheticEvent) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email : {value : string}
            password : {value : string}
        }

        const data = {
            email : target.email.value,
            password : target.password.value
        }

        let responseMessages = await fetch('http://localhost:1323/users/login',{
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
            addTokenToCookies(res.jwt);
            setLoggedIn(true);
        }else{
            console.log(res.error)
        }
        
    }

  return (
    <div className=" w-full h-full flex justify-center items-center p-2 bg-slate-400">
        <div className="w-full h-fit sm:w-3/4 md:w-3/5 lg:w-[600px] rounded-2xl drop-shadow-lg bg-white p-4">
            <form className=" w-full flex flex-col items-center" onSubmit={loginPOST}>
                <div className="w-full flex flex-col m-5">
                    <input className = "p-2 rounded-lg border mb-5" type="email" autoComplete="email" name="email" required id="email" placeholder="Email address"></input>
                    <input className=" p-2 rounded-lg border" type="password" name="password" required id="password" placeholder="Password"></input>
                </div>
                
                <button className="p-2 w-full bg-blue-500 text-white text-xl rounded-lg m-auto cursor-pointer transition-colors hover:bg-blue-700" type="submit">Log in</button>
            </form>

            <div className=" w-full flex justify-center p-2">
                <Link className="text-blue-700" to='../forgottenpassword'>Forgotten Password?</Link>
            </div>
            

            <hr className="w-full h-0 my-2 bg-black"/>
            <div className=" w-full flex justify-center p-2">

            <Link className=" bg-green-400 p-2 rounded-lg text-xl text-white transition-colors hover:bg-green-700" to='../register'>Create new account</Link>

            </div>
            

        </div>

    </div>
  )
}

export default Login 