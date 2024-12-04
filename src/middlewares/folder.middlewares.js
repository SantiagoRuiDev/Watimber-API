import Folder from '../services/folder.service.js';
import validator from 'validator';

export const createFolder = async (req, res, next) => {
    try {
        const { name } = req.body;

        if(validator.isEmpty(name)) {
            return res.status(400).json({message: "Please fill all data!"});
        }

        if (!/^\d+$/.test(name) || name.length !== 6) {
            return res.status(400).json({ message: "Invalid identifier" });
        }

        const folderExist = await Folder.findOne({name: name});

        if(folderExist) {
            return res.status(401).json({message: "Order with this identifier already exists"});
        }
        
        next();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}