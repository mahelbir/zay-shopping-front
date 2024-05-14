import {Field, Form, Formik} from "formik";
import Alert from "../../../components/Alert.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {useMutation} from "@tanstack/react-query";
import httpClient from "../../../utils/httpClient.js";

const Register = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: async (data) => {
            return await httpClient(`/register`, "POST", data)
        }
    })
    const {isPending, mutate, error, failureReason} = mutation

    const handleForm = (data) => {
        data.status = "USER";
        mutate(data, {
            onSuccess: () => {
                return navigate("/auth/login")
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
                    <Alert type="error" enabled={error}>Register failed!</Alert>
                    <Formik initialValues={{
                        email: "",
                        password: "",
                        name: "",
                        surname: "",
                        "address": "",
                    }} onSubmit={handleForm}>
                        <Form autoComplete={"off"}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <Field type="text" name="name" className="form-control" required={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Surname</label>
                                <Field type="text" name="surname" className="form-control" required={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type="email" name="email" className="form-control" required={true}
                                       autoFocus={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" required={true}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <Field as={"textarea"} type="text" name="address" className="form-control" required={true}/>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isPending}><i
                                className="fas fa-user-plus"></i> Register
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="card-footer">
                    <NavLink to="/auth/login" className={"btn btn-dark btn-sm"}><i
                        className="fas fa-sign-in-alt"></i> Login</NavLink>
                </div>
            </div>
        </>
    )
}

export default Register