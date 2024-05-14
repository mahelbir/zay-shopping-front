import {Helmet} from "react-helmet-async";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import httpClient from "../../utils/httpClient.js";
import Alert from "../../components/Alert.jsx";

const Order = () => {
    const navigate = useNavigate();
    const {orderId} = useParams();

    const {error, data: order, failureReason} = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            return await httpClient(`/order/track/${orderId}`)
        }
    })

    const mutation = useMutation({
        mutationKey: [],
        mutationFn: async (data) => {
            return await httpClient(`/order/${orderId}`, "PUT", data)
        }
    })
    const {isPending, mutate} = mutation
    const cancelOrder = () => {
        const orderPrevStatus = order.status;
        order.status = "CANCELLED"
        mutate(order, {
            onSuccess: () => {
            },
            onError: (e) => {
                order.status = orderPrevStatus
                alert(e.message)
                mutation.reset()
            }
        })
    }


    return (
        <>
            <Helmet>
                <title>Order #{orderId}</title>
            </Helmet>
            <Alert type="error" enabled={error}>{failureReason?.message}</Alert>
            {
                order && (
                    <div className="card">
                        <div className="card-body text-center">
                            <img src={order.product.image} alt="Order" className="img-fluid" style={{maxWidth: 250}}/>
                            <div className="mb-3"></div>
                            <h5>Product: {order.product.name}</h5>
                            <h5>Category: {order.product.category?.name}</h5>
                            <h5>Status: {order.status}</h5>
                            <h5>Quantity: {order.quantity}</h5>
                            <h5>Cost: ${order.cost}</h5>
                            <h5>Order Time: {new Date(order.orderDate).toLocaleString()}</h5>
                            <h5>Estimated Shipping Date: {order.shippingDate.join("/")}</h5>
                            <h5>Estimated Delivery Date: {order.estimatedDeliveryDate.join("/")}</h5>
                            <h5>Shipping Address: </h5>
                            <pre>{order.address}</pre>
                        </div>
                        <div className="card-footer text-center">
                            <button className={"btn btn-dark"} onClick={() => navigate("/orders")}><i
                                className="fas fa-arrow-left"></i> Back to Orders
                            </button>
                            &nbsp;
                            {order.status !== "CANCELLED" &&
                                <button className={"btn btn-danger"} onClick={cancelOrder} disabled={isPending}><i
                                    className="fas fa-ban"></i> Cancel The Order</button>}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Order