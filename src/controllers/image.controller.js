import Folder from '../services/folder.service.js';
import Image from '../services/image.service.js';

export const createImage = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const image = req.imageURL;
        // Create image

        const newImage = new Image({
            name: name,
            url: image,
            folder: id
        })

        await newImage.save();

        return res.status(201).json({ message: "Image created" });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getImage = async (req, res) => {
    try {
        const { id } = req.params;

        const folderInfo = await Folder.findOne({ _id: id })
        const findImagesByFolder = await Image.find({ folder: id }).populate('folder');

        return res.status(200).json({images: findImagesByFolder, folderInfo: folderInfo});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getImageById = async (req, res) => {
    try {
        const { id } = req.params;

        const foundImage = await Image.findOne({_id: id});

        if(!foundImage){
            return res.status(404).json({ message: "Image not found" });
        }

        return res.status(200).json(foundImage);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const findImage = await Image.findOne({ _id: id });

        if(!findImage){
            return res.status(404).json({ message: "Image not found" });
        }

        await Image.findByIdAndDelete(id);

        return res.status(200).json({ message: "Image deleted" });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}