import { isBrowser } from 'react-device-detect'
import VideoChatDesktop from './desktop'
import VideoChatMobile from './mobile'

const VideoChat = () => {
    return (
        isBrowser ? <VideoChatDesktop /> : <VideoChatMobile />
    )
}

export default VideoChat