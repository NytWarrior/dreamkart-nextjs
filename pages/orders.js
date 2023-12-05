import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const orders = () => {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/');
        }
    }, []);
    return (
        <div>orders</div>
    )
}

export default orders;