import "./assets/css/bootstrap.min.css";
import "./assets/css/templatemo.min.css";
import "./assets/css/fontawesome.min.css";
import "./assets/js/bootstrap.bundle.min.js";
import {AuthProvider} from "react-auth-kit";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import router from "./router.jsx";
import {HelmetProvider} from "react-helmet-async";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    }
})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <AuthProvider authName={"_auth"} authType={"localstorage"}>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </HelmetProvider>
        </QueryClientProvider>
    )
}

export default App