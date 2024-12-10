import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define la ruta base del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, '../..'); // Subir al directorio raíz

/**
 * Delete an image from server files
 * @param {string} imageUrl - Image URL
 * @returns {Promise<void>}
 */
export async function deleteImage(imageUrl) {
  try {
    // Extraer el nombre del archivo desde la URL
    const imageName = imageUrl.split('/').pop();
    
    // Construir la ruta completa de la imagen desde la raíz del proyecto
    const imagePath = path.join(rootPath, 'files/images', imageName);
    // Verificar si el archivo existe antes de eliminarlo
    if (fs.existsSync(imagePath)) {
      // Eliminar el archivo
      fs.unlinkSync(imagePath);
      console.log(`Image deleted: ${imagePath}`);
    } else {
      console.log("Image doesn't exist on the server.");
    }
  } catch (error) {
    console.error('Error while trying to delete the image:', error);
  }
}
