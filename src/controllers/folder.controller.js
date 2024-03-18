import Folder from '../services/folder.service.js';
import Image from '../services/image.service.js';

export const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        
        const newFolder = new Folder({
            name: name
        })

        await newFolder.save();

        return res.status(201).json({message: "Folder created successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const searchFolder = async (req, res) => {
    try {
        const { name } = req.params;

        const findFolders = await Folder.find({});

        const searchFolders = findFolders.filter(folder => folder.name.includes(name));

        return res.status(200).json({folders: searchFolders});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;

        await Folder.findByIdAndDelete(id);

        return res.status(200).json({message: "Folder deleted successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getFolders = async (req, res) => {
    try {
        const mapFolder = await Folder.find({});
        const finallyFolders = [];

        for (const folder of mapFolder) {
            const imagesCount = await Image.countDocuments({ folder: folder._id });

            const objectFolder = {
                _id: folder._id,
                name: folder.name,
                imagesCount: imagesCount
            }

            finallyFolders.push(objectFolder);
        }

        return res.status(200).json({ folders: finallyFolders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}