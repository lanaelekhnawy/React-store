import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    let [cartNumber, setCartNumber] = useState(0);

    const getHeaders = () => ({
        token: localStorage.getItem('userToken')
    });

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            { headers: getHeaders() } 
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    function getProductToCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            { headers: getHeaders() } 
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    function deleteProductFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers: getHeaders() }
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    function updateProductCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: count },
            { headers: getHeaders() }
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    return (
        <CartContext.Provider value={{ addProductToCart, getProductToCart, deleteProductFromCart, updateProductCount, cartNumber }}>
            {props.children}
        </CartContext.Provider>
    );
}





