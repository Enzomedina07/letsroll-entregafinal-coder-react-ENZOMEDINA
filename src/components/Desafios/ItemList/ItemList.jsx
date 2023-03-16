import { Item } from "../Item/Item"
import './ItemList.css';
// import {Link} from 'react-router-dom';

export const ItemList = ({items})=>{

    return(
        <div className="estilos-listado">
            <div style={{width:"100%"}}>item list</div>
            {
                items.map(product=>(
                    // <Link key={product.id} to={`/item/${product.id}`}>
                        <Item key={product.id} items={product}/>
                    // {/* // </Link> */}
                ))
            }
        </div>
    )
}