import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartContext';
import './CartItem.css';
import Swal from 'sweetalert2';


export const CartItem = ({item}) => {
    const {removeProduct} = useContext(CartContext);

    const handleRemove = () => {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo'
      }).then((result) => {
        if (result.isConfirmed) {
          removeProduct(item.id);
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          )
        }
      })
    }
    return (
        <div className='cart-item-container'>
            <div className='cart-img-container'>
                <img src={item.url} alt={item.title}/>
            </div>
            <div className='cart-info-container'>
                <p>{item.title}</p>
                <p>precio unitario: {item.price}</p>
                <p>cantidad: {item.quantity}</p>
                <p>Precio total: {item.totalPrice}</p>
                <button btn-sm onClick={()=>handleRemove(item.id)}>Eliminar producto</button>
            </div>
        </div>
    )
}
