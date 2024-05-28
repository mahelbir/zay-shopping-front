import {Helmet} from "react-helmet-async";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import httpClient from "../../utils/httpClient.js";
import Alert from "../../components/Alert.jsx";
import {useAuthUser} from "react-auth-kit";

const Product = () => {
    const user = useAuthUser();
    const navigate = useNavigate();
    const {productId} = useParams();
    const [cartQuantity, setCartQuantity] = useState(1);

    const increaseQuantity = () => {
        setCartQuantity(Math.min(cartQuantity + 1, (product.numberInStock || 1)));
    }

    const decreaseQuantity = () => {
        setCartQuantity(Math.max(cartQuantity - 1, 1));
    }

    const mutation = useMutation({
        mutationKey: [],
        mutationFn: async (data) => {
            return await httpClient(`/cart`, "POST", data)
        }
    })
    const {isPending, mutate} = mutation
    const handleCart = () => {
        if (!user()?.id)
            return navigate("/auth/login")
        mutate({
            customerId: user().id,
            productId: product.id,
            quantity: cartQuantity
        }, {
            onSuccess: () => {
                navigate("/cart")
            },
            onError: (e) => {
                alert(e.message)
                mutation.reset()
            }
        })
    }

    const {error, data: product, failureReason} = useQuery({
        queryKey: ['products', productId],
        queryFn: async () => {
            return await httpClient(`/products/${productId}`)
        }
    })


    return (
        <>
            <Helmet>
                <title>{product?.name}</title>
            </Helmet>
            <Alert type="error" enabled={error}>{failureReason?.message}</Alert>
            {
                product && product.numberInStock < 1 && <Alert type="error" className="h5">No stock!</Alert>
            }
            {product && product.numberInStock >= 1 && (
                <div className="row">
                    <div className="col-lg-5 mt-5">
                        <div className="card mb-3">
                            <img className="card-img img-fluid"
                                 src={product.image}
                                 alt="Card image cap"
                                 id="product-detail"/>
                        </div>
                    </div>
                    <div className="col-lg-7 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="h2">{product.name}</h1>
                                <p className="h3 py-2"><i className="fa fa-star text-dark"></i> ${product.price}</p>

                                <h6 className={"text-muted"}>Description:</h6>
                                <p>{product.description}</p>

                                <h6 className={"text-muted"}>In Stock:</h6>
                                <p>{product.numberInStock}</p>
                                <input type="hidden" name="product-title" value="Activewear"/>
                                <div className="row">
                                    <div className="col-auto">
                                        <ul className="list-inline pb-3">
                                            <li className="list-inline-item text-right">
                                                Quantity
                                                <input type="hidden" name="product-quanity" id="product-quanity"
                                                       value="1"/>
                                            </li>
                                            <li className="list-inline-item" onClick={decreaseQuantity}><span
                                                className="btn btn-success" id="btn-minus">-</span></li>
                                            <li className="list-inline-item"><span className="badge bg-secondary"
                                                                                   id="var-value">{cartQuantity}</span>
                                            </li>
                                            <li className="list-inline-item" onClick={increaseQuantity}><span
                                                className="btn btn-success"
                                                id="btn-plus">+</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <div className="col d-grid">
                                        <button className="btn btn-success btn-lg" onClick={handleCart}
                                                disabled={isPending}>Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product