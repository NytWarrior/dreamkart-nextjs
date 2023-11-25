import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, [])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let sum = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      sum += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(sum);
  }

  const addToCart = (item, qty, price, name, size, variant) => {
    let newCart = cart;
    if (item in cart) {
      newCart[item].qty = cart[item].qty + qty;
    } else {
      newCart[item] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  const removeFromCart = (item, qty, price, name, size, variant) => {
    let newCart = cart;
    if (item in cart) {
      newCart[item].qty = cart[item].qty - qty;
    }

    if (newCart[item].qty <= 0) {
      delete newCart[item];
    }

    setCart(newCart);
    saveCart(newCart);
  }

  return <>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
