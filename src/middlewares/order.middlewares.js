import Folder from '../services/folder.service.js';
import validator from 'validator';

export const createFolder = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Create image
        if(req.images_urls.length == 0){
            throw new Error("Please upload valid images");
        }

        if(validator.isEmpty(id)) {
            return res.status(400).json({message: "Please fill all data!"});
        }

        const folderExist = await Folder.findOne({name: id});

        if(folderExist) {
            return res.status(401).json({message: "Order with this identifier already exists"});
        }
        
        next();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}