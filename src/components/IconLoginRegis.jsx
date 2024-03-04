import { Image } from 'react-bootstrap'
import Icon from '../static/image/Black_Circle_Icon_Internet_Logo-removebg-preview.png'

const IconLoginRegis = () => {
    return (
        <>
            <div className="border border-0 rounded border-img-register border-img-login">
                <Image src={Icon} className='rounded-circle m-3' />
            </div>
        </>
    )
}

export default IconLoginRegis