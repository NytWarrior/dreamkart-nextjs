import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

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

        const res = await initializeRazorpaySDK(); //here we are calling function we just written before

        if (!res) {
            alert("Razorpay SDK Failed to load"); //you can also call any ui to show this error.
            return; //this return stops this function from loading if SDK is not loaded
        }

        // Make API call to the serverless API
        const data = await fetch("/api/payment", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //body here if required
                email: email,
                address: address,
                subTotal: subTotal,
                cart: cart,
            }),
        }).then((res) =>
            res.json((response) => {
                //
                console.log("transaction response 80", response);
            })

        ).catch((error) => {
            console.log(error)
        })

        //data object is the response object which has razorpay object,
        console.log("data in checkout 87", data);//log data if required


        var options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            name: "DreamKart",
            currency: "INR",
            amount: data.amount,
            order_id: data.id,
            description: 'Your Payment Description Here',
            image: "https://avatars.githubusercontent.com/u/103626412?v=4",//put secure url of the logo you wish to display 
            handler: function (response) {
                console.log("gwfeargh", response)
                // Validate payment at server - using webhooks is a better idea.
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                alert("Payment Successfull!")
            },
            ondismiss: () => { /*handle payment window close or dismiss here */ },

            prefill: {
                name: name,
                email: email,
                contact: phone,
            },
            // readonly: {

            //     email: true, //edit this to allow editing of info
            //     name: true,//edit this to allow editing of info
            // },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            alert("Payment failed. Please try again. Contact support for help");
        });
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
                        <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
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