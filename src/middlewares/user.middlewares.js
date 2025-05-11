import User from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import config from '../libs/config.js';
import validator from 'validator';

export const createUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;

        if(validator.isEmpty(name) || validator.isEmpty(password) || validator.isEmpty(email)) {
            return res.status(400).json({message: "Please fill all data!"});
        }
        
        if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
            return res.status(401).json({message: "Password is not strong enough (min 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol)"});
        }

        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(401).json({message: "User already exists"});
        }

        next();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const isAuth = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if(!token) {
            return res.status(401).json({message: "Token is required"});
        }

        const decodeToken = jwt.verify(token, config.SECRET);

        const user = await User.findOne({_id: decodeToken.id});

        if(!user) {
            return res.status(401).json({message: "User does not exists"});
        }

        req.user = user;

        next();
        
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
