import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token })
            })
            let res = await data.json();
            setOrders(res.orders)
        }
        if (!localStorage.getItem('myuser')) {
            router.push('/');
        } else {
            fetchOrders()
        }
    }, []);
    return (
        <div className="min-h-screen">
            <h1 className="font-semibold text-center p-8 text-2xl">My Orders</h1>
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #Order_id
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Email
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Amount
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item) => {
                                            return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text gray-900">{item.orderId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text gray-900">{item.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text gray-900">{item.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text gray-900">
                                                    <Link href={'/order?id=' + item._id}>Details</Link>
                                                </td>

                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default orders;