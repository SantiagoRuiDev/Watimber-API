# Usa una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto (cámbialo si tu app usa otro)
EXPOSE 3000

# Comando para correr la aplicación en modo producción
CMD ["npm", "start"]
