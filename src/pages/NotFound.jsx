import icon from '../static/image/Screenshot_2024-03-10_23-25-16-removebg-preview.png'
import { Helmet } from "react-helmet";

const NotFound = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>404 Not Found</title>
                <link rel="icon" type="image/svg+xml" href={icon} />
            </Helmet>
            <p>404 Not Found</p>
        </>
    )
}

export default NotFound