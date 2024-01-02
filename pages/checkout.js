import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [user, setUser] = useState({ value: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('myuser'));
        if (user) {
            setUser(user)
            setEmail(user.email)
            fetchData(user.token)
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
        }
    }

    const fetchData = async (token) => {
        let data = { token: token };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let res = await a.json();
        console.log(res);
        setName(res.name);
        setAddress(res.address);
        setPincode(res.pincode);
        setPhone(res.phone)
    }

    const initializeRazorpaySDK = () => {

        return new Promise((resolve) => {

            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {

                resolve(true); //handle load success event here
            };

            script.onerror = () => {

                resolve(false); //handle load error event
            };

            document.body.appendChild(script);
        })
    }
    const openPaymentWindow = async () => {
        const sdkLoaded = await initializeRazorpaySDK();

        if (!sdkLoaded) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    address: address,
                    subTotal: subTotal,
                    cart: cart,
                    name: name,
                    city: city,
                    state: state,
                    phone: phone,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                clearCart();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            var options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                name: "DreamKart",
                currency: "INR",
                amount: data.amount,
                order_id: data.id,
                description: 'Your Payment Description Here',
                image: "https://avatars.githubusercontent.com/u/103626412?v=4",
                handler: function (response) {
                    console.log("Payment Success", response);
                    alert("Payment Successful!");
                },
                ondismiss: () => {
                    console.log("Payment window closed");
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone,
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on("payment.failed", function (response) {
                alert("Payment failed. Please try again. Contact support for help");
            });
        } catch (error) {
            console.error("Payment API Error:", error.message);
            alert(error.message || "Payment failed. Please try again.");
        }
    };

    return (
        <div className="container px-2 sm:m-auto">
            <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
            <h2 className="font-bold text-xl">1. Delivery Details</h2>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        {user && user.value ? <input value={user.email} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                            : <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        }
                    </div>
                </div>
            </div>
            <div className="px-2 w-full">
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea onChange={handleChange} value={address} id="address" name="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
                        <input value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                    </div>
                </div>
            </div>

            <h2 className="font-bold text-xl">2. Review Cart Items</h2>

            <div className="sideCart bg-indigo-100 p-6 m-2">
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold text-center'>Your cart is Empty!</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className="font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                                    <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                    <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                    <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-indigo-500' />
                                </div>
                            </div>
                        </li>
                    })}
                </ol>
                <span className='font-bold'>SubTotal:{subTotal}</span>
            </div>
            <div className="mx-4">
                <Link href={'/checkout'}><button onClick={openPaymentWindow} className='flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>
                    <BsFillBagCheckFill className='m-1' />Pay {subTotal}</button>
                </Link>
            </div>
        </div>
    )
}

export default checkout;