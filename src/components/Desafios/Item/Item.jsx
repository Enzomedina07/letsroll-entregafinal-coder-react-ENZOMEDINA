import './Item.css';
import {Link} from 'react-router-dom';

export const Item = ({items})=>{
    return(
        <div className="tarjeta-producto">
            <img src={items.url} alt={items.title}/>
            <h4>{items.title}</h4>
            <p>$ {items.price}</p>
            <p>stock : {items.stock}</p>
            <Link to={`/item/${items.id}`}>
                <button className='boton-ver'>Ver detalle...</button>
            </Link>
        </div>
        
    )
}
