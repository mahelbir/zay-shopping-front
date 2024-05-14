import {Helmet} from "react-helmet-async";
import {useQuery} from "@tanstack/react-query";
import httpClient from "../../utils/httpClient.js";
import Alert from "../../components/Alert.jsx";
import {NavLink, useSearchParams} from "react-router-dom";

const Product = () => {

    const [searchParams,] = useSearchParams();
    const categoryId = searchParams.get('categoryId')

    const {error, failureReason, data: products} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const category = categoryId ? `?category=${categoryId}` : ''
            return await httpClient(`/products` + category)
        }
    })

    const {data: categories} = useQuery({
        queryKey: ['categories', categoryId],
        queryFn: async () => {
            return await httpClient(`/category`)
        }
    })

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_NAME}</title>
            </Helmet>
            <Alert type="error" enabled={error}>{failureReason?.message}</Alert>
            <div className="row">
                <div className="col-lg-3">
                    <h1 className="h2 pb-4">Categories</h1>
                    <ul className="list-unstyled templatemo-accordion">
                        {
                            categories?.map(category => (
                                <li key={category.id} className="pb-3">
                                    <NavLink to={`/products/list?categoryId=${category.id}&categoryName=${category.name}`}
                                             className="h5 text-decoration-none">{category.name}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        <h1 className="h2 pb-4">{categoryId ? searchParams.get("categoryName") : "All"}</h1>
                    </div>
                    <div className="row">
                        {
                            products && products.map(product => (
                                <div className="col-md-4" key={product.id}>
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <NavLink className="h3 text-decoration-none" to={`/products/${product.id}`}>
                                                <img className="card-img rounded-0 img-fluid"
                                                     src={product.image}
                                                     alt={product.name}/>
                                            </NavLink>
                                        </div>
                                        <div className="card-body text-center">
                                            <NavLink className="h3 text-decoration-none"
                                                     to={`/products/${product.id}`}>
                                                {product.name}
                                            </NavLink>
                                            <p className="text-center mb-0">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product