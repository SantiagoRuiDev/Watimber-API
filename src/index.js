import express from 'express';
import cors from 'cors';
import config from './libs/config.js';
import createDefaultRoles from './libs/createRole.js';
import {connectDatabase} from './libs/connectDatabase.js';
import {createDefaultAdmin} from './libs/createDefaultAdmin.js';

const app = express();


app.use(express.json());

app.use(cors());

await connectDatabase();
await createDefaultRoles();
await createDefaultAdmin();

// Importing routes

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import folderRoutes from './routes/folder.routes.js';
import imageRoutes from './routes/images.routes.js';

app.use('/files/images', express.static('files/images'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/folders', folderRoutes);
app.use('/api/v1/images', imageRoutes);



app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
})