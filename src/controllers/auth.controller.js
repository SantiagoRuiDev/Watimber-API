import User from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import config from '../libs/config.js';


export const signin = async (req, res) => {
    try {
        const { name, password } = req.body;

        const userExist = await User.findOne({username: name}).populate("role");

        if(userExist) {
        
            const isMatch = await User.comparePassword(password, userExist.password);
            if(isMatch) {
                const token = jwt.sign({id: userExist._id}, config.SECRET, {
                    expiresIn: /* Never expires */ 2592000
                });
                return res.status(200).json({token, role: userExist.role.name});
            } else {
                return res.status(401).json({message: "Invalid password"});
            }

        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}