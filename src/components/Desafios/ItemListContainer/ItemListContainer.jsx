import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebaseConfig/firebase';
import { useParams } from "react-router-dom";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { tipoProducto } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            const productsCollection = collection(db, "letsroll");
            let productsQuery = query(productsCollection);

            if (tipoProducto) {
                productsQuery = query(productsCollection, where("categoria", "==", tipoProducto));
            }

            const data = await getDocs(productsQuery);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getProducts();
    }, [tipoProducto]);

    return (
    <div className="item-list-container">
        <p>Productos</p>
        <ItemList items={products} />
    </div>
    );
};