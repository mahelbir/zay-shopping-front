import {Field, Form, Formik} from "formik";
import Alert from "../../../components/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";
import {Helmet} from "react-helmet";

const Login = () => {
    const signIn = useSignIn()
    const navigate = useNavigate()

    const handleForm = ({username}) => {
        if (signIn({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzE1ODIyNjk4LCJpYXQiOjE1MTYyMzkwMjJ9.duy4ar4HGi7sOyzzTPgjicIekkjed47CxWnvoFsepoQ',
            tokenType: 'Bearer',
            expiresIn: 3600,
            authState: {
                username: username,
            }
        })) {
            return navigate("/")
        } else {
            return <Alert type="error">Login failed!</Alert>
        }
    }

    return (<>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className={"card"}>
                <div className="card-body">
                    <Formik initialValues={{
                        username: "",
                        password: ""
                    }} onSubmit={handleForm}>
                        <Form autoComplete={"off"}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <Field type="text" name="username" className="form-control" required={"true"}
                                       autoFocus={"true"}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" required={"true"}/>
                            </div>
                            <button type="submit" className="btn btn-primary"><i
                                className="fas fa-sign-in-alt"></i> Login
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Login