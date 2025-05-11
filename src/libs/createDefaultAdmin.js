import User from '../services/user.service.js';
import config from './config.js';

export const createDefaultAdmin = async () => {
    try {
        const findUserAdmin = await User.findOne({email: config.EMAIL});

        if(!findUserAdmin){
            await new User({
                username: config.USERNAME,
                password: await User.encryptPassword(config.PASSWORD),
                email: config.EMAIL
            }).save();
        }
        
    } catch (error) {
        return console.log(error.message);   
    }
}