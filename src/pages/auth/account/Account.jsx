import {useAuthUser, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";


const Account = () => {
    const user = useAuthUser()
    const signOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        signOut()
       // navigate("/auth/login")
    }

    return (
        <>
            <div className={"card"}>
                <div className={"card-body"}>
                    Welcome, {user()?.username}!
                </div>
                <div className={"card-footer"}>
                    <button className={"btn btn-danger"} onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                </div>
            </div>
        </>
    )
}

export default Account