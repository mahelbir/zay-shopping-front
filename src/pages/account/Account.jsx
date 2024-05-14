import {useAuthUser, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {Field, Form, Formik} from "formik";
import httpClient from "../../utils/httpClient.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import Alert from "../../components/Alert.jsx";
import {useEffect, useState} from "react";
import {failureMessage} from "../../utils/helper.js";


const Account = () => {
    const userState = useAuthUser()
    const signOut = useSignOut()
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    let [user, setUser] = useState(userState());

    const logout = () => {
        signOut()
        navigate("/auth/login")
    }

    const {isSuccess, data: fetchedData} = useQuery({
        queryKey: ['JobList'],
        queryFn: async () => {
            return await httpClient(`/customers/${user.id}`)
        }
    })
    useEffect(() => {
        isSuccess && setUser(fetchedData)
    }, [isSuccess]);

    const mutation = useMutation({
        mutationKey: ['updateCustomer'],
        mutationFn: async (data) => {
            return await httpClient(`/customers/${userState().id}`, "PUT", data)
        }
    })
    const {isPending, mutate} = mutation
    const handleForm = (data) => {
        mutate(data, {
            onSuccess: (data) => {
                localStorage.setItem("_auth_state", JSON.stringify(data))
                setMessage("Successfully updated!")
            },
            onError: (e) => {
                setMessage(e.message)
                mutation.reset()
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Account</title>
            </Helmet>
            <div className={"card"}>
                <div className="card-body">
                    <Alert>{message}</Alert>
                    <Formik initialValues={{
                        name: user.name,
                        surname: user.surname,
                        password: user.password,
                        email: user.email,
                        address: user.address
                    }} onSubmit={handleForm}>
                        <Form autoComplete={"off"}>
                            <fieldset disabled={isPending}>
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
                                    <Field type="text" name="email" className="form-control" required={true}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <Field type="password" name="password" className="form-control" required={true}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <Field as="textarea" name="address" className="form-control" required={true}/>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-primary" disabled={isPending}>
                                <i className="fas fa-save"></i> Save
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className={"card-footer d-flex justify-content-end"}>
                    <button className={"btn btn-danger"} onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Account