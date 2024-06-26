import {Field, Form, Formik} from "formik";
import Alert from "../../../components/Alert.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";
import {Helmet} from "react-helmet-async";
import {useMutation} from "@tanstack/react-query";
import httpClient from "../../../utils/httpClient.js";

const Login = () => {
    const signIn = useSignIn()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data) => {
            return await httpClient(`/login`, "POST", data)
        }
    })
    const {isPending, mutate, error, failureReason} = mutation

    const handleForm = ({email, password}) => {
        mutate({
            email: email,
            password: password
        }, {
            onSuccess: (data) => {
                signIn({
                    token: data.token,
                    tokenType: 'Bearer',
                    expiresIn: 3600,
                    authState: {
                        id: data.customerId,
                        email: data.email,
                        status: data.status,
                        address: data.address,
                        name: data.name,
                        surname: data.surname
                    }
                })
                return navigate("/")
            },
            onError: () => {
                setTimeout(() => {
                    mutation.reset()
                } ,2500)
            }
        })
    }

    return (<>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className={"card"}>
                <div className="card-body">
                    <Alert type="error" enabled={error}>Login failed!</Alert>
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
                            <button type="submit" className="btn btn-primary" disabled={isPending}><i
                                className="fas fa-sign-in-alt"></i> Login
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="card-footer">
                    <NavLink to="/auth/register" className={"btn btn-dark btn-sm"}><i className="fas fa-user-plus"></i> Register</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login