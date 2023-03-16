import { CartWidget } from "../CartWidget/CartWidget"
import './NavBar.css';
import d20logo from '../../../assets/d20logo.png';
import {NavLink, Link} from 'react-router-dom';

export const Navbar = () =>{
    return(
        <nav className='nav-container'>
            <Link to="/">
                <div>
                    <img className="nav-brand" src={d20logo} alt="logo"/>
                </div>
            </Link>
            <div className='navegacion'>
                <NavLink className={({isActive})=>isActive ? "claseActive": "claseInactive"}
                    to="/">Inicio</NavLink>
                <NavLink className={({isActive})=>isActive ? "claseActive": "claseInactive"}
                    to="/productos/dados">Dados</NavLink>
                <NavLink className={({isActive})=>isActive ? "claseActive": "claseInactive"}
                    to="/productos/minis">Miniaturas</NavLink>
                        <NavLink className={({isActive})=>isActive ? "claseActive": "claseInactive"}
                    to="/productos/libro">Libros</NavLink>
            </div>
            <div>
                <CartWidget/>
            </div>
        </nav>
    )
}
