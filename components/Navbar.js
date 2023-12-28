import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({ user, cart, addToCart, removeFromCart, clearCart, subTotal, logout }) => {
    const [dropdown, setDropdown] = useState(false);

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
        <header className="text-gray-600 body-font sticky top-0 z-10 bg-white">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
                    </svg>
                    <span className="ml-3 text-xl">DreamKart</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a href="/tshirts" className="mr-5 hover:text-gray-900">Tshirts</a>
                    <a href="/hoodies" className="mr-5 hover:text-gray-900">Hoodies</a>
                    <a href="/mugs" className="mr-5 hover:text-gray-900">Mugs</a>
                </nav>
                <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className='flex'>
                    {dropdown && <ul className="absolute top-7 right-10 z-10 mt-9 mr-10 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Link href={'/myaccount'}><li className='block px-4 py-2 text-sm text-gray-700'> My Account</li></Link>
                        <Link href={'/orders'}><li className='block px-4 py-2 text-sm text-gray-700'> Orders </li></Link>
                        <li onClick={logout} className='cursor-pointer block px-4 py-2 text-sm text-gray-700'> Logout</li>
                    </ul>}
                    {user.value && <a className="inline-flex items-center px-2 bg-gray-100 border-0 focus:outline-none text-base mt-4 md:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full  hover:bg-indigo-600" viewBox="0 0 24 24">
                            <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </a>}
                </div>
                <div className='flex'>
                    {!user.value && <Link href={'/signin'}><button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-2 mx-2 my-1 focus:outline-none hover:bg-indigo-600 rounded">Sign In</button></Link>}
                    <a onClick={toggleCart} className="inline-flex items-center bg-gray-100 border-0 focus:outline-none text-base mt-4 md:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full hover:bg-indigo-600" viewBox="0 0 24 24">
                            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                        </svg>
                    </a>
                </div>

            </div>
            <div ref={ref} className="w-72 h-[100vh] sideCart absolute top-0 right-0 bg-indigo-100 px-8 py-10 transform transition-transform translate-x-full">
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-indigo-600'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold text-center'>Your cart is Empty!</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                                    <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                    <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                    <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                </div>
                            </div>
                        </li>
                    })}

                </ol>
                <span className='font-bold my-2'>SubTotal:{subTotal}</span>
                <div className='flex'>
                    <Link href={'/checkout'}> <button disabled={Object.keys(cart).length === 0} className='disabled:bg-indigo-400 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>
                        <BsFillBagCheckFill className='mt-1' />Checkout</button>
                    </Link>
                    <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className='disabled:bg-indigo-400 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>
                        Clear Cart
                    </button>
                </div>
            </div>
        </header >
    )
}

export default Navbar;