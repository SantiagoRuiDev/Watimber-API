import fs from 'fs';
import path from 'path';

/**
 * Elimina una imagen del servidor.
 * @param {string} imageUrl - URL de la imagen a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteImage(imageUrl) {
  try {
    // Extraer el nombre del archivo desde la URL
    const imageName = imageUrl.split('/').pop();
    
    // Construir la ruta completa de la imagen en el servidor
    const imagePath = path.join(__dirname, 'files/images', imageName);

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
