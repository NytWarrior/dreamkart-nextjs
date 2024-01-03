import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Hoodies = () => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {/* <Link href={'/product/wear-the-dream'}> */}
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a href={'/product/wear-the-dream'} className="block relative rounded overflow-hidden cursor-pointer">
                                <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/u/p/4/xxl-fc4458-fastcolors-original-imagsczcqphypzwu.jpeg?q=70" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">₹17.00</p>
                                <p className="mt-1">S, M, L, XL, XXL</p>
                            </div>
                        </div>
                        {/* </Link> */}
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a href={'/product/wear-the-dream'} className="block relative rounded overflow-hidden cursor-pointer">
                                <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/u/p/4/xxl-fc4458-fastcolors-original-imagsczcqphypzwu.jpeg?q=70" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">₹17.00</p>
                                <p className="mt-1">S, M, L, XL, XXL</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a href={'/product/wear-the-dream'} className="block relative rounded overflow-hidden cursor-pointer">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/u/p/4/xxl-fc4458-fastcolors-original-imagsczcqphypzwu.jpeg?q=70" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">₹17.00</p>
                                <p className="mt-1">S, M, L, XL, XXL</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a href={'/product/wear-the-dream'} className="block relative rounded overflow-hidden cursor-pointer">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/u/p/4/xxl-fc4458-fastcolors-original-imagsczcqphypzwu.jpeg?q=70" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">₹17.00</p>
                                <p className="mt-1">S, M, L, XL, XXL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hoodies;