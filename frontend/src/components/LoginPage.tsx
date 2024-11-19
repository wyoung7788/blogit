import { Login } from "../actions/login";

export default function LoginPage() {
   



    return(
        <div className="loginForm">Log in Here
            <div className="flex">
                <div>
                    <input className="username" placeholder="username"/>
                </div>
                <div>
                    <input className="password" type="password"/>
                </div>
                <div>
                    <button className="btn-submit" onSubmit={Login}>Log in</button>
                </div>
            </div>
        </div>
    )
}