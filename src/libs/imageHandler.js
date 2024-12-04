import multer from 'multer';
import path from 'path';

// Configuración de Multer para almacenar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/images'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname); // Nombre único para el archivo
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limitar el tamaño del archivo a 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|svg|webp|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Solo imágenes (jpeg, jpg, png, gif, webp) son permitidas!'));
        }
    }
});


export const addFileUrls = (req, res, next) => {
  if (req.files) {
      req.images_urls = req.files.map(file => {
          return `${req.protocol}://${req.get('host')}/files/images/${file.filename}`;
      });
  }
  next();
};
