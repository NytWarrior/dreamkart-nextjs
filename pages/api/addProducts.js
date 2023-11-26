import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                const productData = req.body[i];
                const p = new Product({
                    title: productData.title,
                    slug: productData.slug,
                    desc: productData.desc,
                    img: productData.img,
                    category: productData.category,
                    size: productData.size,
                    color: productData.color,
                    price: productData.price,
                    availableQty: productData.availableQty,
                });

                await p.save();
            }

            res.status(200).json({ success: 'success' });
        } catch (error) {
            console.error('Error saving products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);
