import {Field, Form, Formik} from "formik";
import Alert from "../../../components/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";

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

    return (
        <Formik initialValues={{
            username: "",
            password: ""
        }} onSubmit={handleForm}>
            <Form autoComplete={"off"}>
                <h1>Login</h1>
                <Field type="text" name="username" placeholder="Username" required={true} autoFocus={true}/>
                <Field type="password" name="password" placeholder="Password" required={true}/>
                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}

export default Login