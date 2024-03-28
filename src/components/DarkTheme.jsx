import { FaRegSun } from "react-icons/fa";
import { MdOutlineNightlight } from "react-icons/md";

const DarkTheme = (prop) => {
    let { isDark, setIsDark } = prop

    const handleClick = () => {
        setIsDark(!isDark)
    };

    const buttonDark = () => {
        if (isDark === false) {
            return <MdOutlineNightlight onClick={handleClick} className="dark-theme-area" />
        } else {
            return <FaRegSun onClick={handleClick} className="dark-theme-area" />
        }
    }

    return (
        <>
            {buttonDark()}
        </>
    )
}

export default DarkTheme