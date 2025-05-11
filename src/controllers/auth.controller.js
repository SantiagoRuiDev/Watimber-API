import User from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import config from '../libs/config.js';


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({email: email});

        if(userExist) {
        
            const isMatch = await User.comparePassword(password, userExist.password);
            if(isMatch) {
                const token = jwt.sign({id: userExist._id}, config.SECRET, {
                    expiresIn: /* Never expires */ 2592000
                });
                return res.status(200).json({token});
            } else {
                return res.status(401).json({message: "Invalid password"});
            }

        } else {
            throw new Error("Please insert a valid username");
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}