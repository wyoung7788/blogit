export default function Login() {
    return(
        <div>Log in Here

            <div className="flex">
                <div>
                    <input className="username" placeholder="username"/>
                </div>
                <div>
                    <input className="password" type="password"/>
                </div>
                <div>
                    <button type="submit"></button>
                </div>
            </div>


        </div>
    )
}