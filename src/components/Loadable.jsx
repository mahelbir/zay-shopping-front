import loadable from "@loadable/component";
import {timeout} from "promise-timeout";
import {TopLoading} from "./Loading.jsx";


const Loadable = (component) => {
    const path = `${component}.jsx`
    return loadable(
        () => timeout(import("../" + path), 15000),
        {fallback: <TopLoading enabled={true}/>}
    )
}

export default Loadable