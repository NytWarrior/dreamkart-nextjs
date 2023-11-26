import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                const updatedProduct = req.body[i];
                const productId = updatedProduct._id;

                let updatedProductDoc = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });

                if (!updatedProductDoc) {
                    return res.status(404).json({ error: `Product with ID ${productId} not found` });
                }
            }
            res.status(200).json({ success: 'success' });
        } catch (error) {
            console.error('Error updating products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);
