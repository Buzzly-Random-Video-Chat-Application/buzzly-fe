import { isBrowser } from 'react-device-detect'
import BlogsDesktop from './desktop'
import BlogsMobile from './mobile'

const Blogs = () => {
    return (
        isBrowser ? <BlogsDesktop /> : <BlogsMobile />
    )
}

export default Blogs