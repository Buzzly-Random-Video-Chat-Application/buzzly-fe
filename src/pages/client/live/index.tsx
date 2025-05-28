import { isBrowser } from "react-device-detect"
import LiveDesktop from "./desktop"
import LiveMobile from "./mobile"
import { useGetLivestreamsQuery } from "@apis/livestreamApi"

const Live = () => {
    const { data: livestreams } = useGetLivestreamsQuery({ isLive: true })
    return (
        isBrowser ? <LiveDesktop livestreams={livestreams} /> : <LiveMobile livestreams={livestreams} />
    )
}

export default Live