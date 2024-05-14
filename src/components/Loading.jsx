import classNames from "classnames";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "#0b5ed7",
        "0.5": "#0847a3",
        "1.0": "#042556"
    },
    shadowColor: "#212934",
    shadowBlur: 3
});
export const TopLoading = ({enabled}) => enabled && <TopBarProgress/>

const Loading = ({enabled = false, size = 4}) => {
    return (
        enabled && (
            <div className="text-center my-5">
                <i className={classNames(["fas", "fa-spinner", "fa-spin", `fa-${size}x`])}></i>
            </div>
        )
    )
}

export default Loading