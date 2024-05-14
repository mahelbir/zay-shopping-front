import {Helmet} from "react-helmet-async";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import httpClient from "../../utils/httpClient.js";
import Alert from "../../components/Alert.jsx";
import {useAuthUser} from "react-auth-kit";

const Cart = () => {
    const navigate = useNavigate()
    const user = useAuthUser()
    const queryClient = useQueryClient()

    const {error, data: items, failureReason} = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            return await httpClient(`/cart?customerId=${user().id}`)
        }
    })

    const mutationRemoveItem = useMutation({
        mutationKey: ['cartRemoveItem'],
        mutationFn: async (id) => {
            return await httpClient(`/cart/${id}`, "DELETE")
        }
    })
    const removeItem = (id) => {
        mutationRemoveItem.mutate(id, {
            onSuccess: () => {
                queryClient.setQueryData(['cart'], (prev) => prev.filter(item => item.id !== id))
            },
            onError: (e) => {
                alert(e.message)
                mutationRemoveItem.reset()
            }
        })
    }

    const mutationBuy = useMutation({
        mutationKey: ['buy'],
        mutationFn: async (data = {}) => {
            return await httpClient(`/order/cart/${user().id}`, "POST", data)
        }
    })
    const buy = () => {
        mutationBuy.mutate({customerId: user().id}, {
            onSuccess: () => {
                queryClient.setQueryData(['cart'], [])
                navigate("/orders")
            },
            onError: (e) => {
                alert(e.message)
                mutationRemoveItem.reset()
            }
        })
    }


    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <Alert type="error" enabled={error}>{failureReason?.message}</Alert>
            <div className="row">
                <div className="col-12">
                    <h1>Cart</h1>
                    <div className="row">
                        {items?.map(item => (
                            <div key={item.id} className="col-12">
                                <div className="card mb-3">
                                    <div className="card-header">{item.product.name}</div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <i className="fas fa-cubes"></i> : {item.quantity} &nbsp; &nbsp; &nbsp;
                                                <i className="fa fa-money-bill"></i> :
                                                ${item.quantity * item.product.price}
                                            </div>
                                            <div>
                                                <NavLink className="btn btn-primary btn-sm"
                                                         to={`/product/${item.productId}`}><i
                                                    className="fas fa-eye"></i></NavLink>
                                                &nbsp;
                                                <NavLink className="btn btn-danger btn-sm" to={"#"}
                                                         onClick={() => removeItem(item.id)}><i
                                                    className="fas fa-trash"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {
                            !items?.length && <Alert type="info" className="h5">Your cart is empty</Alert>
                        }

                        {!!items?.length && <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-lg btn-success" onClick={buy}><i
                                className="fa fa-cart-arrow-down"></i> Buy
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart