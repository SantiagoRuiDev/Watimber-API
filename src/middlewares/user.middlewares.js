import User from '../services/user.service.js';
import Role from '../services/role.service.js';
import jwt from 'jsonwebtoken';
import config from '../libs/config.js';
import validator from 'validator';

export const createUser = async (req, res, next) => {
    try {
        const { name, password, role } = req.body;

        if(validator.isEmpty(name) || validator.isEmpty(password) || validator.isEmpty(role)) {
            return res.status(400).json({message: "Please fill all data!"});
        }
        
        const userExist = await User.findOne({username: name});

        if(userExist) {
            return res.status(401).json({message: "User already exists"});
        }

        const findRole = await Role.findOne({name: role});

        if(!findRole) {
            return res.status(401).json({message: "Role does not exists"});
        }

        req.role = findRole._id;

        if(validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
            return res.status(401).json({message: "Password is not strong enough (min 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol)"});
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

        const user = await User.findOne({_id: decodeToken.id}).populate('role');

        if(!user) {
            return res.status(401).json({message: "User does not exists"});
        }

        req.user = user;

        next();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const userLoggedData = req.user;

        if(userLoggedData.role.name === "admin") {
            next();
        } else {
            return res.status(401).json({message: "User is not admin"});
        }
    }
    catch {
        return res.status(500).json({ message: error.message });
    }
}

export const isWorkerOrAdmin = async (req, res, next) => {
    try {
        const userLoggedData = req.user;

        if(userLoggedData.role.name === "worker" || userLoggedData.role.name === "admin") {
            next();
        } else {
            return res.status(401).json({message: "User is not admin"});
        }
    }
    catch {
        return res.status(500).json({ message: error.message });
    }
}