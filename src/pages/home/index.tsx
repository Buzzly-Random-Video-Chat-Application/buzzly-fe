import { isBrowser } from 'react-device-detect';
import HomeDesktop from './desktop';
import HomeMobile from './mobile';
const Home = () => {
    return (
        isBrowser ? <HomeDesktop /> : <HomeMobile />
    )
}

export default Home