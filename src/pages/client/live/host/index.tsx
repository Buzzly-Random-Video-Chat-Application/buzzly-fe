import { isBrowser } from 'react-device-detect'
import LiveHostDesktop from './desktop'
import LiveHostMobile from './mobile'

const LiveHost = () => {
    return (
        isBrowser ? <LiveHostDesktop /> : <LiveHostMobile />
    )
}

export default LiveHost