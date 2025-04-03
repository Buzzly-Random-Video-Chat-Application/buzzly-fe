import { isBrowser } from "react-device-detect"
import LiveDesktop from "./desktop"
import LiveMobile from "./mobile"

const Live = () => {
    return (
        isBrowser ? <LiveDesktop /> : <LiveMobile />
    )
}

export default Live