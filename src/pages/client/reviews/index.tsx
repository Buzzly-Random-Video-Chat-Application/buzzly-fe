import { isBrowser } from 'react-device-detect'
import ReviewsDesktop from './desktop'
import ReviewsMobile from './mobile'

const Review = () => {
    window.scrollTo(0, 0)
    return (
        isBrowser ? <ReviewsDesktop /> : <ReviewsMobile />
    )
}

export default Review