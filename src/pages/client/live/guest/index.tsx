import { isBrowser } from 'react-device-detect'
import LiveGuestDesktop from './desktop'
import LiveGuestMobile from './mobile'

const LiveGuest = () => {
    return (
        isBrowser ? <LiveGuestDesktop /> : <LiveGuestMobile />
    )
}

export default LiveGuest