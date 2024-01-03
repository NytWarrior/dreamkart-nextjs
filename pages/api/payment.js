import Order from "@/models/Order";
import Product from "@/models/Product";
const Razorpay = require("razorpay");

export default async function handler(req, res) {
    if (req.method === "POST") {

        //check if the cart is tampered
        let product, sumTotal = 0;
        let cart = req.body.cart;

        if (req.body.subTotal <= 0) {
            res.status(500).json({ error: "Please build your cart and try again!!" })
        }
        for (let item in cart) {
            // console.log(item)
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({ slug: item });

            if (product.availableQty < cart[item].qty) {
                res.status(500).json({ error: "Some items in your cart went out of stock. Please try again!!" })
            }

            if (product.price != cart[item].price) {
                res.status(500).json({ error: "Price of some item in your cart might changed. Please try again!!" })
            }
        }
        if (sumTotal != req.body.subTotal) {
            res.status(500).json({ error: "Price of some item in your cart might changed. Please try again!!" });
        }

        let order = new Order({
            email: req.body.email,
            orderId: generateReceipt(),
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            phone: req.body.phone,
            amount: req.body.subTotal,
            products: req.body.cart,
            pincode: req.body.pincode
        });
        // console.log("in payment req.body", req.body);
        await order.save();
        // Initialize Razorpay Object
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        });

        // Generate Payment Object
        async function generateObject() {
            const payment_capture = 1;
            const price = req.body.subTotal;
            const currency = "INR"; // Put your desired currency's code

            const options = {
                amount: (price * 100).toString(),
                currency,
                receipt: generateReceipt(),
                payment_capture,
            };

            try {
                const response = await razorpay.orders.create(options);
                res.status(200).json(response);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to create Razorpay order" });
            }
        }

        // Function to generate a unique receipt number
        function generateReceipt() {
            return (Math.floor(Math.random() * Date.now())).toString();
        }

        await generateObject(); // Wait for the order creation to complete before responding
    } else {
        // Handle any other HTTP method
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
