import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig/firebase";
import { CartItem } from "../CartItem/CartItem";
import "./CartContainer.css";
import React, { useContext } from "react";
import { CartContext } from '../../../context/CartContext';
import Swal from 'sweetalert2';

export const CartContainer = () => {
  const { productCartList, clearProductCartList, removeProduct } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [orderId, setOrderId] = useState(null);

  const total = productCartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!firstName || !lastName || !phone || !email || !confirmEmail) {
      Swal.fire("Error", "Por favor complete todos los campos", "error");
      return;
    }

    if (email !== confirmEmail) {
      Swal.fire("Error", "Los emails no coinciden", "error");
      return;
    }


    // Send order to Firebase
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        firstName,
        lastName,
        phone,
        email,
        items: productCartList,
        total,
      });
      setOrderId(docRef.id);
      clearProductCartList();
      setShowCheckout(false);
      Swal.fire('¡Compra completada!', `Tu número de orden es: ${docRef.id}`, 'success');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleVaciarCarrito = () => {
    Swal.fire({
      title: '¿Estas seguro que quieres vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        clearProductCartList();
        setShowCheckout(false);
        Swal.fire('¡Carrito vaciado!', '', 'success');
      }
    });
  }

  return (
    <div className="cart-container">
      <p className="carrito">Carrito</p>
      {!showCheckout && (
        <div>
          {productCartList.length > 0 ? (
            <>
              {productCartList.map((item) => (
                <CartItem key={item.id} item={item} removeProduct={removeProduct} />
              ))}
              <hr />
              <button onClick={handleVaciarCarrito}>Vaciar el carrito</button>
              <button onClick={() => setShowCheckout(true)}>
                Finalizar compra
              </button>
            </>
          ) : (
            <p>No has agregado productos</p>
          )}
        </div>
      )}
      {showCheckout && (
        <div>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmEmail">Confirm Email:</label>
              <input
                type="text"
                id="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
              <button type="submit">Submit order</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
      }

