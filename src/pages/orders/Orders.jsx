import {Helmet} from "react-helmet-async";
import {useQuery} from "@tanstack/react-query";
import httpClient from "../../utils/httpClient.js";
import {useAuthUser} from "react-auth-kit";
import {NavLink} from "react-router-dom";

const Orders = () => {

    const user = useAuthUser();

    const {data: orders} = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            return await httpClient(`/order/customersOrders?customerId=${user().id}`)
        }
    })


    return (
        <>
            <Helmet>
                <title>Orders</title>
            </Helmet>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders?.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.product.name}</td>
                                        <td>${order.cost}</td>
                                        <td>{order.status}</td>
                                        <td>{new Date(order.orderDate).toLocaleString()}</td>
                                        <td><NavLink className="btn btn-sm btn-dark" to={`/order/${order.id}`}><i
                                            className="fas fa-eye"></i></NavLink></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders