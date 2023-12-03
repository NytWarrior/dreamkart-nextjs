import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let user = await User.findOne({ 'email': req.body.email });
            if (user) {
                if (user.email === req.body.email && user.password === req.body.password) {
                    res.status(200).json({ success: true, email: user.email, name: user.name });
                } else {
                    res.status(401).json({ success: false, error: 'Invalid email or password' });
                }
            } else {
                res.status(404).json({ success: false, error: 'User not found' });
            }

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }
};

export default connectDb(handler);
