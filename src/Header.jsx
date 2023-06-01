import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'

export default function Header({ title, width }) {
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