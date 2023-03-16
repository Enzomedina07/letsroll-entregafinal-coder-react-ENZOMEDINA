import { db } from '../../../firebaseConfig/firebase';
import { collection, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import './ItemDetailContainer.css';
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";




export const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const productRef = doc(db, "letsroll", id);
            const docSnap = await getDoc(productRef);
            if (docSnap.exists()) {
            setProduct({ ...docSnap.data(), id: docSnap.id });
            }
        };
        getProduct();
        }, [id]);

    console.log("product:", product);

    return (
        <div className="item-detail-container">
            <p style={{ width: "100%", color: "white" }}>item detail container</p>
            {product ? <ItemDetail item={product} /> : <p>Loading...</p>}
        </div>
    )
}

//     // 1 configurar los hooks
//     const [products,setProducts]= useState([])
//     // 2 referenciamos la db de firestore
//     const productsCollection = collection(db,"letsroll")
//     //3 funcion para mostrar todos los docs
//     const getProducts= async () =>{
//         const data = await getDocs (productsCollection)
//     console.log (data.docs)
//     setProducts(
//         data.docs.map((doc)=>({...doc.data(),id:doc.id}))
//     )
//     /*  console.log (products)  */
//     }
    
//     //4 use useEffect
//     useEffect(()=>{
//         getProducts()
//     },[])


