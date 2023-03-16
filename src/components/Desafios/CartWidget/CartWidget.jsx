import Carrito from '../../../assets/carrito.png';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';

export const CartWidget = ()=>{
    const {getTotalProducts, productCartList} = useContext(CartContext);

    return(
        <div>
            {
                productCartList.length>0 &&
                <>
                    <Link to="/cart">
                        <img src={Carrito} alt="mario" style={{width:50}}/>
                    </Link>
                    <span style={{backgroundColor: 'white', borderRadius:"60%", width:"30px", heigth:"20px", fontSize:"20px", color:"black"}}>
                        {getTotalProducts()}
                    </span>
                </>
            }
        </div>
    )
}