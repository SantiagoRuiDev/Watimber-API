import { deleteImage } from "../libs/imageDeletion.js";
import Folder from "../services/folder.service.js";
import Image from "../services/image.service.js";
import archiver from "archiver";
import axios from "axios";

export const createFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const newFolder = new Folder({
      name: id,
    });

    await newFolder.save();
    
    for (const image of req.images_urls) {
      const newImage = new Image({
        name: "watimber-image-" + Math.random() * 999999,
        url: image,
        folder: newFolder._id,
      });
      await newImage.save();
    }

    return res
      .status(201)
      .json({ message: "Order created successfully", id: newFolder._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const downloadArchive = async (req, res) => {
  try {
      const imageLinks = await Image.find({folder: req.params.id});

      if (!imageLinks || imageLinks.length === 0) {
          return res.status(404).send('No images found.');
      }

      // Configurar la respuesta HTTP
      res.setHeader('Content-Disposition', 'attachment; filename=order_images.zip');
      res.setHeader('Content-Type', 'application/zip');

      // Crear un archivo ZIP en memoria
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.pipe(res);

      for (const link of imageLinks) {
          const response = await axios.get(link.url, { responseType: 'arraybuffer' });
          const type = (link.url.endsWith('.png')) ? '.png' : '.jpg';
          archive.append(response.data, { name: link.name + type });
      }

      // Finalizar el archivo ZIP
      archive.finalize();
  } catch (error) {
      console.error('Error creating ZIP file:', error);
      res.status(500).send('An error occurred while generating the ZIP file.');
  }
};

export const searchSpecificFolder = async (req, res) => {
  try {
    const { name } = req.params;

    const findFolders = await Folder.find({});

    const searchFolders = findFolders.filter((folder) => folder.name == name);

    if (searchFolders[0]) {
      return res.status(200).json(searchFolders[0]);
    }

    return res.status(200).json(null);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchFolder = async (req, res) => {
  try {
    const { name } = req.params;

    const findFolders = await Folder.find({});
    const finallyFolders = [];

    const searchFolders = findFolders.filter((folder) =>
      folder.name.includes(name)
    );

    for (const folder of searchFolders) {
      const imagesCount = await Image.countDocuments({ folder: folder._id });

      const objectFolder = {
        _id: folder._id,
        name: folder.name,
        imagesCount: imagesCount,
        date: folder.date
      };

      finallyFolders.push(objectFolder);
    }

    return res.status(200).json({ folders: finallyFolders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const images = await Image.find({folder: id});

    for(const image of images){
      await deleteImage(image.url);
      await Image.findByIdAndDelete(image._id);
    }

    await Folder.findByIdAndDelete(id);

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    const mapFolder = await Folder.find({});
    const finallyFolders = [];

    for (const folder of mapFolder) {
      const imagesCount = await Image.countDocuments({ folder: folder._id });

      const objectFolder = {
        _id: folder._id,
        name: folder.name,
        date: folder.date,
        imagesCount: imagesCount,
      };

      finallyFolders.push(objectFolder);
    }

    return res.status(200).json({ folders: finallyFolders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
