import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let user = new User(req.body);
            await user.save();
            res.status(200).json({ success: "success" });

        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);