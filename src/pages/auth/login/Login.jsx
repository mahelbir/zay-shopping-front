import {Field, Form, Formik} from "formik";
import Alert from "../../../components/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";
import {Helmet} from "react-helmet-async";

const Login = () => {
    const signIn = useSignIn()
    const navigate = useNavigate()

    const handleForm = ({email}) => {
        if (signIn({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzE1ODIyNjk4LCJpYXQiOjE1MTYyMzkwMjJ9.duy4ar4HGi7sOyzzTPgjicIekkjed47CxWnvoFsepoQ',
            tokenType: 'Bearer',
            expiresIn: 3600,
            authState: {
                "id": 1,
                "name": "Mahmuthan",
                "surname": "Elbir",
                "password": "Asdad123",
                "email": "mah.elbir@gmail.com",
                "address": "Apt. 424 7897 Rod Corners, North Frederica, NE 53235-3838 Apt. 424 7897 Rod Corners, North Frederica, NE 53235-3838"
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
                        email: "",
                        password: ""
                    }} onSubmit={handleForm}>
                        <Form autoComplete={"off"}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type="email" name="email" className="form-control" required={true} autoFocus={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" required={true}/>
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