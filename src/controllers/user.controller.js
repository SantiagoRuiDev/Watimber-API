import User from '../services/user.service.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createUser = new User({
            username: name,
            password: await User.encryptPassword(password),
            email: email
        });

        await createUser.save();

        return res.status(200).json({message: "User has been created successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userExist = await User.findOne({_id: id});

        if(!userExist) {
            return res.status(401).json({message: "User does not exists"});
        }

        await User.deleteOne({_id: id});

        return res.status(200).json({message: "User has been deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("role");

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}