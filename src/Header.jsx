import propTypes from 'prop-types'
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'
import useWindowSize from './hooks/useWindowsSize'


export default function Header({ title }) {

    const { width } = useWindowSize();

    return (
        <header className="Header">
            <h1>{title}</h1>
            <p>{
                width < 768 ? <FaMobileAlt />
                    : width < 992 ? <FaTabletAlt />
                        : <FaLaptop />
            }</p>
        </header>
    )
}

Header.propTypes = {
    title: propTypes.string
}