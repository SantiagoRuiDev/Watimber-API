import Folder from "../services/folder.service.js";
import Image from "../services/image.service.js";

export const createImage = async (req, res, next) => {
  // Check if name meets 6 digits param (Just digits no chars)
  const { name } = req.body;
  const { id } = req.params;

  // Check if folder exists
  const folderExist = await Folder.findOne({ _id: id });

  if (!folderExist) {
    return res.status(404).json({ message: "Folder not found" });
  }

  // Check if image exists

  const imageExist = await Image.findOne({ name: name });

  if (imageExist) {
    return res.status(400).json({ message: "Image already exists" });
  }

  next();
};
