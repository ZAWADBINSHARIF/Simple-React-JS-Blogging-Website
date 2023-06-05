import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'
import { useContext } from 'react'
import DataContext from './context/DataContext'


export default function Header({ title }) {

    const {width} = useContext(DataContext)

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