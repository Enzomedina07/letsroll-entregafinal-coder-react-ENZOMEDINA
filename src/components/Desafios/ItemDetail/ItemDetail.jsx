import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { ItemCount } from '../ItemCount/ItemCount';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import addToCartSound from '../../../assets/sounds/add-to-cart.mp3';

export const ItemDetail = ({ item }) => {
  const { addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const onAdd = (count) => {
    addProduct(item, count);
    setQuantity(count);
    swal({
      title: 'Producto agregado al carrito',
      icon: 'success',
    });
    const audio = new Audio(addToCartSound);
    audio.play();
  };

  return (
    <div className='detail-container'>
      <p style={{ width: '100%' }}>item detail</p>
      <div className='img-container'>
        <img src={item.url} alt={item.title} />
      </div>
      <div className='img-container'>
        <h4>{item.title}</h4>
        <h5>$ {item.price}</h5>
      </div>
      <ItemCount initial={1} stock={item.stock} onAdd={onAdd} />
      {quantity > 0 && (
        <Link to='/cart'>
          <button>Ir al carrito</button>
        </Link>
      )}
    </div>
  );
};

