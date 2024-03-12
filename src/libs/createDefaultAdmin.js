import User from '../services/user.service.js';
import Role from '../services/role.service.js';
import config from './config.js';

export const createDefaultAdmin = async () => {
    try {
        const findUserAdmin = await User.findOne({username: config.USERNAME});

        if(!findUserAdmin){
            await new User({
                username: config.USERNAME,
                password: await User.encryptPassword(config.PASSWORD),
                role: (await Role.findOne({name: "admin"}))._id
            }).save();
        }
        
    } catch (error) {
        return console.log(error.message);   
    }
}