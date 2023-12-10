const Razorpay = require("razorpay");

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Initialize Razorpay Object
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        });

        // Generate Payment Object
        async function generateObject() {
            const payment_capture = 1;
            const price = 500; // Put your desired amount here
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
