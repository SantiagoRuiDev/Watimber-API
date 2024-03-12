import multer from "multer";
import path from "path";

// Funciona para comprobar la extension del archivo
function getFileTypeByExtension(fileName) {
  const fileExtension = path.extname(fileName).toLowerCase();

  if (fileExtension === ".gif") {
    return "gif";
  } else if (fileExtension === ".png") {
    return "png";
  } else if (fileExtension === ".jpg" || fileExtension === ".jpeg") {
    return "jpg";
  } else {
    return "unknown";
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileTypeByExtension(file.originalname);
    let uploadPath = "";

    if (
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "png" ||
      fileType === "gif"
    ) {
      // Crea una carpeta para cada tipo de archivo
      uploadPath = `files/images/`;
    } else {
      // Si el tipo de archivo es desconocido, guarda en 'uploads/unknown/'
      uploadPath = "files/unknown/";
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadImage = (imageFieldName) => {
  return (req, res, next) => {
    upload.single(imageFieldName)(req, res, (err) => {
      if (err) {
        return res.json({ error: err.message });
      }

      if (req.file === undefined)
        return res.status(400).json({ error: "You must send a valid image" });

      // Construir la URL de la imagen basada en la configuración de storage
      const imageUrl = `${req.protocol}://${req.get("host")}/files/images/${
        req.file.filename
      }`;

      req.imageURL = imageUrl;

      // Continúa con el siguiente middleware o manejo de la ruta
      next();
    });
  };
};
