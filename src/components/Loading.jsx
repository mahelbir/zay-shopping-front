import classNames from "classnames";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "#59ab6e",
        "0.5": "#3e774d",
        "1.0": "#162a1b"
    },
    shadowColor: "#ddd",
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