import React, { useRef } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        } else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef()
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                    </svg>
                    <span className="ml-3 text-xl">DreamKart</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a href="/tshirts" className="mr-5 hover:text-gray-900">Tshirts</a>
                    <a href="/hoodies" className="mr-5 hover:text-gray-900">Hoodies</a>
                    <a href="/mugs" className="mr-5 hover:text-gray-900">Mugs</a>
                </nav>
                <button onClick={toggleCart} className="inline-flex items-center bg-gray-100 border-0 focus:outline-none text-base mt-4 md:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                    </svg>
                </button>
                <div ref={ref} className="w-72 h-full sideCart absolute top-0 right-0 bg-indigo-100 px-8 py-10 transform transition-transform translate-x-full">
                    <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                    <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-indigo-600'><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
                        {Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-5">
                                    <div className="w-2/3 font-semibold">{cart[k].name}</div>
                                    <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                                        <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                        <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                        <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                    </div>
                                </div>
                            </li>
                        })}

                    </ol>
                    <div className='flex'>
                        <button className='flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>
                            <BsFillBagCheckFill className='mt-1' />Checkout
                        </button>
                        <button onClick={clearCart} className='flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Navbar;