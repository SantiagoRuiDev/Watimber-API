import Folder from "../services/folder.service.js";

export const createImage = async (req, res, next) => {
  const { id } = req.params;

  // Check if folder exists
  const folderExist = await Folder.findOne({ _id: id });

  if (!folderExist) {
    return res.status(404).json({ message: "Order not found" });
  }

  next();
};
